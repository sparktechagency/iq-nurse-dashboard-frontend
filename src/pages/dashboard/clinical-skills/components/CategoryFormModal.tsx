'use client';

import { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const SKILL_EMOJIS = ['🩺', '💊', '🏥', '❤️', '🧬', '🦴', '👁️', '🦷', '🫀', '🧠'];

interface CategoryFormModalProps {
    isOpen: boolean;
    category?: { id: string; name: string; logo: string } | null;
    onClose: () => void;
    onSubmit: (name: string, logo: string) => void;
}

export function CategoryFormModal({ isOpen, category, onClose, onSubmit }: CategoryFormModalProps) {
    const [form] = Form.useForm();
    const [selectedLogo, setSelectedLogo] = useState(SKILL_EMOJIS[0]);

    useEffect(() => {
        if (category) {
            form.setFieldsValue({
                name: category.name,
                logo: category.logo,
            });
            setSelectedLogo(category.logo);
        } else {
            form.resetFields();
            form.setFieldsValue({ logo: SKILL_EMOJIS[0] });
            setSelectedLogo(SKILL_EMOJIS[0]);
        }
    }, [category, isOpen]);

    const handleFinish = (values: any) => {
        onSubmit(values.name, selectedLogo);
        console.log(values.name, selectedLogo);
    };

    return (
        <Modal open={isOpen} onCancel={onClose} footer={null} centered width={425}>
            <div className="space-y-4 py-4">
                <h2 className="text-xl font-semibold px-1">{category ? 'Edit Category' : 'Add New Category'}</h2>

                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    {/* Category Name */}
                    <Form.Item
                        name="name"
                        label="Category Name"
                        rules={[{ required: true, message: 'Please enter a category name' }]}
                    >
                        <Input placeholder="e.g., Neurological Skills" />
                    </Form.Item>

                    {/* Emoji Selector */}
                    <Form.Item name="logo" label="Category Icon">
                        <div className="grid grid-cols-5 gap-2 mt-2">
                            {SKILL_EMOJIS?.map((emoji) => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => {
                                        setSelectedLogo(emoji);
                                        form.setFieldsValue({ logo: emoji });
                                    }}
                                    className={`p-3 text-2xl border-2 rounded-lg transition-all ${
                                        selectedLogo === emoji
                                            ? 'border-orange-600 bg-orange-50 '
                                            : 'border-border hover:border-orange-300'
                                    }`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </Form.Item>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-6">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" htmlType="submit" className="!shadow-none">
                            {category ? 'Update Category' : 'Create Category'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}
