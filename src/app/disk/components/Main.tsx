import { ComponentProps } from "react"
import ActionBar from "./ActionBar"
import Previewer from "./Previewer"
import "./styles.global.css"

type Props = ComponentProps<typeof Previewer>

export default function Main({ items }: Props) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <ActionBar />
      <Previewer items={items} />
    </div>
  )
}
