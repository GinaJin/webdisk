import { dirOnlyKey, showHiddenKey } from "@/constants"
import local from "@/utils/local"
import { ActionIcon } from "@mantine/core"
import {
  EyeClosedIcon,
  EyeIcon,
  FolderIcon,
  FoldersIcon,
} from "@phosphor-icons/react"
import { use } from "react"
import context from "../context"
import ActionButton from "./ActionButton"

export default function ActionBarVisible() {
  const { showHidden, setShowHidden, setDirOnly, dirOnly } = use(context)

  const toggleShowHiddenConfig = () => {
    local.save(showHiddenKey, !showHidden)
    setShowHidden(!showHidden)
  }
  const toggleDirOnlyConfig = () => {
    local.save(dirOnlyKey, !dirOnly)
    setDirOnly(!dirOnly)
  }

  return (
    <li className="flex gap-[8px]">
      <ActionIcon.Group>
        <ActionButton
          tooltip={
            "当前" + (showHidden ? "" : "不") + "显示隐藏文件 (win 无效果)"
          }
          icon={showHidden ? <EyeIcon /> : <EyeClosedIcon />}
          onClick={toggleShowHiddenConfig}
        ></ActionButton>
        <ActionButton
          tooltip={dirOnly ? "只显示目录，不显示文件" : "显示全部"}
          icon={dirOnly ? <FolderIcon /> : <FoldersIcon />}
          onClick={toggleDirOnlyConfig}
        ></ActionButton>
      </ActionIcon.Group>
    </li>
  )
}
