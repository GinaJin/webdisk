import { dirOnlyKey, showHiddenKey } from "@/constants"
import local from "@/utils/local"
import { UploadOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Modal,
  Switch,
  Upload,
} from "antd"
import { use, useState } from "react"
import context from "../context"
import FileInfo, { FileInfoProps } from "./FileInfo"
import "./styles.global.css"

type Props = {
  items: Array<FileInfoProps>
}

export default function Previewer({ items }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false)

  const [form] = Form.useForm()

  const {
    currentDir,
    listParentDir,
    setHomeDir,
    addFavDir,
    setDirOnly,
    setShowHidden,
    showHidden,
    dirOnly,
    listDir,
    viewType,
    toggleViewType,
    back,
    forward,
    canBack,
    canForward,
  } = use(context)
  const toggleShowHiddenConfig = () => {
    local.save(showHiddenKey, !showHidden)
    setShowHidden(!showHidden)
  }
  const toggleDirOnlyConfig = () => {
    local.save(dirOnlyKey, !dirOnly)
    setDirOnly(!dirOnly)
  }

  const addDir = folderName => {
    fetch(`/api/disk/fileFolderOp`, {
      method: "POST",
      body: JSON.stringify({
        currentDir,
        folderName,
      }),
    }).then(() =>
      listDir({
        path: currentDir,
      }),
    )
  }

  const uploadFile = () => {}

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setIsModalOpen(false)
      form.resetFields()
      addDir(values.folderName)
    } catch (error) {
      console.error("表单验证失败:", error)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onClickMenu: MenuProps["onClick"] = path => {
    console.log("click", path)
    fetch(`/api/disk/fileFolderOp`, {
      method: "DELETE",
      body: JSON.stringify({
        path,
      }),
    }).then(() =>
      listDir({
        path: currentDir,
      }),
    )
  }

  return (
    <div className="flex flex-col gap-[8px] w-full">
      <ul className="flex items-center gap-[16px] p-[8px] bg-[#f5f6f7] rounded-[4px] mb-[4px]">
        <li>
          <Button
            className="py-[4px] px-[8px] border-1"
            onClick={listParentDir}
          >
            ^
          </Button>
          <Button
            className="py-[4px] px-[8px] border-1"
            onClick={back}
            disabled={!canBack}
          >
            &lt;-
          </Button>
          <Button
            className="py-[4px] px-[8px] border-1"
            onClick={forward}
            disabled={!canForward}
          >
            -&gt;
          </Button>
          <b>{currentDir.split("/").at(-1)}</b>
        </li>
        <li>
          <Button className="py-[4px] px-[8px] border-1" onClick={setHomeDir}>
            设置主目录
          </Button>
          <Button className="py-[4px] px-[8px] border-1" onClick={addFavDir}>
            收藏
          </Button>
        </li>
        <li>
          <Checkbox
            defaultChecked={!showHidden}
            checked={!showHidden}
            onClick={toggleShowHiddenConfig}
          >
            显示隐藏文件
          </Checkbox>
          <Checkbox
            defaultChecked={!dirOnly}
            checked={!dirOnly}
            onClick={toggleDirOnlyConfig}
          >
            显示全部
          </Checkbox>
        </li>
        <li>
          <Switch
            title={viewType === "list" ? "列表视图" : "平铺视图"}
            className="h-[30px] py-[4px] px-[8px] border-1"
            checkedChildren="列表"
            unCheckedChildren="平铺"
            checked={viewType === "list"}
            onChange={toggleViewType}
          />
        </li>
        <li>
          <Button
            className="py-[4px] px-[8px] border-1"
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            新建文件夹
          </Button>
          <Button
            icon={<UploadOutlined />}
            onClick={() => {
              setIsUploadOpen(true)
              setFileList([])
            }}
          >
            上传文件
          </Button>
        </li>
      </ul>
      <ul
        className={
          "preview flex-grow-1 " + (viewType === "list" ? "list" : "grid")
        }
      >
        {items.map(item => {
          return (
            <Dropdown
              key={item.path}
              menu={{
                items: [
                  {
                    label: "删除",
                    key: "1",
                  },
                ],
                onClick: () => onClickMenu(item.path),
              }}
              trigger={["contextMenu"]}
            >
              <div onClick={e => e.preventDefault()}>
                <FileInfo key={item.path} {...item} />
              </div>
            </Dropdown>
          )
        })}
      </ul>
      <Modal
        title="新建"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmit}>
            提交
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            label="文件夹名称"
            name="folderName"
            rules={[{ required: true }]}
          >
            <Input placeholder="folber name" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="上传"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isUploadOpen}
        onCancel={() => {
          setIsUploadOpen(false)
        }}
        onOk={() => {
          setIsUploadOpen(false)
        }}
        destroyOnHidden
      >
        <Upload
          action={"/api/disk/upload"}
          name="file"
          data={{ currentDir }}
          maxCount={1}
          onChange={info => {
            if (info.file.status === "done") {
              setIsUploadOpen(false)
              listDir({ path: currentDir })
            }
          }}
        >
          <Button icon={<UploadOutlined />}>upload</Button>
        </Upload>
      </Modal>
    </div>
  )
}
