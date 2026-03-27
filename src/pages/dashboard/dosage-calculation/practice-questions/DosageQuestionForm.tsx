import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space, Select, Divider, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text: AntText } = Typography;

interface DosageQuestionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    initialValues?: any | null;
    categories: string[];
}

const DosageQuestionForm: React.FC<DosageQuestionFormProps> = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    initialValues, 
    categories
}) => {
    const [form] = Form.useForm();
    const options = Form.useWatch('options', form) || [];

    useEffect(() => {
        if (isOpen) {
            if (initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
                form.setFieldsValue({
                    options: ['', '', '', ''],
                    correctAnswer: 0
                });
            }
        }
    }, [isOpen, initialValues, form]);

    const handleFormSubmit = (values: any) => {
        onSubmit({
            ...values,
            id: initialValues?.id || Date.now()
        });
        onClose();
    };

    return (
        <Modal
            title={initialValues ? 'Edit Dosage Question' : 'Add Dosage Question'}
            open={isOpen}
            onCancel={onClose}
            onOk={() => form.submit()}
            width={700}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFormSubmit}
                initialValues={{
                    options: ['', '', '', ''],
                    correctAnswer: 0
                }}
            >
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Select placeholder="Select or type a category">
                        {categories.map((cat) => (
                            <Option key={cat} value={cat}>
                                {cat}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="question" label="Question Text" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} placeholder="Enter the dosage calculation question..." />
                </Form.Item>

                <Divider orientation="left">Options & Correct Answer</Divider>
                
                <Form.List name="options">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <AntText type="secondary" style={{ width: 70 }}>Option {index + 1}:</AntText>
                                    <Form.Item
                                        {...field}
                                        rules={[{ required: true, message: 'Missing option text' }]}
                                        noStyle
                                    >
                                        <Input placeholder="Option text" style={{ width: 450 }} />
                                    </Form.Item>
                                    {fields.length > 2 && (
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    )}
                                </Space>
                            ))}
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                                className="mb-4"
                            >
                                Add Option
                            </Button>
                        </>
                    )}
                </Form.List>

                <Form.Item 
                    name="correctAnswer" 
                    label="Correct Answer Index" 
                    rules={[{ required: true }]}
                    extra="Select which option above is the correct one (0-indexed or choose from list)"
                >
                    <Select placeholder="Select the correct option">
                        {options.map((opt: string, index: number) => (
                            <Option key={index} value={index}>
                                Option {index + 1}: {opt.substring(0, 50)}{opt.length > 50 ? '...' : ''}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Divider />
                
                <Form.Item name="explanation" label="Explanation (Step-by-step Solution)" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} placeholder="Describe the calculation steps..." />
                </Form.Item>

                <Form.Item name="rationale" label="Rationale" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} placeholder="Explain why this calculation is important..." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DosageQuestionForm;
