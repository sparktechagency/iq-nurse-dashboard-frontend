'use client';

import { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const NOTE_EMOJIS = ['🧠', '✨', '📒', '📂', '📄', '📑', '🧪', '⚗️', '💊', '🏨'];

interface SubcategoryFormModalProps {
    isOpen: boolean;
    subcategory?: { id: string; name: string; icon: string } | null;
    onClose: () => void;
    onSubmit: (name: string, icon: string) => void;
}

export default function SubcategoryFormModal({ isOpen, subcategory, onClose, onSubmit }: SubcategoryFormModalProps) {
    const [form] = Form.useForm();
    const [selectedIcon, setSelectedIcon] = useState(NOTE_EMOJIS[0]);

    // Prefill form
    useEffect(() => {
        if (subcategory) {
            form.setFieldsValue({
                name: subcategory.name,
                icon: subcategory.icon,
            });
            setSelectedIcon(subcategory.icon);
        } else {
            form.resetFields();
            form.setFieldsValue({ icon: NOTE_EMOJIS[0] });
            setSelectedIcon(NOTE_EMOJIS[0]);
        }
    }, [subcategory, isOpen]);

    const handleFinish = (values: any) => {
        onSubmit(values.name, selectedIcon);
    };

    return (
        <Modal open={isOpen} footer={null} onCancel={onClose} centered width={425}>
            <div className="space-y-4 py-4">
                <h2 className="text-xl font-semibold px-1">
                    {subcategory ? 'Edit Subcategory' : 'Add New Subcategory'}
                </h2>

                <Form layout="vertical" form={form} onFinish={handleFinish}>
                    {/* Name */}
                    <Form.Item
                        label="Subcategory Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter a name' }]}
                    >
                        <Input placeholder="e.g., Cardiology Notes" />
                    </Form.Item>

                    {/* Icon Picker */}
                    <Form.Item label="Subcategory Icon" name="icon">
                        <div className="grid grid-cols-5 gap-2 mt-2">
                            {NOTE_EMOJIS.map((icon) => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => {
                                        setSelectedIcon(icon);
                                        form.setFieldsValue({ icon });
                                    }}
                                    className={`p-3 text-2xl border-2 rounded-lg transition-all ${
                                        selectedIcon === icon
                                            ? 'border-orange-600 bg-orange-50'
                                            : 'border-border hover:border-orange-300'
                                    }`}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </Form.Item>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-6">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            {subcategory ? 'Update Subcategory' : 'Create Subcategory'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}
