import { useRef, useState } from "react"

export default function useBackForward(setCurrentDir: SetDirFn) {
  const queueRef = useRef([] as string[])
  const [index, setIndex] = useState(-1)

  const back = () => {
    const prevIndex = index - 1
    setIndex(prevIndex)
    setCurrentDir(queueRef.current[prevIndex])
  }

  const forward = () => {
    const nextIndex = index + 1
    setIndex(nextIndex)
    setCurrentDir(queueRef.current[nextIndex])
  }

  const go = (path: string) => {
    if (path === queueRef.current[index]) return

    if (index < queueRef.current.length - 1) {
      queueRef.current = queueRef.current.slice(0, index + 1)
    }

    queueRef.current.push(path)
    setIndex(index + 1)
    setCurrentDir(queueRef.current[index + 1])
  }

  const canBack = index > 0
  const canForward = index < queueRef.current.length - 1

  return { back, forward, go, canBack, canForward }
}
