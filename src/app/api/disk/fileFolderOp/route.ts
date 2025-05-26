import fs from "fs"
import { NextRequest } from "next/server"
import path from "path"

// new folder
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log(data)
    const { currentDir, folderName } = data

    if (!currentDir)
      return new Response("[currentDir] is required!", { status: 400 })

    if (!folderName)
      return new Response("[folderName] is required!", { status: 400 })
    // 检查文件夹是否已存在
    const fullPath = path.join(currentDir, folderName)
    const exists = await checkFileExists(fullPath)
    if (exists) {
      return new Response("文件夹已存在", { status: 400 })
    }
    // 创建文件夹
    await fs.promises.mkdir(fullPath)
    return new Response("创建成功", { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("", { status: 500 })
  }
}
// rename
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    console.log(data)
    const { currentDir, folderName } = data

    if (!currentDir)
      return new Response("[currentDir] is required!", { status: 400 })

    const oldPath = currentDir
    const newPath = currentDir + folderName
    await fs.promises.rename(oldPath, newPath)
    return new Response("重命名成功", { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("内部错误", { status: 500 })
  }
}
// 删除文件(夹)
// (为了简单)约定：当是文件夹类型时，前端弹窗确定：是否要把整体文件夹删除?
export async function DELETE(request: NextRequest) {
  const data = await request.json()
  const { path } = data

  if (!path) return new Response("[path] is required!", { status: 400 })

  try {
    await fs.promises.rm(path, { recursive: true, force: true })
    return new Response("删除成功", {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response("", { status: 500 })
  }
}

async function checkFileExists(filePath: string) {
  try {
    await fs.promises.access(filePath)
    return true // 文件存在
  } catch (err) {
    return false // 文件不存在
  }
}
