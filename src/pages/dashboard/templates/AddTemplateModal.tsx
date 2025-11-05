import { Button, Form, Input, Modal, Select, Typography, Upload } from "antd";
import { templateCategories } from "../../../demo-data/template-data";
import { useMemo, useRef, useState } from "react"
const { Text } = Typography
import "jodit/es2021/jodit.min.css";
import JoditEditor from "jodit-react";
import { GoInbox } from "react-icons/go";

const AddTemplateModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
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
            title={<span className="text-lg font-semibold">Add Template</span>}
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
            width={600}
            centered
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select Category' }]}
                >
                    <Select placeholder="Select category" className="w-[200px] h-10" size="large">
                        {templateCategories.map((cat) => (
                            <Select.Option key={cat.id} value={cat.name}>
                                {cat.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <div className=" grid grid-cols-2 gap-x-4">
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter Title' }]}
                    >
                        <Input placeholder="Enter Title" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Sub-title"
                        name="subtitle"
                        rules={[{ required: true, message: 'Please enter Sub-title' }]}
                    >
                        <Input placeholder="Enter Sub-title" size="large" />
                    </Form.Item>
                </div>

                <Form.Item label="Description" required className="">
                    <div className="border border-gray-300 rounded-md">
                        {/* @ts-ignore Jodit types */}
                        <JoditEditor ref={editorRef} value={description} config={joditConfig} onChange={v => setDescription(v)} className="border" />
                    </div>
                    <Text type="secondary">Use the toolbar to format your content</Text>
                </Form.Item>

                <Form.Item label="Upload pdf files" name="pdfFiles" valuePropName="fileList" >
                    <Upload listType="picture-card" multiple accept=".pdf" >
                        <div className=" p-2 flex flex-col items-center  justify-center gap-y-2 ">
                            <GoInbox size={32} color="#8e8a8a" className="" />
                            <p className="text-[#8e8a8a] font-medium text-xs ">Upload PDF</p>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item className=" flex items-center justify-end ">
                    <Button htmlType="reset" style={{ width: 150, height: 40, marginRight: 12 }}>Reset</Button>
                    <Button type="primary" htmlType="submit" size="large" style={{ width: 150, height: 40 }}>Save</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddTemplateModal;