import toast from "@/utils/toast"
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Text,
  TextInput,
} from "@mantine/core"
import {
  ArrowRightIcon,
  BoxArrowUpIcon,
  FolderPlusIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import Upload from "rc-upload"
import { use, useState } from "react"
import context from "../context"
import ActionButton from "./ActionButton"

export default function ActionBarFile() {
  const { currentDir, listDir, selected } = use(context)

  const [newFolderVisible, setNewFolderVisible] = useState(false)
  const [removeFileVisible, setRemoveFileVisible] = useState(false)
  const [renameVisible, setRenameVisible] = useState(false)
  const [uploadVisible, setUploadVisible] = useState(false)

  const [newFolderName, setNewFolderName] = useState("")
  const [newName, setNewName] = useState("")

  const newFolder = async () => {
    try {
      await fetch("/api/disk/fileFolderOp", {
        method: "POST",
        body: JSON.stringify({
          currentDir,
          folderName: newFolderName,
        }),
      })
      await listDir({ path: currentDir })
      setNewFolderName("")
      setNewFolderVisible(false)
    } catch (error) {
      toast.error("创建目录失败!")
    }
  }

  const removeFolder = async () => {
    try {
      await fetch("/api/disk/fileFolderOp", {
        method: "DELETE",
        body: JSON.stringify({
          path: selected.path,
        }),
      })
      await listDir({ path: currentDir })
      setRemoveFileVisible(false)
    } catch (error) {
      toast.error("删除失败!")
    }
  }

  const rename = async () => {
    if (!newName) return toast.show("请输入新名")
    const oldFullPath = selected.path
    const newFullPath = currentDir + "/" + newName
    if (oldFullPath === newFullPath)
      return toast.show("新旧名字相同，跳过重命名")

    try {
      await fetch("/api/disk/fileFolderOp", {
        method: "PUT",
        body: JSON.stringify({
          oldName: selected.path,
          newName: currentDir + "/" + newName,
        }),
      })
      await listDir({ path: currentDir })
      setNewName("")
      setRenameVisible(false)
    } catch (error) {
      toast.error("创建目录失败!")
    }
  }

  return (
    <>
      <li className="flex gap-[8px]">
        <ActionIcon.Group>
          <ActionButton
            tooltip="新建文件夹"
            icon={<FolderPlusIcon />}
            onClick={() => setNewFolderVisible(true)}
          />
          <ActionButton
            tooltip="删除"
            icon={<TrashIcon />}
            disabled={!selected?.path}
            onClick={() => setRemoveFileVisible(true)}
          />
          <ActionButton
            tooltip="重命名"
            icon={<ArrowRightIcon />}
            disabled={!selected?.path}
            onClick={() => setRenameVisible(true)}
          />
          <ActionButton
            tooltip="上传文件"
            icon={<BoxArrowUpIcon />}
            onClick={() => setUploadVisible(true)}
          />
        </ActionIcon.Group>
      </li>

      <Modal
        opened={newFolderVisible}
        onClose={() => setNewFolderVisible(false)}
        closeOnEscape
        yOffset={100}
        title="请输入 文件夹名称"
      >
        <Group align="flex-end">
          <TextInput
            placeholder="中文、英文、数字"
            onChange={e => setNewFolderName(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button disabled={newFolderName.length <= 0} onClick={newFolder}>
            确定
          </Button>
        </Group>
      </Modal>
      <Modal
        opened={removeFileVisible}
        onClose={() => setRemoveFileVisible(false)}
        closeOnEscape
        yOffset={100}
        title="二次删除确认"
      >
        <Group align="flex-end">
          <Text>
            确定要删除 {selected?.path}?
            <br />
            <br />
            删除后不可恢复，如果是目录，其内部的所有文件也会一并删除
          </Text>
          <Button
            className="ml-auto"
            variant="outline"
            onClick={() => setRemoveFileVisible(false)}
          >
            取消
          </Button>
          <Button onClick={removeFolder}>确定</Button>
        </Group>
      </Modal>
      <Modal
        opened={renameVisible}
        onClose={() => setRenameVisible(false)}
        closeOnEscape
        yOffset={100}
        title="请输入 新名字"
      >
        <Group align="flex-end">
          <TextInput
            placeholder="中文、英文、数字"
            onChange={e => setNewName(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button disabled={newName.length <= 0} onClick={rename}>
            确定
          </Button>
        </Group>
      </Modal>
      <Modal
        opened={uploadVisible}
        onClose={() => setUploadVisible(false)}
        yOffset={100}
        title="上传"
      >
        <Group align="flex-end">
          <Upload
            action="/api/disk/upload"
            name="file"
            data={{ currentDir }}
            onSuccess={() => {
              toast.show("上传成功！")
              listDir()
            }}
            onError={e => toast.show("上传失败！")}
          >
            <Button>上传</Button>
          </Upload>
        </Group>
      </Modal>
    </>
  )
}
