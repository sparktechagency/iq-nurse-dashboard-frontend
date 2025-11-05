import { Button, Form, Input, Modal, Typography } from "antd";
import { useMemo, useRef, useState } from "react"
const { Text } = Typography
import "jodit/es2021/jodit.min.css";
import JoditEditor from "jodit-react";


const AddCardInfoModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const [form] = Form.useForm();
    const editorRef = useRef(null)
    const [description, setDescription] = useState("")

    const joditConfig = useMemo(() => ({
        readonly: false,
        placeholder: "Write description...",
        toolbarAdaptive: false,
        toolbarSticky: true,
        height: 370,
        uploader: { insertImageAsBase64URI: true }
    }), [])

    return (
        <Modal
            title={<span className="text-lg font-semibold">Add Card Info</span>}
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
            width={600}
            centered
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Front Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter Title' }]}
                >
                    <Input placeholder="Enter Title" size="large" />
                </Form.Item>
                <Form.Item label="Back Description" required className="">
                    <div className="border border-gray-300 rounded-md">
                        {/* @ts-ignore Jodit types */}
                        <JoditEditor ref={editorRef} value={description} config={joditConfig} onChange={v => setDescription(v)} className="border" />
                    </div>
                    <Text type="secondary">Use the toolbar to format your content</Text>
                </Form.Item>

                <Form.Item label="Hint " required className="">
                    <div className="border border-gray-300 rounded-md">
                        {/* @ts-ignore Jodit types */}
                        <JoditEditor ref={editorRef} value={description} config={joditConfig} onChange={v => setDescription(v)} className="border" />
                    </div>
                    <Text type="secondary">Use the toolbar to format your content</Text>
                </Form.Item>


                <Form.Item className=" flex items-center justify-end ">
                    <Button htmlType="reset" style={{ width: 150, height: 40, marginRight: 12 }}>Reset</Button>
                    <Button type="primary" htmlType="submit" size="large" style={{ width: 150, height: 40 }}>Save</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCardInfoModal;