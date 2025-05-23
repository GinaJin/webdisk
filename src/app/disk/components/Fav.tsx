"use client"

import { use } from "react"
import context from "../context"
import FileInfo from "./FileInfo"

type Props = {
  items: any
}

export default function Fav({ items }: Props) {
  const { removeFavDir, listDir, go } = use(context)

  return (
    <div className="h-[100%] flex flex-col bg-[#eee] rounded-[4px] overflow-hidden">
      <b className="px-[16px] leading-[40px]">Favorites</b>
      <ul className="preview flex-grow-1 w-[240px] radius-[8px] overflow-auto bg-[transparent]!">
        {items.map((item: any) => {
          return (
            <FileInfo
              className=""
              key={item}
              path={item}
              isDir
              type=""
              onClick={() => {
                // listDir({ path: item })
                go(item)
              }}
              onRemove={() => removeFavDir(item)}
            />
          )
        })}
      </ul>
    </div>
  )
}
