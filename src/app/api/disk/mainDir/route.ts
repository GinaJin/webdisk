import { MAIN_DIR } from "@/constants";
import { NextRequest } from "next/server";

// 简单起见，直接写到浏览器的cookie中，不再记录到数据库或者文件系统
export async function POST(request: NextRequest) {
  const { dir } = await request.json()

  if (!dir) return new Response("[dir] is required!", { status: 400 })

  return new Response("", {
    status: 200,
    headers: { "Set-Cookie": `${MAIN_DIR}=${dir}` },
  })
}
