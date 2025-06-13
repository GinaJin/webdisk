import ActionBarDirSetter from "./ActionBarDirSetter"
import ActionBarFile from "./ActionBarFile"
import ActionBarNav from "./ActionBarNav"
import ActionBarViewMode from "./ActionBarViewMode"
import ActionBarVisible from "./ActionBarVisible"

export default function ActionBar() {
  return (
    <ul className="flex items-center gap-[16px] p-[8px] bg-[#f5f6f7] rounded-[4px] mb-[4px]">
      <ActionBarNav />
      <ActionBarDirSetter />
      <ActionBarVisible />
      <ActionBarViewMode />
      <ActionBarFile />
    </ul>
  )
}
