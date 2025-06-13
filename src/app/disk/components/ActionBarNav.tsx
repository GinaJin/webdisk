import { ActionIcon, Tooltip } from "@mantine/core"
import {
  ArrowElbowLeftUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react"
import { use } from "react"
import context from "../context"
import ActionButton from "./ActionButton"

export default function ToolBarNav() {
  const { currentDir, listParentDir, back, forward, canBack, canForward } =
    use(context)

  const dirName = (currentDir.split("/").at(-1) || "/") as string
  return (
    <li className="flex gap-[8px]">
      <ActionButton
        tooltip="返回上层目录"
        onClick={listParentDir}
        icon={<ArrowElbowLeftUpIcon />}
      />
      <ActionIcon.Group>
        <ActionButton
          tooltip="后退"
          onClick={back}
          icon={<ArrowLeftIcon />}
          disabled={!canBack}
        />
        <ActionButton
          tooltip="前进"
          onClick={forward}
          icon={<ArrowRightIcon />}
          disabled={!canForward}
        />
      </ActionIcon.Group>
      <Tooltip label={dirName!} position="top-start">
        <div className="w-[120px] font-bold truncate leading-[30px]">
          {dirName}
        </div>
      </Tooltip>
    </li>
  )
}
