
import { Button, Table, Space, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Category } from "../../../demo-data/patient-assessment";
import type { ColumnsType } from 'antd/es/table';
import HeaderTitle from '../../../components/shared/HeaderTitle';

const AssessmentDetails = ({ categories, setIsAddModalVisible, setIsUpdateModalVisible, setIsDeleteModalVisible, handleCategoryClick }: { categories: Category[], selectedCategory: any, handleCategoryClick: any, setIsAddModalVisible: any, setIsUpdateModalVisible: any, setIsDeleteModalVisible: any }) => {

    const columns: ColumnsType<Category> = [
        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
            render: (text) => (
                <Tooltip title={text}>
                    <div className="truncate max-w-xs cursor-help">
                        {text}
                    </div>
                </Tooltip>
            ),
        },
        {
            title: 'Clinical Note',
            dataIndex: 'note',
            key: 'note',
            width: '35%',
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="default"
                        shape="circle"
                        icon={<EditOutlined className="text-blue-500" />}
                        onClick={() => {
                            handleCategoryClick(record);
                            setIsUpdateModalVisible(true);
                        }}
                    />
                    <Button
                        type="default"
                        danger
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            handleCategoryClick(record);
                            setIsDeleteModalVisible(true);
                        }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="bg-white">
            <div className="flex justify-between items-center mb-6">
                <HeaderTitle title='Patient Assessment' />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className="!bg-primary hover:!bg-primary h-10"
                    onClick={() => setIsAddModalVisible(true)}
                >
                    Add Assessment
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={categories}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default AssessmentDetails;
