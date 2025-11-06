'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Upload, Button as AntButton, Checkbox, Radio } from 'antd';
import { PlusOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

interface Question {
    id: string;
    type: 'multiple-choice' | 'multiple-response' | 'fill-in-the-blank';
    questionText: string;
    difficulty: 'easy' | 'medium' | 'hard';
    explanation: string;
    explanationImage?: string;
    options?: string[];
    correctAnswers: any;
    categoryId: any;
}

interface QuestionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (question: Question) => void;
    initialData?: Question | null;
}

export default function QuestionFormModal({ isOpen, onClose, onSubmit, initialData }: QuestionFormModalProps) {
    const [form] = Form.useForm();
    const { topicId } = useParams<{ topicId: string; subcategory: string }>();

    const [questionType, setQuestionType] = useState<Question['type']>('multiple-choice');
    const [questionText, setQuestionText] = useState('');
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
    const [explanation, setExplanation] = useState('');
    const [explanationImage, setExplanationImage] = useState<string>('');
    const [options, setOptions] = useState<string[]>(['', '', '', '']);
    const [correctAnswers, setCorrectAnswers] = useState<(string | number)[]>(['0']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [answerUnit, setAnswerUnit] = useState('');
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [imagePreview, setImagePreview] = useState<string>('');

    // Helper: convert File -> base64 dataURL
    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    useEffect(() => {
        if (initialData) {
            setQuestionType(initialData.type);
            setQuestionText(initialData.questionText);
            setDifficulty(initialData.difficulty);
            setExplanation(initialData.explanation);
            setExplanationImage(initialData.explanationImage || '');
            setImagePreview(initialData.explanationImage || '');
            setOptions(initialData.options || ['', '', '', '']);
            setCorrectAnswers(initialData.correctAnswers);

            if (initialData.type === 'fill-in-the-blank' && initialData.correctAnswers.length > 0) {
                setCorrectAnswer(initialData.correctAnswers[0].toString());
            }
        } else {
            resetForm();
        }
    }, [initialData, isOpen]);

    const resetForm = () => {
        setQuestionType('multiple-choice');
        setQuestionText('');
        setDifficulty('medium');
        setExplanation('');
        setExplanationImage('');
        setImagePreview('');
        setOptions(['', '', '', '']);
        setCorrectAnswers(['0']);
        setCorrectAnswer('');
        setAnswerUnit('');
        setMinValue('');
        setMaxValue('');
        form.resetFields();
    };

    // New robust handler for AntD Upload onChange
    const handleImageUpload = async (info: any) => {
        // info may be from beforeUpload=false: info.file or info.file.originFileObj
        const fileObj: File | undefined = info?.file?.originFileObj ?? info?.file ?? undefined;

        if (!fileObj) return;

        try {
            const dataUrl = await getBase64(fileObj);
            setExplanationImage(dataUrl);
            setImagePreview(dataUrl);
        } catch (err) {
            console.error('Failed to read file:', err);
        }
    };

    // onRemove handler
    const handleRemoveImage = () => {
        setExplanationImage('');
        setImagePreview('');
        // return true to allow Upload to remove from its internal list if used
        return true;
    };

    const handleAddOption = () => setOptions([...options, '']);

    const handleRemoveOption = (index: number) => setOptions(options.filter((_, i) => i !== index));

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleCorrectAnswerToggle = (index: number) => {
        if (questionType === 'multiple-response') {
            setCorrectAnswers((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
        } else {
            setCorrectAnswers([index]);
        }
    };

    const handleSubmit = () => {
        if (!questionText.trim()) {
            alert('Please enter a question');
            return;
        }

        let finalCorrectAnswers = correctAnswers;

        if (questionType === 'fill-in-the-blank') {
            const numAnswer = parseFloat(correctAnswer);
            if (isNaN(numAnswer)) {
                alert('Please enter a valid numeric answer');
                return;
            }
            finalCorrectAnswers = [numAnswer];
        }

        if (questionType !== 'fill-in-the-blank') {
            const filledOptions = options.filter((o) => o.trim());
            if (filledOptions.length < 2) {
                alert('Please enter at least 2 options');
                return;
            }
            if (finalCorrectAnswers.length === 0) {
                alert('Please select at least one correct answer');
                return;
            }
        }

        const question: Question = {
            id: initialData?.id || Date.now().toString(),
            type: questionType,
            questionText,
            difficulty,
            explanation,
            explanationImage: explanationImage || undefined,
            options: questionType !== 'fill-in-the-blank' ? options.filter((o) => o.trim()) : undefined,
            correctAnswers: finalCorrectAnswers,
            categoryId: topicId,
        };

        onSubmit(question);
        resetForm();
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={800}
            className="!p-0"
            styles={{ body: { padding: 0 } }}
            destroyOnClose={false}
            centered
        >
            <div className="max-w-3xl max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-xl font-semibold">{initialData ? 'Edit Question' : 'Add New Question'}</h2>
                <p className="text-sm text-gray-500 mb-4">Create a new question for your exam topic</p>

                {/* FORM */}
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    {/* Question Type */}
                    <Form.Item label="Question Type *">
                        <Select
                            value={questionType}
                            onChange={(v) => {
                                setQuestionType(v as Question['type']);
                                if (v === 'multiple-choice') setCorrectAnswers(['0']);
                                if (v === 'multiple-response') setCorrectAnswers([]);
                                if (v === 'fill-in-the-blank') setCorrectAnswers([]);
                            }}
                        >
                            <Select.Option value="multiple-choice">Multiple Choice</Select.Option>
                            <Select.Option value="multiple-response">Multiple Response</Select.Option>
                            <Select.Option value="fill-in-the-blank">Fill-in-the-Blank (Numeric)</Select.Option>
                        </Select>
                    </Form.Item>

                    {/* Question Text */}
                    <Form.Item label="Question Text *">
                        <Input.TextArea
                            rows={3}
                            className="resize-none"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            required
                        />
                    </Form.Item>

                    {/* Difficulty */}
                    <Form.Item label="Difficulty Level *">
                        <Select value={difficulty} onChange={(v) => setDifficulty(v as any)}>
                            <Select.Option value="easy">Easy</Select.Option>
                            <Select.Option value="medium">Medium</Select.Option>
                            <Select.Option value="hard">Hard</Select.Option>
                        </Select>
                    </Form.Item>

                    {/* Options */}
                    {questionType !== 'fill-in-the-blank' && (
                        <div className="space-y-3">
                            <label className="font-medium">
                                Answer Options *
                                {questionType === 'multiple-response' && (
                                    <span className="text-xs text-gray-500 ml-2">(Check all correct answers)</span>
                                )}
                            </label>

                            {options.map((option, index) => (
                                <div key={index} className="flex gap-2 items-center w-full">
                                    {questionType === 'multiple-response' ? (
                                        <Checkbox
                                            checked={correctAnswers.includes(index)}
                                            onChange={() => handleCorrectAnswerToggle(index)}
                                        />
                                    ) : (
                                        <Radio
                                            checked={correctAnswers.includes(index)}
                                            onChange={() => handleCorrectAnswerToggle(index)}
                                        />
                                    )}

                                    <span className="text-sm font-medium min-w-12">
                                        Option {String.fromCharCode(65 + index)}
                                    </span>

                                    <Input
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        className="flex-1"
                                        placeholder="Enter option text"
                                    />

                                    {options.length > 2 && (
                                        <AntButton
                                            icon={<DeleteOutlined />}
                                            danger
                                            size="small"
                                            onClick={() => handleRemoveOption(index)}
                                        />
                                    )}
                                </div>
                            ))}

                            <AntButton type="dashed" icon={<PlusOutlined />} onClick={handleAddOption}>
                                Add Another Option
                            </AntButton>
                        </div>
                    )}

                    {/* Fill-in-blank */}
                    {questionType === 'fill-in-the-blank' && (
                        <div className="space-y-4 bg-gray-100 p-4 rounded-lg mt-3">
                            <Form.Item label="Correct Answer * (Numeric)">
                                <Input value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
                            </Form.Item>

                            <Form.Item label="Answer Unit (Optional)">
                                <Input value={answerUnit} onChange={(e) => setAnswerUnit(e.target.value)} />
                            </Form.Item>

                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item label="Min Value (Optional)">
                                    <Input value={minValue} onChange={(e) => setMinValue(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Max Value (Optional)">
                                    <Input value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
                                </Form.Item>
                            </div>
                        </div>
                    )}

                    {/* Explanation */}
                    <Form.Item label="Explanation / Hint (Optional)">
                        <Input.TextArea
                            rows={4}
                            className="resize-none"
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                        />
                    </Form.Item>

                    {/* Explanation Image */}
                    <div className="space-y-2">
                        <label>Explanation Image (Optional)</label>

                        <Upload
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={() => false} // prevent automatic upload
                            onChange={handleImageUpload}
                            onRemove={handleRemoveImage}
                        >
                            <AntButton icon={<UploadOutlined />}>Upload</AntButton>
                        </Upload>

                        {imagePreview && (
                            <div className="relative mt-2">
                                <img src={imagePreview} className="max-w-full h-48 object-cover rounded-lg" />
                                <AntButton
                                    danger
                                    size="small"
                                    className="absolute top-2 right-2"
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                        setExplanationImage('');
                                        setImagePreview('');
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <AntButton onClick={onClose}>Cancel</AntButton>
                        <AntButton type="primary" htmlType="submit" className="!shadow-none">
                            {initialData ? 'Update Question' : 'Save Question'}
                        </AntButton>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}
