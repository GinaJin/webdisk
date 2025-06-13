import Applications from "@/assets/Applications.png"
import Desktop from "@/assets/Desktop.png"
import Documents from "@/assets/Documents.png"
import Downloads from "@/assets/Downloads.png"
import file from "@/assets/file.png"
import folder from "@/assets/folder.png"
import image from "@/assets/image.png"
import js from "@/assets/js.png"
import Movies from "@/assets/Movies.png"
import Music from "@/assets/Music.png"
import pdf from "@/assets/pdf.png"
import Photos from "@/assets/Photos.png"
import Pictures from "@/assets/Pictures.png"
import Public from "@/assets/Public.png"
import ts from "@/assets/ts.png"

export type Props = {
  name: string
  path: Path
  isDir: boolean
  type: string
}

const icons = {
  file,
  Movies,
  Applications,
  folder,
  Downloads,
  Music,
  Photos,
  Public,
  Pictures,
  Documents,
  Desktop,
  ts,
  js,
  pdf,
  jpeg: image,
  jpg: image,
  png: image,
  gif: image,
  bpm: image,
  webp: image,
  svg: image,
} as const
type IconKey = keyof typeof icons

const getFileName = ({ name, type, isDir }: Props) => {
  const target = icons[name] || icons[type]
  if (target) return target.src

  return isDir ? icons.folder.src : icons.file.src
}
export default function FileInfoIcon(fileInfo: Props) {
  return <img className="folderIcon" src={getFileName(fileInfo)} />
}
