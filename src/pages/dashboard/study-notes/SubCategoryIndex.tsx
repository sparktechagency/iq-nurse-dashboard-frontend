import { useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { Button, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { mainTopics } from '../../../demo-data/study-note';
import TopicList from './TopicList';
import TopicForm from './TopicForm';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import StudyNotesHeader from './StudyNotesHeader';

export default function SubcategoryTopicsPage() {
    const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
    const router = useNavigate();
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    const categoryData = mainTopics?.find((s: any) => s.title === category);
    const subcategoryData = categoryData?.categories?.find((s: any) => s.id === subcategory);

    console.log('adasd', subcategoryData);

    const handleAddTopic = () => {
        if (!subcategoryData) return;
    };

    const handleUpdateTopic = () => {
        if (!subcategoryData) return;
    };

    return (
        <div className="flex flex-col ">
            <StudyNotesHeader category={category} />

            <div className="border-b border-border px-6 py-4 bg-card/50">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2">
                            <Button size="small" onClick={() => router(-1)}>
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <p className="text-sm text-muted-foreground">Back to categories</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold text-foreground">{subcategoryData?.title}</h2>
                                <p className="text-sm text-muted-foreground">
                                    {subcategoryData?.subCategories?.length} topic
                                    {subcategoryData?.subCategories?.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                            {/* <p className="text-sm text-muted-foreground">{subcategoryData?.description}</p>  */}
                        </div>
                    </div>

                    <PrimaryButton
                        icon={<Plus className="w-4 h-4" />}
                        onClick={() => {
                            setIsAddingTopic(true);
                            setEditingTopicId(null);
                        }}
                        children="New Topic"
                        width={'auto'}
                    />
                </div>
                <Modal
                    title={editingTopicId ? 'Edit Topic' : 'Add New Topic'}
                    open={isAddingTopic}
                    onCancel={() => {
                        setIsAddingTopic(false);
                        setEditingTopicId(null);
                    }}
                    footer={null}
                    width={800}
                    centered
                    destroyOnClose
                >
                    <div className="py-4">
                        <TopicForm
                            onSubmit={() => {
                                if (editingTopicId) {
                                    handleUpdateTopic();
                                } else {
                                    handleAddTopic();
                                }
                                setIsAddingTopic(false);
                                setEditingTopicId(null);
                            }}
                            onCancel={() => {
                                setIsAddingTopic(false);
                                setEditingTopicId(null);
                            }}
                            isEditing={!!editingTopicId}
                        />
                    </div>
                </Modal>
            </div>

            <TopicList
                subcategory={subcategoryData?.subCategories}
                selectedTopic={selectedTopic}
                onSelectTopic={(topicId) => {
                    setSelectedTopic(topicId);
                }}
                onUpdateTopic={handleUpdateTopic}
                setEditingTopicId={setEditingTopicId}
                editingTopicId={editingTopicId}
            />
        </div>
    );
}
