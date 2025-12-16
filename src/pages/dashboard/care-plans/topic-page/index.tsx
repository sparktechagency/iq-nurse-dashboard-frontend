import { useState } from 'react';

import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { Table, Button, Input, Badge, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate, useParams } from 'react-router-dom';
import { carePlansCategories } from '../../../../utils/carePlansCategories';
import DeleteModal from '../../../../components/shared/DeleteModal';
import TopicDialog from './TopicDialog';
import { RiSearch2Line } from 'react-icons/ri';
import PrimaryButton from '../../../../components/shared/PrimaryButton';

export default function CarePlansTopic() {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    console.log(categoryId);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTopic, setEditingTopic] = useState<any>(null);
    const [deletingTopic, setDeletingTopic] = useState<any>(null);

    const category = carePlansCategories.find((cat) => cat.id === categoryId);

    if (!category) {
        return (
            <div className="space-y-6">
                <Button type="text" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Categories
                </Button>
                <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold">Category not found</h2>
                </div>
            </div>
        );
    }

    const filteredTopics = category.subcategories.filter((topic) =>
        topic.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleEdit = (topic: any) => {
        setEditingTopic(topic);
        setIsDialogOpen(true);
    };

    const handleDelete = (topic: any) => {
        setDeletingTopic(topic);
    };

    const handleAdd = () => {
        setEditingTopic(null);
        setIsDialogOpen(true);
    };

    const columns: ColumnsType<any> = [
        {
            title: 'Topic Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="font-medium">{text}</span>,
        },
        {
            title: 'Status',
            key: 'status',
            render: () => <Badge color="default">Published</Badge>,
        },
        {
            title: 'Last Updated',
            key: 'updatedAt',
            render: () =>
                new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                }),
            className: 'text-muted-foreground',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <Space>
                    <Button type="text" icon={<Pencil size={16} />} onClick={() => handleEdit(record)} />
                    <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => handleDelete(record)} />
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button type="text" icon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} />
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{category.name}</h1>
                        </div>
                        <p className="text-muted-foreground mt-2">
                            Manage care plan topics in this category ({filteredTopics.length} topics)
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search Skill Category"
                        style={{ width: 280, height: 40 }}
                        prefix={<RiSearch2Line size={22} color="#999a9e" />}
                        value={searchQuery}
                        allowClear
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <PrimaryButton onClick={handleAdd} icon={<Plus className="w-4 h-4" />} children="Add Category" />
                </div>
            </div>

            {/* Table Card */}

            <Table columns={columns} dataSource={filteredTopics} rowKey="id" pagination={false} />

            {/* Dialogs */}
            <TopicDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                topic={editingTopic}
                categoryId={categoryId}
            />

            <DeleteModal
                isOpen={!!deletingTopic}
                onCancel={() => setDeletingTopic(null)}
                title="Delete Care Plan Topic"
                description={`Are you sure you want to delete "${deletingTopic?.name}"? `}
                handleDelete={() => {
                    console.log('Deleting topic:', deletingTopic);
                    setDeletingTopic(null);
                }}
            />
        </div>
    );
}
