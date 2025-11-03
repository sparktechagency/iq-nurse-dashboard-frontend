'use client';

import { Form, Input, Button } from 'antd';
import { useEffect } from 'react';

interface SubcategoryFormProps {
    initialName?: string;
    initialDescription?: string;
    onSubmit: (name: string, description: string) => void;
    onCancel: () => void;
}

export default function SubcategoryForm({
    initialName = '',
    initialDescription = '',
    onSubmit,
    onCancel,
}: SubcategoryFormProps) {
    const [form] = Form.useForm();

    // prefill initial values
    useEffect(() => {
        form.setFieldsValue({
            name: initialName,
            description: initialDescription,
        });
    }, [initialName, initialDescription, form]);

    const handleFinish = (values: { name: string; description: string }) => {
        onSubmit(values.name, values.description);
        form.resetFields();
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-3">
            <div className="grid grid-cols-6 items-start gap-6">
                <Form.Item className='col-span-4' name="name" rules={[{ required: true, message: 'Please enter subcategory name' }]}>
                    <Input placeholder="Subcategory name" className='h-[40px]'/>
                </Form.Item>

                {/* <Form.Item name="description">
                <Input placeholder="Description" />
            </Form.Item> */}

                <div className="flex gap-2 col-span-2">
                    <Button
                        htmlType="submit"
                        className="flex-1 !h-[40px] bg-primary text-white hover:bg-primary hover:text-white"
                    >
                        Save
                    </Button>
                    <Button onClick={onCancel} className="flex-1 !h-[40px] ">
                        Cancel
                    </Button>
                </div>
            </div>
        </Form>
    );
}
