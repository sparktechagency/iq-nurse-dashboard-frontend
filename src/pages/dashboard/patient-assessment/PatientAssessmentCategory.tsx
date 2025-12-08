import { useState } from "react";
import { Button, Form, Table, Space, Popconfirm, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import CategoryModal from "./CategoryModal";
import HeaderTitle from "../../../components/shared/HeaderTitle";
import { useNavigate } from "react-router-dom";

export interface Category {
    key: string;
    id: string;
    name: string;
}

const PatientAssessmentCategory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Dummy data
    const [data, setData] = useState<Category[]>([
        { key: "1", id: "1", name: "Respiratory" },
        { key: "2", id: "2", name: "Cardiovascular" },
        { key: "3", id: "3", name: "Neurological" },
    ]);

    const handleAdd = () => {
        setEditingCategory(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record: Category) => {
        setEditingCategory(record);
        form.setFieldsValue({ name: record.name });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setData((prev) => prev.filter((item) => item.id !== id));
        message.success("Category deleted successfully");
    };

    const columns = [
        {
            title: "Serial No",
            dataIndex: "id",
            key: "serial",
            render: (_: any, __: any, index: number) => index + 1,
            width: 100,
        },
        {
            title: "Category Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (_: any, record: Category) => (
                <Space>
                    <Button
                        type="text"
                        icon={<FiEye size={20} className="text-gray-500" />}
                        onClick={() => navigate(`/patient-assessment/${record.id}`)}
                    />
                    <Button
                        type="text"
                        icon={<FiEdit size={20} className="text-blue-500" />}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Delete the category"
                        description="Are you sure to delete this category?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            danger
                            icon={<FiTrash size={20} />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4">
            <div >
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title="Patient Assessment Category" />
                    <Button type="primary" icon={<PlusOutlined color="white" />} onClick={handleAdd} className="flex items-center gap-2 text-white bg-[#003877] border-0 h-[45px] px-6 rounded font-medium">
                        Add Category
                    </Button>
                </div>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
            </div>

            <CategoryModal
                open={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setEditingCategory={setEditingCategory}
                setData={setData}
                data={data}
                editingCategory={editingCategory}
            />
        </div>
    );
};

export default PatientAssessmentCategory;
