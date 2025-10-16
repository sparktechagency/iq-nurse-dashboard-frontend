import  { useState } from 'react';
import {
    Avatar,
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    Row,
    Col,
    Typography,
    Upload,
    message,
    Space
} from 'antd';
import { EditOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingCompany, setIsEditingCompany] = useState(false);
    const [form] = Form.useForm();
    const [companyForm] = Form.useForm();

    const initialValues = {
        name: "Abdullah Al Noman",
        title: "Web Developer",
        partnerId: "0012345670",
        gender: "male",
        presentAddress: "Dhaka",
        permanentAddress: "Dhaka",
        maritalStatus: "married",
        dateOfBirth: dayjs("1982-10-07"),
        passportCountry: "USA",
        nationality: "American",
        nationalId: "875*****3669",
    };

    const initialCompanyValues = {
        companyName: "A & Technology"
    };

    const handleEdit = () => {
        setIsEditing(true);
        form.setFieldsValue(initialValues);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            console.log('Personal Form values:', values);
            setIsEditing(false);
            message.success('Personal profile updated successfully!');
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        form.setFieldsValue(initialValues);
    };

    const handleEditCompany = () => {
        setIsEditingCompany(true);
        companyForm.setFieldsValue(initialCompanyValues);
    };

    const handleSaveCompany = async () => {
        try {
            const values = await companyForm.validateFields();
            console.log('Company Form values:', values);
            setIsEditingCompany(false);
            message.success('Company profile updated successfully!');
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    const handleCancelCompany = () => {
        setIsEditingCompany(false);
        companyForm.setFieldsValue(initialCompanyValues);
    };

    const uploadProps = {
        name: 'file',
        action: '/api/upload',
        beforeUpload: (file: any) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        },
        onChange: (info: any) => {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className='max-w-screen-[1600px] mx-auto'>
            {/* Header */}
            <div className="mb-6 border-b-[1px] border-primary pb-4" style={{ width: '124px' }}>
                <Title level={4} className="!mb-0 !text-gray-800  !font-bold">
                    User Profile
                </Title>
            </div>

            {/* Profile Header Card */}
            <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative">
                    <Avatar
                        shape="square"
                        size={96}
                        src="https://noman1.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAbdullah_Al_Noman.c5d6012f.jpg&w=640&q=75"
                        icon={<UserOutlined />}
                        className="shadow-md"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <Title level={3} className="!mb-1 !text-gray-800 !font-bold">
                        {initialValues.name}
                    </Title>
                    <Text className="text-gray-600 text-base block mb-1 !font-semibold">
                        {initialValues.title}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                        Partner ID: {initialValues.partnerId}
                    </Text>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 my-6">
                <Upload {...uploadProps} showUploadList={false}>
                    <Button
                        icon={<UploadOutlined />}
                        className="bg-primary hover:bg-primary-hover border-primary hover:border-primary text-white font-medium"
                    >
                        Upload Photo
                    </Button>
                </Upload>
            </div>

            <Row gutter={[24, 24]} >
                {/* Personal Information */}
                <Col xs={24} lg={24} >
                    <div className="rounded-xl h-fit mb-6">
                        <div className="flex  items-center justify-between mb-6 border-b border-primary pb-4">
                            <span className="text-lg font-semibold text-gray-800">
                                Personal <span className="text-primary">Information</span>
                            </span>
                            <div>
                                <Space>
                                    {isEditing ? (
                                        <>
                                            <Button onClick={handleCancel} className="border-gray-300">
                                                Cancel
                                            </Button>
                                            <Button
                                                type="primary"
                                                onClick={handleSave}
                                                className="bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600"
                                            >
                                                Save
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            icon={<EditOutlined />}
                                            onClick={handleEdit}
                                            className="border-gray-300 hover:border-orange-500 hover:text-orange-500"
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </Space>
                            </div>
                        </div>
                        <Form form={form} layout="vertical" initialValues={initialValues}>
                            <Row>
                                <Col xs={24}>
                                    <div className="flex flex-row items-start py-2">
                                        <div className="w-1/3 min-w-[140px]">
                                            <Text className="text-[#7B7B7B] font-medium">Name:</Text>
                                        </div>
                                        <div className="flex-1">
                                            {isEditing ? (
                                                <Form.Item
                                                    name="name"
                                                    className="mb-0"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input className="border-gray-300 hover:border-orange-500 focus:border-orange-500" />
                                                </Form.Item>
                                            ) : (
                                                <Text className="text-[#232323] font-semibold text-base">
                                                    {initialValues.name}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={24}>
                                    <div className="flex flex-row items-start py-2">
                                        <div className="w-1/3 min-w-[140px]">
                                            <Text className="text-[#7B7B7B] font-medium">Gender:</Text>
                                        </div>
                                        <div className="flex-1">
                                            {isEditing ? (
                                                <Form.Item
                                                    name="gender"
                                                    className="mb-0"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Select className="w-full">
                                                        <Option value="male">Male</Option>
                                                        <Option value="female">Female</Option>
                                                        <Option value="other">Other</Option>
                                                    </Select>
                                                </Form.Item>
                                            ) : (
                                                <Text className="text-[#232323] font-semibold text-lg capitalize">
                                                    {initialValues.gender}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={24}>
                                    <div className="flex flex-row items-start py-2">
                                        <div className="w-1/3 min-w-[140px]">
                                            <Text className="text-[#7B7B7B] font-medium">Present Address:</Text>
                                        </div>
                                        <div className="flex-1">
                                            {isEditing ? (
                                                <Form.Item
                                                    name="presentAddress"
                                                    className="mb-0"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input className="border-gray-300 hover:border-orange-500 focus:border-orange-500" />
                                                </Form.Item>
                                            ) : (
                                                <Text className="text-[#232323] font-semibold text-base">
                                                    {initialValues.presentAddress}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={24}>
                                    <div className="flex flex-row items-start py-2">
                                        <div className="w-1/3 min-w-[140px]">
                                            <Text className="text-[#7B7B7B] font-medium">Permanent Address:</Text>
                                        </div>
                                        <div className="flex-1">
                                            {isEditing ? (
                                                <Form.Item
                                                    name="permanentAddress"
                                                    className="mb-0"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input className="border-gray-300 hover:border-orange-500 focus:border-orange-500" />
                                                </Form.Item>
                                            ) : (
                                                <Text className="text-[#232323] font-semibold text-base">
                                                    {initialValues.permanentAddress}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={24}>
                                    <div className="flex flex-row items-start py-2">
                                        <div className="w-1/3 min-w-[140px]">
                                            <Text className="text-[#7B7B7B] font-medium">Marital Status:</Text>
                                        </div>
                                        <div className="flex-1">
                                            {isEditing ? (
                                                <Form.Item
                                                    name="maritalStatus"
                                                    className="mb-0"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Select className="w-full">
                                                        <Option value="single">Single</Option>
                                                        <Option value="married">Married</Option>
                                                        <Option value="divorced">Divorced</Option>
                                                        <Option value="widowed">Widowed</Option>
                                                    </Select>
                                                </Form.Item>
                                            ) : (
                                                <Text className="text-[#232323] font-semibold text-base capitalize">
                                                    {initialValues.maritalStatus}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={24}>
                                    <div className="flex flex-row items-start py-2">
                                        <div className="w-1/3 min-w-[140px]">
                                            <Text className="text-[#7B7B7B] font-medium">Date of Birth:</Text>
                                        </div>
                                        <div className="flex-1">
                                            {isEditing ? (
                                                <Form.Item
                                                    name="dateOfBirth"
                                                    className="mb-0"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <DatePicker
                                                        format="DD-MM-YYYY"
                                                        className="w-full border-gray-300 hover:border-orange-500 focus:border-orange-500"
                                                    />
                                                </Form.Item>
                                            ) : (
                                                <Text className="text-[#232323] font-semibold text-base">
                                                    {initialValues.dateOfBirth.format('DD-MM-YYYY')}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={24}>
                                    <div className="flex flex-row items-start py-2">
                                        <div className="w-1/3 min-w-[140px]">
                                            <Text className="text-[#7B7B7B] font-medium">Passport Country:</Text>
                                        </div>
                                        <div className="flex-1">
                                            {isEditing ? (
                                                <Form.Item
                                                    name="passportCountry"
                                                    className="mb-0"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input className="border-gray-300 hover:border-orange-500 focus:border-orange-500" />
                                                </Form.Item>
                                            ) : (
                                                <Text className="text-[#232323] font-semibold text-base">
                                                    {initialValues.passportCountry}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={24}>
                                    <div className="flex flex-row items-start py-2">
                                        <div className="w-1/3 min-w-[140px]">
                                            <Text className="text-[#7B7B7B] font-medium">Nationality:</Text>
                                        </div>
                                        <div className="flex-1">
                                            {isEditing ? (
                                                <Form.Item
                                                    name="nationality"
                                                    className="mb-0"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input className="border-gray-300 hover:border-orange-500 focus:border-orange-500" />
                                                </Form.Item>
                                            ) : (
                                                <Text className="text-[#232323] font-semibold text-base">
                                                    {initialValues.nationality}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>

                                <Col xs={24}>
                                    <div className="flex flex-row items-start py-2">
                                        <div className="w-1/3 min-w-[140px]">
                                            <Text className="text-[#7B7B7B] font-medium">National ID:</Text>
                                        </div>
                                        <div className="flex-1">
                                            {isEditing ? (
                                                <Form.Item
                                                    name="nationalId"
                                                    className="mb-0"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input className="border-gray-300 hover:border-orange-500 focus:border-orange-500" />
                                                </Form.Item>
                                            ) : (
                                                <Text className="text-[#232323] font-semibold text-base">
                                                    {initialValues.nationalId}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>

                {/* Company Information */}
                <Col xs={24} lg={24}>
                    <div className="rounded-xl h-fit mb-6">
                        <div className="flex  items-center justify-between mb-6 border-b border-primary pb-4">
                            <span className="text-lg font-semibold text-gray-800">
                                Company <span className="text-primary">Information</span>
                            </span>
                            <div>
                                <Space>
                                    {isEditingCompany ? (
                                        <>
                                            <Button onClick={handleCancelCompany} className="border-gray-300">
                                                Cancel
                                            </Button>
                                            <Button
                                                type="primary"
                                                onClick={handleSaveCompany}
                                                className="bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600"
                                            >
                                                Save
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            icon={<EditOutlined />}
                                            onClick={handleEditCompany}
                                            className="border-gray-300 hover:border-orange-500 hover:text-orange-500"
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </Space>
                            </div>
                        </div>
                        <Form form={companyForm} layout="vertical" initialValues={initialCompanyValues}>
                            <Row>
                                <Col xs={24}>
                                    <div className="flex flex-row items-start py-2">
                                        <div className="w-1/3 min-w-[140px]">
                                            <Text className="text-[#7B7B7B] font-medium">Company Name:</Text>
                                        </div>
                                        <div className="flex-1">
                                            {isEditingCompany ? (
                                                <Form.Item
                                                    name="companyName"
                                                    className="mb-0"
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input className="border-gray-300 hover:border-orange-500 focus:border-orange-500" />
                                                </Form.Item>
                                            ) : (
                                                <Text className="text-[#232323] font-semibold text-base">
                                                    {initialCompanyValues.companyName}
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
}