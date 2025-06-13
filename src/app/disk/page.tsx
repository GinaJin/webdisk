"use client"

import {
  dirOnlyKey,
  favDirsKey,
  homeDirKey,
  showHiddenKey,
  viewListKey,
} from "@/constants"
import { FileInfoType, ListParentDirFn, ViewType, VoidFn } from "@/types"
import local from "@/utils/local"
import toast from "@/utils/toast"
import { useEffect, useState } from "react"
import { useEffectOnce } from "react-use"
import Fav from "./components/Fav"
import Main from "./components/Main"
import Context from "./context"
import useBackForward from "./useBackForward"

export default function Disk() {
  const [currentDir, setCurrentDir] = useState("")
  const [selected, setSelected] = useState(null as unknown as FileInfoType)
  const [showHidden, setShowHidden] = useState(false)
  const [dirOnly, setDirOnly] = useState(false)
  const [favDirs, setFavDirs] = useState([] as string[])
  const [viewType, setViewType_] = useState("list" as ViewType)
  const [dirs, setDirs] = useState([])
  const { back, forward, go, canBack, canForward } =
    useBackForward(setCurrentDir)

  useEffectOnce(() => {
    setShowHidden(local.read(showHiddenKey, false))
    setDirOnly(local.read(dirOnlyKey, false))
    setFavDirs(local.read(favDirsKey, []))
    setViewType_(local.read(viewListKey, "list"))
  })

  useEffectOnce(() => {
    fetch("/api/disk/home")
      .then(resp => resp.json())
      .then(homeDir => {
        local.save(homeDirKey, homeDir)
        return homeDir
      })
      .then(go)
  })

  const listDir = ({
    path,
    showHidden = false,
    dirOnly = false,
  }: {
    path: string
    showHidden?: boolean
    dirOnly?: boolean
  }) => {
    showHidden ??= local.read(showHiddenKey, false)
    dirOnly ??= local.read(dirOnlyKey, false)

    const query = new URLSearchParams({
      currentDir: path,
      showHidden: String(showHidden ? 1 : 0),
      dirOnly: String(dirOnly ? 1 : 0),
    })

    fetch(`/api/disk/dir?${query}`)
      .then(res => res.json())
      .then(setDirs)
  }

  useEffect(() => {
    if (!currentDir) return
    listDir({ path: currentDir, showHidden, dirOnly })
  }, [currentDir, showHidden, dirOnly])

  const listParentDir: ListParentDirFn = () => {
    const parentPath = currentDir.split("/").slice(0, -1).join("/") || "/"
    go(parentPath)
  }

  const setHomeDir: VoidFn = () => {
    const homeDir = selected?.path || currentDir
    fetch("/api/disk/mainDir", {
      method: "POST",
      body: JSON.stringify({ dir: homeDir }),
    })
      .then(() => {
        toast.show("设置主目录成功!", homeDir)
        local.save(homeDirKey, homeDir)
      })
      .catch(() => toast.error("设置失败"))
  }

  // 简单起见，本地保存
  const addFavDir: VoidFn = () => {
    if (!selected?.path) return toast.show("请先选择一个目录！")

    const dir = selected?.path
    const old = favDirs
    const next = [...new Set([...old, dir])]
    setFavDirs(next)
    local.save(favDirsKey, next)
    toast.show("收藏成功!", dir)
  }
  const removeFavDir = (path: string) => {
    const favSet = new Set(favDirs)
    favSet.delete(path)
    const next = [...favSet]
    setFavDirs(next)
    local.save(favDirsKey, next)
    toast.show("移除收藏成功!")
  }
  const setViewType = (value: ViewType) => {
    if (viewType === value) return
    setViewType_(value)
    local.save(viewListKey, value)
  }

  return (
    <Context
      value={{
        currentDir,
        selected,
        dirOnly,
        showHidden,
        viewType, // 视图类型
        setViewType,
        listDir,
        listParentDir,
        setCurrentDir,
        setSelected,
        setHomeDir,
        addFavDir,
        setShowHidden,
        setDirOnly,
        removeFavDir,
        go,
        back,
        forward,
        canBack,
        canForward,
      }}
    >
      <div className="flex w-full gap-[8px]">
        <Fav items={favDirs} />
        <Main items={dirs} />
      </div>
    </Context>
  )
}
