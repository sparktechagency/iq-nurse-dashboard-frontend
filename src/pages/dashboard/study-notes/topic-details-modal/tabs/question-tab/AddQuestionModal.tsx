'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Modal, Form, Input, Button as AntButton, Radio } from 'antd';

interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

interface AddQuestionModalProps {
    onAdd: (question: Question) => void;
    onClose: () => void;
}

export default function AddQuestionModal({ onAdd, onClose }: AddQuestionModalProps) {
    const [form] = Form.useForm();

    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index: number) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));

            if (correctAnswerIndex === index) {
                setCorrectAnswerIndex(null);
            } else if (correctAnswerIndex !== null && correctAnswerIndex > index) {
                setCorrectAnswerIndex(correctAnswerIndex - 1);
            }
        }
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const filledOptions = options.filter((opt) => opt.trim());
            if (filledOptions.length < 2) {
                alert('Please provide at least 2 options');
                return;
            }

            if (correctAnswerIndex === null || correctAnswerIndex >= filledOptions.length) {
                alert('Please select a valid correct answer');
                return;
            }

            const newQuestion: Question = {
                id: `q-${Date.now()}`,
                question: values.questionText,
                options: filledOptions,
                correctAnswer: String.fromCharCode(65 + correctAnswerIndex),
                explanation: values.explanation || '',
            };

            onAdd(newQuestion);
            onClose();
        });
    };

    return (
        <Modal open={true} onCancel={onClose} onOk={handleSave} okText="Add Question" cancelText="Cancel" width={700}>
            <div className="max-h-[80vh] overflow-y-auto py-3">
                <h2 className="text-xl font-semibold mb-4">Add New Question</h2>

                <Form form={form} layout="vertical">
                    {/*  Question */}
                    <Form.Item
                        name="questionText"
                        label={
                            <span className="text-sm font-semibold text-foreground">
                                Question <span className="text-red-500">*</span>
                            </span>
                        }
                        rules={[{ required: true, message: 'Question is required' }]}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Enter your question here..."
                            className="w-full px-3 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground resize-none"
                        />
                    </Form.Item>

                    {/*  Explanation (new field) */}
                    <Form.Item
                        name="explanation"
                        label={<span className="text-sm font-semibold text-foreground">Explanation (optional)</span>}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Add explanation for the correct answer..."
                            className="w-full px-3 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground resize-none"
                        />
                    </Form.Item>

                    {/*  Options */}
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                            Answer Options <span className="text-red-500">*</span>
                        </label>

                        <div className="space-y-2">
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Radio
                                        checked={correctAnswerIndex === index}
                                        onChange={() => setCorrectAnswerIndex(index)}
                                        className="cursor-pointer"
                                    />

                                    <span className="w-8 text-sm font-semibold text-muted-foreground">
                                        {String.fromCharCode(65 + index)}.
                                    </span>

                                    <Input
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                                        className="flex-1 px-3 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground"
                                    />

                                    {options.length > 2 && (
                                        <button
                                            onClick={() => handleRemoveOption(index)}
                                            className="p-1.5 hover:bg-destructive/20 rounded text-muted-foreground hover:text-destructive"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <AntButton
                            onClick={handleAddOption}
                            block
                            className="mt-3 bg-transparent border border-border flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Another Option
                        </AntButton>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}
