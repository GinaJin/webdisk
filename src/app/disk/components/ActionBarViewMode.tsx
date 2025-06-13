import { ActionIcon } from "@mantine/core"
import { ListBulletsIcon, SquaresFourIcon } from "@phosphor-icons/react"
import { use } from "react"
import context from "../context"
import ActionButton from "./ActionButton"

export default function ActionBarViewMode() {
  const { setViewType } = use(context)

  return (
    <li className="flex gap-[8px]">
      <ActionIcon.Group>
        <ActionButton
          tooltip="列表展示"
          icon={<ListBulletsIcon />}
          onClick={() => setViewType("list")}
        ></ActionButton>
        <ActionButton
          tooltip="平铺展示"
          icon={<SquaresFourIcon />}
          onClick={() => setViewType("grid")}
        ></ActionButton>
      </ActionIcon.Group>
    </li>
  )
}
