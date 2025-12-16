import { useState } from 'react';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DeleteModal from '../../../../components/shared/DeleteModal';

export default function CategoriesTable({
    handleEdit,
    categories,
}: {
    handleEdit: (category: any) => void;
    categories: any;
}) {
    const navigate = useNavigate();

    const [deletingCategory, setDeletingCategory] = useState<any>(null);

    const handleDelete = (category: any) => {
        setDeletingCategory(category);
    };

    const handleView = (categoryId: string) => {
        navigate(`/care-plans/${categoryId}`);
    };

    const columns: ColumnsType<any> = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="font-medium">{text}</span>,
        },
        {
            title: 'Topics Count',
            key: 'topics',
            render: (_, record) => record.subcategories.length,
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <Space>
                    <Button type="text" icon={<Eye size={16} />} onClick={() => handleView(record.id)} />
                    <Button type="text" icon={<Pencil size={16} />} onClick={() => handleEdit(record)} />
                    <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => handleDelete(record)} />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={categories} rowKey="id" pagination={false} />

            <DeleteModal
                isOpen={!!deletingCategory}
                handleDelete={() => setDeletingCategory(null)}
                title="Delete Category"
                description={`Are you sure you want to delete "${deletingCategory?.name}"? `}
                onCancel={() => setDeletingCategory(null)}
            />
        </>
    );
}
