import fs from "fs"
import { NextRequest } from "next/server"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file = data.get("file") as File
    const currentDir = data.get("currentDir") as string

    if (!file) return new Response("No file provided", { status: 400 })

    const target = path.join(currentDir, file.name)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.promises.writeFile(target, buffer)

    return new Response("上传成功", { status: 200 })
  } catch (e) {
    return new Response("", {
      status: 500,
    })
  }
}
