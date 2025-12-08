import { useMemo, useRef, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Space, Typography, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'jodit/es2021/jodit.min.css';
import JoditEditor from 'jodit-react';

const { Title, Text } = Typography;
const { Dragger } = Upload;

// Dummy request to prevent auto-upload (Next.js safe)
const dummyRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
        onSuccess('ok');
    }, 0);
};

const AddBodySystem = () => {
    const [form] = Form.useForm();
    const editorRef = useRef(null);
    const [description, setDescription] = useState('');

    const joditConfig = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Write description...',
            toolbarAdaptive: false,
            toolbarSticky: true,
            height: 300,
            uploader: { insertImageAsBase64URI: true },
        }),
        [],
    );

    const handleFinish = async (values: any) => {
        console.log('Form Values:', values);
        console.log('Description:', description);

        // Reset form
        form.resetFields();
        setDescription('');
    };

    return (
        <div className="mb-5">
            <Card style={{ maxWidth: 1100, margin: '0 auto' }}>
                <Title level={4} style={{ marginBottom: 24 }}>
                    Create Content
                </Title>

                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={
                                    <>
                                        <Text strong>Logo Image</Text>
                                        <Text type="danger"> *</Text>
                                    </>
                                }
                                name="logoImage"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList ?? [])}
                                rules={[{ required: true, message: 'Logo image is required' }]}
                            >
                                <Dragger
                                    multiple={false}
                                    accept=".jpg,.jpeg,.png,.svg,.mp4"
                                    maxCount={1}
                                    customRequest={dummyRequest}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Upload Image</p>
                                    <Text type="secondary">jpg, png, svg, mp4</Text>
                                </Dragger>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label={
                                    <>
                                        <Text strong>Category Image</Text>
                                        <Text type="danger"> *</Text>
                                    </>
                                }
                                name="categoryImage"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList ?? [])}
                                rules={[{ required: true, message: 'Category image is required' }]}
                            >
                                <Dragger
                                    multiple={false}
                                    accept=".jpg,.jpeg,.png,.svg"
                                    maxCount={1}
                                    customRequest={dummyRequest}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Upload Image</p>
                                    <Text type="secondary">jpg, png, svg</Text>
                                </Dragger>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Enter title' }]}>
                        <Input placeholder="Enter title" size="large" />
                    </Form.Item>

                    <Form.Item label="Description" required>
                        {/* @ts-ignore */}
                        <JoditEditor
                            ref={editorRef}
                            value={description}
                            config={joditConfig}
                            onChange={(v) => setDescription(v)}
                        />
                        <Text type="secondary">Use the toolbar to format your content</Text>
                    </Form.Item>

                    <Form.Item
                        label="Upload Media"
                        name="gallery"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList ?? [])}
                    >
                        <Upload
                            listType="picture-card"
                            multiple
                            accept=".jpg,.jpeg,.png,.svg,.mp4"
                            customRequest={dummyRequest}
                        >
                            <div style={{ padding: 8 }}>
                                <InboxOutlined />
                                <div>Upload Media</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Button htmlType="reset">Reset</Button>
                        <Button type="primary" htmlType="submit" size="large">
                            Save
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default AddBodySystem;
