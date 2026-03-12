'use client';

import React, { useState } from 'react';
import { Button, Form, Input, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import JoditNote from '../../../components/shared/JoditNote';

interface TopicFormProps {
    onSubmit: (topic: any) => void;
    onCancel: () => void;
    initialTitle?: string;
    initialOverview?: string;
    isEditing?: boolean;
}

export default function TopicForm({
    onSubmit,
    onCancel,
    initialTitle = '',
    initialOverview = '',
    isEditing = false,
}: TopicFormProps) {
    const [form] = Form.useForm();
    const [overview, setOverview] = useState(initialOverview);
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

    const handleFinish = (values: any) => {
        const topicData = {
            id: isEditing ? undefined : `topic-${Date.now()}`,
            title: values.title,
            overview: values.overview,
            icon: values.icon,
            media: [],
            flashcards: [],
            questions: [],
        };

        onSubmit(topicData);
        form.resetFields();
        setImageUrl(undefined);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
                title: initialTitle,
                overview: initialOverview,
            }}
        >
            {/* Title */}
            <Form.Item
                label="Topic Title"
                name="title"
                rules={[{ required: true, message: 'Topic title is required' }]}
            >
                <Input placeholder="Enter topic title" />
            </Form.Item>

            {/* Icon Upload */}
            <Form.Item
                label="Topic Icon"
                name="icon"
                rules={[{ required: true, message: 'Please upload an icon' }]}
            >
                <Upload
                    listType="picture-card"
                    showUploadList={false}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                        <img src={imageUrl} alt="icon" style={{ width: '100%' }} />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </Form.Item>

            {/* Overview */}
            <div className="min-h-[250px]">
                <label className="block text-sm font-medium text-foreground mb-1">Topic overview</label>
                <div className="min-h-[250px] border border-border rounded-lg">
                    <JoditNote
                        content={overview}
                        handleContentChange={(newContent: string) => setOverview(newContent)}
                        height="400px"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-3">
                <Button
                    size="large"
                    htmlType="submit"
                    className="flex-1 bg-primary hover:!bg-primary/90 text-white hover:!text-white"
                >
                    {isEditing ? 'Update Topic' : 'Create Topic'}
                </Button>

                <Button
                    size="large"
                    onClick={onCancel}
                    className="flex-1 bg-transparent"
                >
                    Cancel
                </Button>
            </div>
        </Form>
    );
}