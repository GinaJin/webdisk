"use client"

import getFileName from "@/utils/fileName"
import { CloseOutlined } from "@ant-design/icons"
import { MouseEvent, use, useMemo } from "react"
import context from "../context"
import FileInfoIcon, { Props as FileInfoIconProps } from "./FileInfoIcon"

export type FileInfoProps = FileInfoIconProps & {
  className?: string
  onClick?: () => void
  onRemove?: (e: MouseEvent<HTMLDivElement>) => void
  isSelected?: boolean
}

type Props = FileInfoProps

export default function FileInfo({
  path,
  isDir,
  onClick,
  onRemove,
  isSelected,
}: Props) {
  const { setSelected, selected, go } = use(context)
  const name = getFileName(path)

  const handleDoubleClick = () => {
    if (!isDir) return
    go(path)
  }

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    setSelected({ path, isDir })
    onClick?.()
  }

  const selectedClassName = useMemo(() => {
    if (isSelected) return " selected "
    if (selected?.path === path) return " selected "
    return ""
  }, [isSelected, selected])

  return (
    <li
      className={"fileInfo" + (isDir ? " dir " : " file ") + selectedClassName}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      <FileInfoIcon
        path={path}
        isDir={isDir}
        type={name.split(".").at(-1)!}
        name={name}
      />
      <span>{name}</span>

      {onRemove && (
        <CloseOutlined
          className="absolute w-[40px] h-[40px] -mt-[20px] right-0 top-[50%] p-[8px]"
          onClick={onRemove}
        />
      )}
    </li>
  )
}
