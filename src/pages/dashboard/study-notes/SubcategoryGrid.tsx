import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Empty } from 'antd';
import SubcategoryForm from './SubcategoryForm';
import { toast } from 'sonner';
import DeleteModal from '../../../components/shared/DeleteModal';
import PrimaryButton from '../../../components/shared/PrimaryButton';

export default function SubcategoryGrid({
    category,
    subcategories,
    onAddSubcategory,
    onUpdateSubcategory,
    onDeleteSubcategory,
}: any) {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const editingSubcategory = editingId ? subcategories.find((s: any) => s.id === editingId) : null;
    return (
        <div className="h-full overflow-auto p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Subcategories</h2>
                    <p className="text-sm text-muted-foreground mt-1">Select a subcategory to view and manage topics</p>
                </div>
                <Button
                    className="!h-[40px] bg-primary text-white hover:!bg-primary/90 hover:!text-white"
                    icon={<PlusOutlined />}
                    onClick={() => setIsAddingNew(true)}
                >
                    Add Subcategory
                </Button>
            </div>

            {/* Add/Edit Form */}
            <div className="">
                {(isAddingNew || editingId) && (
                    <Card className="mb-8" title={editingId ? 'Edit Subcategory' : 'Add New Subcategory'} bordered>
                        <SubcategoryForm
                            initialName={editingSubcategory?.name}
                            initialDescription={editingSubcategory?.description}
                            onSubmit={(name, description) => {
                                if (editingId) {
                                    onUpdateSubcategory(editingId, name, description);
                                } else {
                                    onAddSubcategory(name, description);
                                }
                                setIsAddingNew(false);
                                setEditingId(null);
                            }}
                            onCancel={() => {
                                setIsAddingNew(false);
                                setEditingId(null);
                            }}
                        />
                    </Card>
                )}
            </div>

            {/* Subcategories Grid */}
            {subcategories.length === 0 ? (
                <div className="text-center py-16">
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <>
                                <p className="text-muted-foreground mb-2">No subcategories yet</p>

                                <PrimaryButton
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsAddingNew(true)}
                                    children={'Create First Subcategory'}
                                    width={'auto'}
                                />
                            </>
                        }
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subcategories?.map((subcategory: any) => (
                        <Link
                            key={subcategory.id}
                            to={`/study-notes/${category}/${subcategory.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card
                                hoverable
                                className="h-full transition-all"
                                title={subcategory.name}
                                extra={
                                    <div onClick={(e) => e.preventDefault()} style={{ display: 'flex', gap: 8 }}>
                                        <Button
                                            icon={<EditOutlined />}
                                            size="small"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setEditingId(subcategory.id);
                                            }}
                                            title="Edit subcategory"
                                        />
                                        <Button
                                            icon={<DeleteOutlined />}
                                            size="small"
                                            danger
                                            onClick={() => {
                                                setDeletingId(subcategory.id);
                                                setIsDeleting(true);
                                            }}
                                            title="Delete subcategory"
                                        />
                                    </div>
                                }
                            >
                                {/* <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {subcategory.description}
                                </p> */}
                                <p className="text-sm text-muted-foreground">
                                    {subcategory.topics.length} topic
                                    {subcategory.topics.length !== 1 ? 's' : ''}
                                </p>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
            <DeleteModal
                isOpen={isDeleting}
                onCancel={() => setIsDeleting(false)}
                handleDelete={() => {
                    onDeleteSubcategory(deletingId);
                    setIsDeleting(false);
                    toast.success('Subcategory deleted successfully!');
                }}
            />
        </div>
    );
}
