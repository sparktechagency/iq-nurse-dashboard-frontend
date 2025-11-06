'use client';

import { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const { TextArea } = Input;

interface ExamTopic {
    id: string;
    title: string;
    description: string;
    questionCount: number;
    questions?: Question[];
}

interface Question {
    id: string;
    type: 'multiple-choice' | 'multiple-response' | 'fill-in-the-blank';
    questionText: string;
    difficulty: 'easy' | 'medium' | 'hard';
    explanation: string;
    explanationImage?: string;
    options?: string[];
    correctAnswers: string[] | number[];
}

interface ExamTopicFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: any;
    initialData?: ExamTopic | null;
}

export default function ExamTopicFormModal({ isOpen, onClose, onSubmit, initialData }: ExamTopicFormModalProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                title: initialData.title,
                description: initialData.description,
            });
        } else {
            form.resetFields();
        }
    }, [initialData, isOpen]);

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const topic: ExamTopic = {
                id: initialData?.id || Date.now().toString(),
                title: values.title,
                description: values.description || '',
                questionCount: initialData?.questionCount || 0,
                questions: initialData?.questions || [],
            };
            onSubmit(topic);
        });
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            title={initialData ? 'Edit Topic' : 'Create New Topic'}
            footer={null} 
            destroyOnClose
            centered
        >
            <p className="text-muted-foreground mb-4">
                Add topic title and description. You can add questions after creating the topic.
            </p>

            <Form form={form} layout="vertical" className="space-y-4">
                <Form.Item
                    label="Topic Title *"
                    name="title"
                    rules={[{ required: true, message: 'Title is required' }]}
                >
                    <Input placeholder="Enter topic title" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <TextArea rows={4} placeholder="Enter topic description" />
                </Form.Item>
            </Form>

            <div className="flex gap-2 justify-end pt-4">
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" onClick={handleSubmit} className='!shadow-none'>
                    {initialData ? 'Update Topic' : 'Create Topic'}
                </Button>
            </div>
        </Modal>
    );
}
