"use client"

import getFileName from "@/utils/fileName"
import { CloseOutlined } from "@ant-design/icons"
import { use } from "react"
import context from "../context"
import FileInfoIcon, { Props as FileInfoIconProps } from "./FileInfoIcon"

export type FileInfoProps = FileInfoIconProps & {
  className?: string
  onClick?: () => void
  onRemove?: () => void
}

type Props = FileInfoProps

export default function FileInfo({
  path,
  isDir,
  type,
  className,
  onClick,
  onRemove,
}: Props) {
  const { setSelectedDir, selectedDir, go } = use(context)
  const name = getFileName(path)

  const handleDoubleClick = () => {
    if (!isDir) return
    go(path)
  }

  const handleClick = () => {
    if (!isDir) return
    setSelectedDir(path)
    onClick?.()
  }

  return (
    <li
      className={
        "fileInfo" +
        (isDir ? " dir " : " file ") +
        (selectedDir === path ? " selected " : "")
      }
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
