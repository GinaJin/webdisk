"use client"

import { use } from "react"
import context from "../context"
import FileInfo from "./FileInfo"

type Props = {
  items: Array<string>
}

export default function Fav({ items }: Props) {
  const { currentDir, removeFavDir, go } = use(context)

  return (
    <div className="h-[100%] flex-shrink-0 flex flex-col bg-[#eee] rounded-[4px] overflow-hidden">
      <b className="px-[16px] leading-[40px]">Favorites</b>
      <ul className="preview flex-grow-1 w-[240px] rounded-[0]! overflow-auto bg-[transparent]!">
        {items.map(item => {
          return (
            <FileInfo
              key={item}
              path={item}
              isDir
              type=""
              onClick={() => go(item)}
              isSelected={currentDir === item}
              onRemove={e => {
                e.stopPropagation()
                removeFavDir(item)
              }}
            />
          )
        })}
      </ul>
    </div>
  )
}
