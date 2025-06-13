import { homeDirKey } from "@/constants"
import local from "@/utils/local"
import { ActionIcon } from "@mantine/core"
import {
  FolderSimpleStarIcon,
  HeartIcon,
  HouseLineIcon,
} from "@phosphor-icons/react"
import { use, useState } from "react"
import { useEffectOnce } from "react-use"
import context from "../context"
import ActionButton from "./ActionButton"

export default function ActionBarDirSetter() {
  const { setHomeDir, addFavDir, go } = use(context)
  const [home, setHome] = useState("")
  useEffectOnce(() => {
    setHome(local.read(homeDirKey))
  })

  return (
    <li className="flex gap-[8px]">
      <ActionButton
        tooltip="进入主目录"
        onClick={() => go(home)}
        icon={<HouseLineIcon />}
      />
      <ActionIcon.Group>
        <ActionButton
          tooltip="设置主目录"
          icon={<HeartIcon />}
          onClick={setHomeDir}
        ></ActionButton>
        <ActionButton
          tooltip="添加到收藏夹"
          icon={<FolderSimpleStarIcon />}
          onClick={addFavDir}
        ></ActionButton>
      </ActionIcon.Group>
    </li>
  )
}
