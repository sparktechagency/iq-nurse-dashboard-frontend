import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space, Select, Divider, Typography, Card } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text: AntText } = Typography;

interface ECGQuestionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    initialValues?: any | null;
}

const ECGQuestionForm: React.FC<ECGQuestionFormProps> = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    initialValues
}) => {
    const [form] = Form.useForm();
    const type = Form.useWatch('type', form);

    useEffect(() => {
        if (isOpen) {
            if (initialValues) {
                // Pre-process for form
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
                form.setFieldsValue({
                    type: 'multiple-choice',
                    rationale: { keyPoints: [''] },
                    options: ['', '', '', '']
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
            title={initialValues ? 'Edit ECG Question' : 'Add ECG Question'}
            open={isOpen}
            onCancel={onClose}
            onOk={() => form.submit()}
            width={800}
            destroyOnClose
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFormSubmit}
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="type" label="Question Type" rules={[{ required: true }]}>
                        <Select onChange={() => form.setFieldValue('correctAnswer', undefined)}>
                            <Option value="multiple-choice">Multiple Choice</Option>
                            <Option value="select-all">Select All (Multi-Response)</Option>
                            <Option value="dropdown">Dropdown / Documentation</Option>
                            <Option value="matrix">Matrix / Matching</Option>
                            <Option value="ordering">Ordering / Priority</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="stripType" label="Strip Type (Optional)">
                        <Input placeholder="e.g., NSR, SVT, V-tach" />
                    </Form.Item>
                </div>

                <Form.Item name="scenario" label="Scenario / Case Study">
                    <Input.TextArea rows={3} placeholder="Describe the patient clinical scenario..." />
                </Form.Item>

                <Form.Item name="question" label="Question" rules={[{ required: true }]}>
                    <Input.TextArea rows={2} placeholder="Enter the question text..." />
                </Form.Item>

                <Divider />

                {/* Multiple Choice & Select All */}
                {(type === 'multiple-choice' || type === 'select-all') && (
                    <>
                        <Form.List name="options">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Space key={field.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                                            <AntText type="secondary" style={{ width: 80 }}>Option {index + 1}:</AntText>
                                            <Form.Item {...field} rules={[{ required: true }]} noStyle>
                                                <Input style={{ width: 500 }} />
                                            </Form.Item>
                                            {fields.length > 2 && <MinusCircleOutlined onClick={() => remove(field.name)} />}
                                        </Space>
                                    ))}
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Option</Button>
                                </>
                            )}
                        </Form.List>
                        <Form.Item name="correctAnswer" label="Correct Answer(s)" className="mt-4" rules={[{ required: true }]}>
                            {type === 'multiple-choice' ? (
                                <Select placeholder="Select the correct option">
                                    {(form.getFieldValue('options') || []).map((opt: string) => (
                                        <Option key={opt} value={opt}>{opt}</Option>
                                    ))}
                                </Select>
                            ) : (
                                <Select mode="multiple" placeholder="Select all correct options">
                                    {(form.getFieldValue('options') || []).map((opt: string) => (
                                        <Option key={opt} value={opt}>{opt}</Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    </>
                )}

                {/* Dropdown Type */}
                {type === 'dropdown' && (
                    <Card size="small" title="Dropdown Configuration" className="bg-blue-50">
                         <Form.List name="dropdownOptions">
                            {() => {
                                // This is tricky. User's JSON has keys like 'rhythm', 'intervention'.
                                // For simplicity in the form, we'll use a fixed structure or dynamic key entry.
                                // Let's use a dynamic entry for keys.
                                return (
                                    <div className="space-y-4">
                                        <AntText type="secondary">Define keys (e.g., "rhythm") and their options:</AntText>
                                        {/* Since this is complex nested Form.List, we'll use a more straightforward approach or just manual string input for demo */}
                                        <p>Please provide dropdown data in standard format.</p>
                                        <Form.Item name="dropdownOptions" label="Dropdown Options (JSON format or specific fields)">
                                           <Input.TextArea rows={4} placeholder='{"rhythm": ["NSR", "Bradycardia"], "priority": ["High", "Low"]}' />
                                        </Form.Item>
                                        <Form.Item name="dropdownAnswers" label="Correct Answers (JSON format)">
                                           <Input.TextArea rows={3} placeholder='{"rhythm": "NSR", "priority": "High"}' />
                                        </Form.Item>
                                    </div>
                                );
                            }}
                         </Form.List>
                    </Card>
                )}

                {/* Matrix Type */}
                {type === 'matrix' && (
                    <Card size="small" title="Matrix Configuration" className="bg-green-50">
                        <Form.Item name={['matrixOptions', 'rows']} label="Rows (Characteristics)">
                            <Select mode="tags" placeholder="Enter rows and press enter" />
                        </Form.Item>
                        <Form.Item name={['matrixOptions', 'columns']} label="Columns (Rhythms)">
                            <Select mode="tags" placeholder="Enter columns and press enter" />
                        </Form.Item>
                        <Form.Item name={['matrixOptions', 'correctAnswers']} label="Correct Answers (JSON format map)">
                            <Input.TextArea rows={4} placeholder='{"Row 1": "Col A", "Row 2": "Col B"}' />
                        </Form.Item>
                    </Card>
                )}

                {/* Ordering Type */}
                {type === 'ordering' && (
                    <Card size="small" title="Ordering Configuration" className="bg-orange-50">
                        <Form.Item name="orderingItems" label="Items to Order">
                            <Select mode="tags" placeholder="Enter items in any order" />
                        </Form.Item>
                        <Form.Item name="correctOrder" label="Correct Order (Indices, e.g., 1,0,2,3 for Item1, then Item0, etc.)">
                            <Input placeholder="1,0,2,3" />
                        </Form.Item>
                    </Card>
                )}

                <Divider orientation="left">Rationale & Key Points</Divider>
                <div className="space-y-4">
                    <Form.Item name={['rationale', 'correct']} label="Correct Feedback" rules={[{ required: true }]}>
                        <Input.TextArea rows={2} placeholder="Feedback for correct answer..." />
                    </Form.Item>
                    <Form.Item name={['rationale', 'incorrect']} label="Incorrect Feedback" rules={[{ required: true }]}>
                        <Input.TextArea rows={2} placeholder="Feedback for incorrect answer..." />
                    </Form.Item>
                    <Form.List name={['rationale', 'keyPoints']}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Space key={field.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                                        <AntText type="secondary" style={{ width: 80 }}>Point {index + 1}:</AntText>
                                        <Form.Item {...field} rules={[{ required: true }]} noStyle>
                                            <Input style={{ width: 600 }} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Key Point</Button>
                            </>
                        )}
                    </Form.List>
                </div>
            </Form>
        </Modal>
    );
};

export default ECGQuestionForm;
