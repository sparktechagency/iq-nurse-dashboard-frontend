import { useState } from 'react';
import StudyNotesHeader from './StudyNotesHeader';
import { Button, Card, Empty } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { mainTopics } from '../../../demo-data/study-note';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { Link, useParams } from 'react-router-dom';
import DeleteModal from '../../../components/shared/DeleteModal';
import SubcategoryFormModal from './SubcategoryForm';
import { toast } from 'sonner';

export default function StudyNoteCategory() {
    const { category } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState<any>(null);
    const [editData, setEditData] = useState<any>(null);

    const categoryData = mainTopics?.find((s: any) => s.title === category);

    const openAddModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <StudyNotesHeader category={'Categories'} />
                    <p className="text-sm text-muted-foreground mt-1">Select a category to view and manage topics</p>
                </div>

                <Button className="!h-[40px] !bg-primary !text-white" icon={<PlusOutlined />} onClick={openAddModal}>
                    Add Category
                </Button>
            </div>
            {mainTopics.length === 0 ? (
                <Empty
                    description={
                        <>
                            <p className="text-muted-foreground mb-2">No categories yet</p>
                            <PrimaryButton
                                icon={<PlusOutlined />}
                                onClick={openAddModal}
                                children={'Create First Category'}
                            />
                        </>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryData?.categories?.map((s: any, i: number) => (
                        <Link key={i} to={`/study-notes/${category}/${s.id}`} style={{ textDecoration: 'none' }}>
                            <Card hoverable>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <h4 className="text-lg font-medium flex items-center gap-2">
                                        <img src={s.url} alt={s.title} className="w-7 h-7 object-contain" />
                                        {s.title} {i + 1}
                                    </h4>
                                    <div onClick={(e) => e.preventDefault()} style={{ display: 'flex', gap: 8 }}>
                                        <Button
                                            icon={<EditOutlined />}
                                            size="small"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsModalOpen(true);
                                                setEditData(s);
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
                                    {s?.subCategories?.length || 0} sub-category
                                    {s?.subCategories?.length === 1 ? '' : 's'}
                                </p>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            <DeleteModal
                isOpen={isDeleting}
                onCancel={() => setIsDeleting(false)}
                deletingId={deletingId}
                setIsDeleting={setIsDeleting}
            />

            <SubcategoryFormModal
                isOpen={isModalOpen}
                title={'Category'}
                subcategory={editData}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(name: any, icon: any) => {
                    if (editData) {
                        // onUpdateSubcategory(editData.id, name, icon);
                        toast.success('Category updated!');
                    } else {
                        // onAddSubcategory(name, icon);
                        toast.success('Category added!');
                    }
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}
