import isNil from "./isNil"

export default <T>(json?: string | null, defaults?: T) => {
  try {
    if (isNil(json)) return defaults as T
    return JSON.parse(json!) as T
  } catch (e) {
    console.error((e as Error)?.message || e)
    return json || defaults
  }
}
