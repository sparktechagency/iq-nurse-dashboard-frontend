import { useEffect } from 'react';
import { Form, Input, Modal, Select, Button, Space, Divider, Typography, Radio, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Question } from '../../../../demo-data/practice-questions';

const { Text: AntText } = Typography;
const { Option } = Select;

interface QuestionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    initialValues?: Question | null;
    categories: string[];
}

const QuestionForm: React.FC<QuestionFormProps> = ({ isOpen, onClose, onSubmit, initialValues, categories }) => {
    const [form] = Form.useForm();
    const type = Form.useWatch('type', form);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
            form.setFieldsValue({ type: 'multiple-choice' });
        }
    }, [initialValues, isOpen, form]);

    const handleFormSubmit = (values: any) => {
        onSubmit({
            ...values,
            id: initialValues?.id || Date.now().toString(),
        });
        onClose();
    };

    return (
        <Modal
            title={initialValues ? 'Edit Question' : 'Add New Question'}
            open={isOpen}
            onCancel={onClose}
            onOk={() => form.submit()}
            width={800}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        <Select placeholder="Select or type a category">
                            {categories.map((cat) => (
                                <Option key={cat} value={cat}>
                                    {cat}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="type" label="Question Type" rules={[{ required: true }]}>
                        <Select>
                            <Option value="multiple-choice">Multiple Choice</Option>
                            <Option value="multiple-response">Multiple Response</Option>
                            <Option value="matrix">Matrix</Option>
                            <Option value="case-study">Case Study</Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item name="question" label="Question Text" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} placeholder="Enter the question..." />
                </Form.Item>

                {/* Multiple Choice / Multiple Response */}
                {(type === 'multiple-choice' || type === 'multiple-response') && (
                    <>
                        <Divider orientation="left">Options</Divider>
                        <Form.List name="options">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field) => (
                                        <Space
                                            key={field.key}
                                            style={{ display: 'flex', marginBottom: 8 }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...field}
                                                rules={[{ required: true, message: 'Missing option' }]}
                                                noStyle
                                            >
                                                <Input placeholder="Option text" style={{ width: 400 }} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Option
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item
                            name="correctAnswers"
                            label="Correct Answer(s)"
                            rules={[{ required: true }]}
                            extra={
                                type === 'multiple-response'
                                    ? 'Select all that apply. Separate with commas if typing manually.'
                                    : 'Select one option.'
                            }
                        >
                            {type === 'multiple-choice' ? (
                                <Select placeholder="Select correct answer">
                                    {form.getFieldValue('options')?.map((opt: string) => (
                                        <Option key={opt} value={opt}>
                                            {opt}
                                        </Option>
                                    ))}
                                </Select>
                            ) : (
                                <Select mode="multiple" placeholder="Select correct answers">
                                    {form.getFieldValue('options')?.map((opt: string) => (
                                        <Option key={opt} value={opt}>
                                            {opt}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    </>
                )}

                {/* Matrix Type */}
                {type === 'matrix' && (
                    <>
                        <Divider orientation="left">Matrix Data</Divider>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <AntText strong>Rows (Items to classify)</AntText>
                                <Form.List name={['matrixData', 'rows']}>
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map((field) => (
                                                <Space
                                                    key={field.key}
                                                    style={{ display: 'flex', marginBottom: 8 }}
                                                    align="baseline"
                                                >
                                                    <Form.Item {...field} noStyle>
                                                        <Input placeholder="Row name" style={{ width: 250 }} />
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                </Space>
                                            ))}
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add Row
                                            </Button>
                                        </>
                                    )}
                                </Form.List>
                            </div>
                            <div>
                                <AntText strong>Columns (Classifications)</AntText>
                                <Form.List name={['matrixData', 'columns']}>
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map((field) => (
                                                <Space
                                                    key={field.key}
                                                    style={{ display: 'flex', marginBottom: 8 }}
                                                    align="baseline"
                                                >
                                                    <Form.Item {...field} noStyle>
                                                        <Input placeholder="Column name" style={{ width: 250 }} />
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                </Space>
                                            ))}
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add Column
                                            </Button>
                                        </>
                                    )}
                                </Form.List>
                            </div>
                        </div>
                        <Form.Item
                            name={['matrixData', 'correctCells']}
                            label="Correct Pairings (Format: Row-Column)"
                            className="mt-4"
                            rules={[{ required: true }]}
                        >
                            <Select mode="tags" placeholder="Enter combinations (e.g., CBC-Lavender/Purple tube)" />
                        </Form.Item>
                    </>
                )}

                {/* Case Study Type */}
                {type === 'case-study' && (
                    <>
                        <Form.Item name="context" label="Case Study Context (Scenario)" rules={[{ required: true }]}>
                            <Input.TextArea rows={4} placeholder="Describe the patient scenario..." />
                        </Form.Item>
                        <Divider orientation="left">Case Study Parts</Divider>
                        <Form.List name="caseStudyParts">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Card
                                            size="small"
                                            title={`Part ${index + 1}`}
                                            key={field.key}
                                            extra={<MinusCircleOutlined onClick={() => remove(field.name)} />}
                                            className="mb-4"
                                        >
                                            <Form.Item name={[field.name, 'part']} hidden initialValue={index + 1}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, 'question']}
                                                label="Question"
                                                rules={[{ required: true }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, 'type']}
                                                label="Type"
                                                initialValue="multiple-choice"
                                            >
                                                <Radio.Group>
                                                    <Radio value="multiple-choice">Multiple Choice</Radio>
                                                    <Radio value="multiple-response">Multiple Response</Radio>
                                                </Radio.Group>
                                            </Form.Item>

                                            <AntText strong>Options</AntText>
                                            <Form.List name={[field.name, 'options']}>
                                                {(optFields, { add: addOpt, remove: removeOpt }) => (
                                                    <div className="mt-2">
                                                        {optFields.map((optField) => (
                                                            <Space
                                                                key={optField.key}
                                                                style={{ display: 'flex', marginBottom: 4 }}
                                                            >
                                                                <Form.Item {...optField} noStyle>
                                                                    <Input
                                                                        placeholder="Option"
                                                                        style={{ width: 300 }}
                                                                    />
                                                                </Form.Item>
                                                                <MinusCircleOutlined
                                                                    onClick={() => removeOpt(optField.name)}
                                                                />
                                                            </Space>
                                                        ))}
                                                        <Button
                                                            type="link"
                                                            onClick={() => addOpt()}
                                                            icon={<PlusOutlined />}
                                                        >
                                                            Add Option
                                                        </Button>
                                                    </div>
                                                )}
                                            </Form.List>

                                            <Form.Item
                                                name={[field.name, 'correctAnswers']}
                                                label="Correct Answer(s)"
                                                className="mt-2"
                                            >
                                                <Select mode="tags" />
                                            </Form.Item>
                                        </Card>
                                    ))}
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Case Study Part
                                    </Button>
                                </>
                            )}
                        </Form.List>
                    </>
                )}

                <Divider />
                <Form.Item name="rationale" label="Rationale" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} placeholder="Explain the correct answer..." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default QuestionForm;
