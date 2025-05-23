"use client"

import { dirOnlyKey, favDirsKey, showHiddenKey, viewListKey } from "@/constants"
import local from "@/utils/local"
import { useEffect, useState } from "react"
import Fav from "./components/Fav"
import Previewer from "./components/Previewer"
import Context from "./context"
import useBackForward from "./useBackForward"

export default function Disk() {
  const [currentDir, setCurrentDir] = useState("")
  const [selectedDir, setSelectedDir] = useState("")
  const [showHidden, setShowHidden] = useState(false)
  const [dirOnly, setDirOnly] = useState(false)
  const [favDirs, setFavDirs] = useState([] as string[])
  const [viewType, setViewType] = useState("list" as ViewType)
  const [dirs, setDirs] = useState([])
  const { back, forward, go, canBack, canForward } =
    useBackForward(setCurrentDir)

  useEffect(() => {
    setShowHidden(local.read(showHiddenKey, false))
    setDirOnly(local.read(dirOnlyKey, false))
    setFavDirs(local.read(favDirsKey, []))
    setViewType(local.read(viewListKey, "list"))
  }, [])

  useEffect(() => {
    fetch("/api/disk/home")
      .then(resp => resp.json())
      .then(go)
  }, [])

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
      showHidden: String(showHidden),
      dirOnly: String(dirOnly),
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
    const homeDir = selectedDir || currentDir
    fetch("/api/disk/mainDir", {
      method: "POST",
      body: JSON.stringify({ dir: homeDir }),
    })
      .then(() => alert("设置成功"))
      .catch(() => alert("设置失败"))
  }

  // 简单起见，本地保存
  const addFavDir: VoidFn = () => {
    const dir = selectedDir || currentDir
    const old = favDirs
    const next = [...new Set([...old, dir])]
    setFavDirs(next)
    local.save(favDirsKey, next)
  }
  const removeFavDir = (path: string) => {
    const favSet = new Set(favDirs)
    favSet.delete(path)
    const next = [...favSet]
    setFavDirs(next)
    local.save(favDirsKey, next)
  }
  const toggleViewType = () => {
    const old = viewType
    const next = old === "list" ? "grid" : "list"
    setViewType(next)
    local.save(viewListKey, next)
  }

  return (
    <Context
      value={{
        currentDir,
        selectedDir,
        dirOnly,
        showHidden,
        viewType, // 视图类型
        toggleViewType,
        listDir,
        listParentDir,
        setCurrentDir,
        setSelectedDir,
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
        <Previewer items={dirs} />
      </div>
    </Context>
  )
}
