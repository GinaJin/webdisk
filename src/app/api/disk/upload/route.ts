import { NextRequest } from "next/server"

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    console.log("upload data======", data)
  } catch (e) {
    return new Response("", {
      status: 500,
    })
  }
}
