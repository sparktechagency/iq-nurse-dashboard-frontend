'use client';

import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Upload, UploadProps } from 'antd';

interface SubcategoryFormModalProps {
    isOpen: boolean;
    subcategory?: { id: string; name: string; icon: string } | null;
    onClose: () => void;
    onSubmit: (name: string, icon: string) => void;
    title?: string;
}

export default function CarePlansCategoryFormModal({
    isOpen,
    subcategory,
    onClose,
    onSubmit,
    title,
}: SubcategoryFormModalProps) {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info) => {
        const file = info.file.originFileObj;
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            setImageUrl(base64);
            form.setFieldsValue({ icon: base64 });
        };

        reader.readAsDataURL(file);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    useEffect(() => {
        if (subcategory) {
            form.setFieldsValue({
                name: subcategory.name,
                icon: subcategory.icon,
            });
            setImageUrl(subcategory.icon);
        } else {
            form.resetFields();
            setImageUrl(undefined);
        }
    }, [subcategory, isOpen]);

    const handleFinish = (values: any) => {
        onSubmit(values.name, imageUrl || '');
    };

    return (
        <Modal open={isOpen} footer={null} onCancel={onClose} centered width={425}>
            <div className="space-y-4 py-4">
                <h2 className="text-xl font-semibold px-1">{subcategory ? `Edit ${title}` : `Add New ${title}`}</h2>

                <Form layout="vertical" form={form} onFinish={handleFinish}>
                    {/* Name */}
                    <Form.Item
                        label={`${title} Name`}
                        name="name"
                        rules={[{ required: true, message: 'Please enter a name' }]}
                    >
                        <Input placeholder="Enter name" />
                    </Form.Item>

                    {/* Icon Upload */}
                    <Form.Item
                        label={`${title} Icon`}
                        name="icon"
                        rules={[{ required: true, message: 'Please upload an icon' }]}
                    >
                        <Upload listType="picture-card" showUploadList={false} onChange={handleChange}>
                            {imageUrl ? <img src={imageUrl} alt="icon" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-6">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            {subcategory ? `Update ${title}` : `Create ${title}`}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}
