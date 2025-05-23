import { MAIN_DIR } from "@/constants"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const home = process.env.HOME!
  const { value } = request.cookies.get(MAIN_DIR) || {}

  try {
    return new Response(JSON.stringify(value || home), {
      status: 200,
    })
  } catch (err) {
    return new Response("读取 HOME 目录失败", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
