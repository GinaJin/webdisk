import { VoidFn } from "@/types"
import { ActionIcon, Tooltip } from "@mantine/core"
import { ReactNode } from "react"

type Props = {
  tooltip?: string
  disabled?: boolean
  onClick: VoidFn
  icon: ReactNode
}

export default function ActionButton({
  tooltip,
  onClick,
  icon,
  disabled,
}: Props) {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon disabled={disabled} onClick={onClick} size="lg">
        {icon}
      </ActionIcon>
    </Tooltip>
  )
}
