import Disk from "@/app/disk/page"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { ContextMenuProvider } from "mantine-contextmenu"

import "@mantine/core/styles.css"
import "@mantine/core/styles.layer.css"
import "@mantine/notifications/styles.css"
import "mantine-contextmenu/styles.layer.css"

export default function Home() {
  return (
    <MantineProvider>
      <Notifications />
      <ContextMenuProvider
        zIndex={5000}
        shadow="md"
        borderRadius="md"
        repositionOnRepeat
      >
        <div className="flex h-screen border-[red] p-[16px] overflow-hidden">
          <Disk />
        </div>
      </ContextMenuProvider>
    </MantineProvider>
  )
}
