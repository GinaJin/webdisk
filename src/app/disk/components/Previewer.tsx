import { FileInfoType } from "@/types"
import { use } from "react"
import context from "../context"
import FileInfo, { FileInfoProps } from "./FileInfo"
import "./styles.global.css"

type Props = {
  items: Array<FileInfoProps>
}

export default function Previewer({ items }: Props) {
  const { viewType, setSelected } = use(context)

  const viewTypeClass = viewType === "list" ? "list" : "grid"
  return (
    <ul
      className={`preview flex-grow-1 ${viewTypeClass}`}
      onClick={() => setSelected(null as unknown as FileInfoType)}
    >
      {items.map(item => {
        return <FileInfo key={item.path} {...item} />
      })}
    </ul>
  )
}
