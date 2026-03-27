import { useState } from 'react';
import { Button, Card, Empty } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import { mainTopics } from '../../../demo-data/study-note';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../../../components/shared/DeleteModal';
import { toast } from 'sonner';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import DiagnosticCategoryFormModal from './DiagnosticCategoryForm';

export default function DiagnosticMainTopic() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState<any>(null);
    const [editData, setEditData] = useState<any>(null);

    const openAddModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="">
            <div className="mb-8 flex items-center justify-between ">
                <div>
                    <HeaderTitle title={'Diagnostic Tests & Laboratory '} />
                    <p className="text-sm text-muted-foreground mt-1">Select a category to view and manage topics</p>
                </div>

                <div className="flex gap-2">
                    <Button
                        className="!h-[40px] !bg-orange-500 !text-white"
                        icon={<QuestionOutlined />}
                        onClick={() => navigate('/diagnostic-tests/practice-questions')}
                    >
                        Practice Questions
                    </Button>
                    <Button className="!h-[40px] !bg-primary !text-white" icon={<PlusOutlined />} onClick={openAddModal}>
                        Add Main Topic
                    </Button>
                </div>
            </div>
            {mainTopics.length === 0 ? (
                <Empty
                    description={
                        <>
                            <p className="text-muted-foreground mb-2">No main topics yet</p>
                            <PrimaryButton
                                icon={<PlusOutlined />}
                                onClick={openAddModal}
                                children={'Create First Main Topic'}
                            />
                        </>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ps-2">
                    {mainTopics?.map((s: any, i: number) => (
                        <Link key={i} to={`/diagnostic-tests/${s.title}`} style={{ textDecoration: 'none' }}>
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
                                    {s?.categories?.length} category{s?.categories?.length === 1 ? '' : 's'}
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

            <DiagnosticCategoryFormModal
                isOpen={isModalOpen}
                title={'Main Topic'}
                subcategory={editData}
                onClose={() => setIsModalOpen(false)}
                onSubmit={() => {
                    if (editData) {
                        // onUpdateSubcategory(editData.id, name, icon);
                        toast.success('Subcategory updated!');
                    } else {
                        // onAddSubcategory(name, icon);
                        toast.success('Subcategory added!');
                    }
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}
