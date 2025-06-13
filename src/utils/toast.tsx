import { notifications } from "@mantine/notifications"
import { CheckIcon, XIcon } from "@phosphor-icons/react"

const toast = {
  show(title: string, message = "", icon = <CheckIcon />) {
    notifications.show({
      radius: "xs",
      position: "top-right",
      title,
      message,
      icon,
    })
  },
  error(title: string, message = "") {
    return this.show(title, message, <XIcon />)
  },
}

export default toast
