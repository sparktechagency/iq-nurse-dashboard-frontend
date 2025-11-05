'use client';

import { useEffect, useState } from 'react';
import { Modal, Form, Input, Button as AntButton, Select, Checkbox, Radio, Upload } from 'antd';
import { PlusOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';

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

interface QuestionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (question: Question) => void;
    initialData?: any;
}

export default function QuestionFormModal({ isOpen, onClose, onSubmit, initialData }: QuestionFormModalProps) {
    const [form] = Form.useForm();

    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                ...initialData,
                correctAnswer: initialData.type === 'fill-in-the-blank' ? initialData.correctAnswers[0] : undefined,
            });

            setImagePreview(initialData.explanationImage || '');
        } else {
            form.resetFields();
            setImagePreview('');
        }
    }, [initialData, isOpen]);

    const handleImageUpload = (file: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
            form.setFieldValue('explanationImage', reader.result);
        };
        reader.readAsDataURL(file);
        return false;
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const {
                type,
                questionText,
                difficulty,
                explanation,
                explanationImage,
                options,
                correctAnswers,
                correctAnswer,
            } = values;

            let finalCorrectAnswers = correctAnswers || [];

            if (type === 'fill-in-the-blank') {
                finalCorrectAnswers = [Number(correctAnswer)];
            }

            const question: Question = {
                id: initialData?.id || Date.now().toString(),
                type,
                questionText,
                difficulty,
                explanation,
                explanationImage,
                options: type !== 'fill-in-the-blank' ? options.filter((o: string) => o.trim()) : undefined,
                correctAnswers: finalCorrectAnswers,
            };

            onSubmit(question);
            form.resetFields();
            setImagePreview('');
        });
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={900}
            className="max-h-[90vh] overflow-y-auto"
            title={initialData ? 'Edit Question' : 'Add New Question'}
            centered
        >
            <Form form={form} layout="vertical">
                {/* Question Type */}
                <Form.Item name="type" label="Question Type *" initialValue="multiple-choice">
                    <Select
                        options={[
                            { label: 'Multiple Choice', value: 'multiple-choice' },
                            { label: 'Multiple Response', value: 'multiple-response' },
                            { label: 'Fill-in-the-Blank (Numeric)', value: 'fill-in-the-blank' },
                        ]}
                    />
                </Form.Item>

                {/* Question Text */}
                <Form.Item
                    name="questionText"
                    label="Question Text *"
                    rules={[{ required: true, message: 'Please enter question' }]}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>

                {/* Difficulty */}
                <Form.Item name="difficulty" label="Difficulty" initialValue="medium">
                    <Select
                        options={[
                            { value: 'easy', label: 'Easy' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'hard', label: 'Hard' },
                        ]}
                    />
                </Form.Item>

                {/* Options + Correct Answers */}
                <Form.Item noStyle shouldUpdate={(prev, next) => prev.type !== next.type}>
                    {({ getFieldValue }) =>
                        getFieldValue('type') !== 'fill-in-the-blank' && (
                            <>
                                <Form.Item
                                    name="correctAnswers"
                                    label="Correct Answer(s)"
                                    rules={[{ required: true, message: 'Select correct answer(s)' }]}
                                    initialValue={initialData?.correctAnswers || []}
                                >
                                    {getFieldValue('type') === 'multiple-response' ? (
                                        <Checkbox.Group className="w-full">
                                            <Form.List name="options" initialValue={['', '', '', '']}>
                                                {(fields, { add, remove }) => (
                                                    <div className="space-y-3">
                                                        <label className="font-medium">Answer Options *</label>

                                                        {fields.map((field, index) => (
                                                            <div key={field.key} className="flex items-center gap-2">
                                                                {/* Option Text */}
                                                                <Form.Item
                                                                    name={[field.name]}
                                                                    className="flex-1"
                                                                    rules={[{ required: true }]}
                                                                >
                                                                    <Input
                                                                        placeholder={`Option ${String.fromCharCode(
                                                                            65 + index,
                                                                        )}`}
                                                                    />
                                                                </Form.Item>

                                                                {/* Centered Checkbox */}
                                                                <div className="w-10 flex justify-center">
                                                                    <Checkbox value={index} />
                                                                </div>

                                                                {fields.length > 2 && (
                                                                    <AntButton
                                                                        danger
                                                                        onClick={() => remove(field.name)}
                                                                        icon={<DeleteOutlined />}
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}

                                                        <AntButton
                                                            type="dashed"
                                                            icon={<PlusOutlined />}
                                                            onClick={() => add('')}
                                                            className="mt-2"
                                                        >
                                                            Add Option
                                                        </AntButton>
                                                    </div>
                                                )}
                                            </Form.List>
                                        </Checkbox.Group>
                                    ) : (
                                        <Radio.Group className="w-full">
                                            <Form.List name="options" initialValue={['', '', '', '']}>
                                                {(fields, { add, remove }) => (
                                                    <div className="space-y-3">
                                                        <label className="font-medium">Answer Options *</label>

                                                        {fields.map((field, index) => (
                                                            <div key={field.key} className="flex items-center gap-2">
                                                                {/* Option Text */}
                                                                <Form.Item
                                                                    name={[field.name]}
                                                                    className="flex-1"
                                                                    rules={[{ required: true }]}
                                                                >
                                                                    <Input
                                                                        placeholder={`Option ${String.fromCharCode(
                                                                            65 + index,
                                                                        )}`}
                                                                    />
                                                                </Form.Item>

                                                                {/* Centered Radio */}
                                                                <div className="w-10 flex justify-center">
                                                                    <Radio value={index} />
                                                                </div>

                                                                {fields.length > 2 && (
                                                                    <AntButton
                                                                        danger
                                                                        onClick={() => remove(field.name)}
                                                                        icon={<DeleteOutlined />}
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}

                                                        <AntButton
                                                            type="dashed"
                                                            icon={<PlusOutlined />}
                                                            onClick={() => add('')}
                                                            className="mt-2"
                                                        >
                                                            Add Option
                                                        </AntButton>
                                                    </div>
                                                )}
                                            </Form.List>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                            </>
                        )
                    }
                </Form.Item>

                {/* Fill in the blank */}
                <Form.Item noStyle shouldUpdate={(prev, next) => prev.type !== next.type}>
                    {({ getFieldValue }) =>
                        getFieldValue('type') === 'fill-in-the-blank' && (
                            <Form.Item
                                name="correctAnswer"
                                label="Correct Answer (Numeric)"
                                rules={[{ required: true, message: 'Enter numeric value' }]}
                            >
                                <Input />
                            </Form.Item>
                        )
                    }
                </Form.Item>

                {/* Explanation */}
                <Form.Item name="explanation" label="Explanation (Optional)">
                    <Input.TextArea rows={4} />
                </Form.Item>

                {/* Image Upload */}
                <Form.Item name="explanationImage" label="Explanation Image (Optional)">
                    <Upload beforeUpload={handleImageUpload} showUploadList={false}>
                        <AntButton icon={<UploadOutlined />}>Upload</AntButton>
                    </Upload>

                    {imagePreview && (
                        <div className="relative mt-3">
                            <img src={imagePreview} className="h-48 rounded-lg object-cover" />

                            <AntButton
                                danger
                                size="small"
                                style={{ position: 'absolute', top: 10, right: 10 }}
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    setImagePreview('');
                                    form.setFieldValue('explanationImage', '');
                                }}
                            />
                        </div>
                    )}
                </Form.Item>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-2 border-t pt-4">
                    <AntButton onClick={onClose}>Cancel</AntButton>
                    <AntButton type="primary" onClick={handleSubmit}>
                        {initialData ? 'Update Question' : 'Save Question'}
                    </AntButton>
                </div>
            </Form>
        </Modal>
    );
}
