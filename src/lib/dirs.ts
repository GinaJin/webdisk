import fs from "fs"
import path from "path"

const types = {
  dir: "dir",
  file: "file",
}
export async function readDir({
  dir,
  dirOnly = false,
  showHidden = false,
}: ViewDir) {
  try {
    let items = fs.readdirSync(dir)

    if (!showHidden) {
      items = items.filter(item => !item.startsWith("."))
    }

    let fullPathItems = items
      .map(item => path.join(dir, item)) // 全路径
      .map(item => ({
        isDir: isDir(item),
        path: item,
      }))

    if (dirOnly) {
      fullPathItems = fullPathItems.filter(item => item.isDir)
    }

    return fullPathItems
  } catch (e) {
    console.log(e)
    return []
  }
}

function isDir(path: string) {
  return fs.statSync(path).isDirectory()
}
