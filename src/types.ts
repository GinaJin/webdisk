type ViewDir = {
  dir: string
  dirOnly?: boolean
  showHidden?: boolean
}
type Path = string
type ViewType = "list" | "grid"
type VoidFn = () => void
type ListParentDirFn = VoidFn
type SetDirFn = (path: string) => void
type DiskContext = {
  currentDir: string
  selectedDir: string
  showHidden: boolean
  dirOnly: boolean
  viewType: ViewType
  toggleViewType: VoidFn
  listDir: (args: any) => void
  listParentDir: ListParentDirFn
  setCurrentDir: SetDirFn
  setSelectedDir: SetDirFn
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
