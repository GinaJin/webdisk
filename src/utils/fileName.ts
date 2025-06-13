export default function getFileName(path: string) {
  return path.split("/").at(-1) || "/"
}
