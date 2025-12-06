import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Empty } from 'antd';
import { toast } from 'sonner';

import DeleteModal from '../../../components/shared/DeleteModal';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import StudyNotesHeader from './StudyNotesHeader';
import SubcategoryFormModal from './SubcategoryForm';

export default function SubcategoryGrid({
    category,
    subcategories,
    onAddSubcategory,
    onUpdateSubcategory,
    onDeleteSubcategory,
}: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubcategory, setEditingSubcategory] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState<any>(null);

    const openAddModal = () => {
        setEditingSubcategory(null);
        setIsModalOpen(true);
    };

    const openEditModal = (subcategory: any) => {
        setEditingSubcategory(subcategory);
        setIsModalOpen(true);
    };
    console.log(subcategories);

    return (
        <div className="h-full overflow-auto p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <StudyNotesHeader category={category} />
                    <p className="text-sm text-muted-foreground mt-1">Select a subcategory to view and manage topics</p>
                </div>

                <Button className="!h-[40px] !bg-primary !text-white" icon={<PlusOutlined />} onClick={openAddModal}>
                    Add Subcategory
                </Button>
            </div>

            {/* Grid */}
            {subcategories.length === 0 ? (
                <Empty
                    description={
                        <>
                            <p className="text-muted-foreground mb-2">No subcategories yet</p>
                            <PrimaryButton
                                icon={<PlusOutlined />}
                                onClick={openAddModal}
                                children={'Create First Subcategory'}
                            />
                        </>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subcategories.map((s: any) => (
                        <Link key={s.id} to={`/study-notes/${category}/${s.id}`} style={{ textDecoration: 'none' }}>
                            <Card hoverable>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <h4 className='text-lg font-medium' >
                                        <span className="text-2xl mr-1"> {s.icon}</span> {s.name}
                                    </h4>
                                    <div onClick={(e) => e.preventDefault()} style={{ display: 'flex', gap: 8 }}>
                                        <Button
                                            icon={<EditOutlined />}
                                            size="small"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openEditModal(s);
                                            }}
                                        />
                                        <Button
                                            icon={<DeleteOutlined />}
                                            size="small"
                                            danger
                                            onClick={() => {
                                                setDeletingId(s.id);
                                                setIsDeleting(true);
                                            }}
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground pt-2">
                                    {s.topics.length} topic{s.topics.length === 1 ? '' : 's'}
                                </p>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            {/* Modal for Add/Edit */}
            <SubcategoryFormModal
                isOpen={isModalOpen}
                subcategory={editingSubcategory}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(name: any, icon: any) => {
                    if (editingSubcategory) {
                        onUpdateSubcategory(editingSubcategory.id, name, icon);
                        toast.success('Subcategory updated!');
                    } else {
                        onAddSubcategory(name, icon);
                        toast.success('Subcategory added!');
                    }
                    setIsModalOpen(false);
                }}
            />

            {/* Delete Confirmation */}
            <DeleteModal
                isOpen={isDeleting}
                onCancel={() => setIsDeleting(false)}
                handleDelete={() => {
                    onDeleteSubcategory(deletingId);
                    setIsDeleting(false);
                    toast.success('Deleted successfully!');
                }}
            />
        </div>
    );
}
