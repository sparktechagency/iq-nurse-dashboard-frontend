'use client';

import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import JoditNote from '../../../../components/shared/JoditNote';

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