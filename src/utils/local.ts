import safeParse from "./safeParse"

const buildKey = (key: string) => `disk_${key}`

export default {
  read<T = any>(key: string, defaults?: any) {
    const cached = localStorage.getItem(buildKey(key))
    return safeParse(cached, defaults as T) as T
  },
  save(key: string, value: any) {
    return localStorage.setItem(buildKey(key), JSON.stringify(value))
  },
  remove(key: string) {
    return localStorage.removeItem(buildKey(key))
  },
  clear() {
    return localStorage.clear()
  },
}
