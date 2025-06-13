type ViewDir = {
  dir: string
  dirOnly?: boolean
  showHidden?: boolean
}
export type Path = string
export type FileInfoType = {
  path: Path
  isDir: boolean
}
export type ViewType = "list" | "grid"
export type VoidFn = () => void
export type ListParentDirFn = VoidFn
export type SetDirFn = (path: string) => void
export type DiskContext = {
  currentDir: string
  selected: FileInfoType
  showHidden: boolean
  dirOnly: boolean
  viewType: ViewType
  toggleViewType: VoidFn
  listDir: (args: any) => void
  listParentDir: ListParentDirFn
  setCurrentDir: SetDirFn
  setSelected: (item: FileInfoType) => void
  setHomeDir: VoidFn
  addFavDir: VoidFn
  setShowHidden: (showHidden: boolean) => void
  setDirOnly: (dirOnly: boolean) => void
  removeFavDir: (path: string) => void
  back: VoidFn
  forward: VoidFn
  go: SetDirFn
  canBack: boolean
  canForward: boolean
}
