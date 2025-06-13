import { dirOnlyKey, showHiddenKey } from "@/constants"
import { readDir } from "@/lib/dirs"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const currentDir = searchParams.get("currentDir")
  const dirOnlySetting = searchParams.get(dirOnlyKey) == "1"
  const showHiddenSetting = searchParams.get(showHiddenKey) == "1"

  if (!currentDir)
    return new Response("[currentDir] is required!", { status: 400 })

  try {
    const dirs = await readDir({
      dir: currentDir,
      dirOnly: dirOnlySetting,
      showHidden: showHiddenSetting,
    })
    return new Response(JSON.stringify(dirs), { status: 200 })
  } catch (error) {
    console.error(error, currentDir)
    return new Response(JSON.stringify([]), { status: 200 })
  }
}
