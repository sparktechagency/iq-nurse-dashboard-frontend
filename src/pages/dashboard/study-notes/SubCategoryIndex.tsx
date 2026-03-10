import { useState, useMemo } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { mainTopics } from '../../../demo-data/study-note';
import TopicList from './TopicList';
import TopicDetailModal from './topic-details-modal/TopicDetailModal';
import TopicForm from './TopicForm';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import StudyNotesHeader from './StudyNotesHeader';

export default function SubcategoryTopicsPage() {
    const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
    const router = useNavigate();
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
    const subcategoryId = subcategory as string;
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [showTopicDetail, setShowTopicDetail] = useState(false);

    const categoryData = mainTopics?.find((s: any) => s.title === category);
    const subcategoryData = categoryData?.categories
        .flatMap((cat: any) => cat.subCategories)
        .find((sub: any) => sub.id === subcategoryId);

    console.log('adasd', subcategoryData);

    const currentTopic = useMemo(
        () => subcategoryData?.subCategories?.find((t: any) => t.id === selectedTopic) || null,
        [subcategoryData, selectedTopic],
    );

    const handleAddTopic = (topic: any) => {
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
                                    {subcategoryData?.topics.length} topic
                                    {subcategoryData?.topics.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground">{subcategoryData?.description}</p>
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
                {isAddingTopic && (
                    <div className="mb-4 p-4 border border-border rounded-lg bg-muted/50">
                        <TopicForm
                            onSubmit={(topic) => {
                                handleAddTopic(topic);
                                setIsAddingTopic(false);
                            }}
                            onCancel={() => setIsAddingTopic(false)}
                        />
                    </div>
                )}
            </div>

            <TopicList
                subcategory={subcategoryData}
                selectedTopic={selectedTopic}
                onSelectTopic={(topicId) => {
                    setSelectedTopic(topicId);
                    setShowTopicDetail(true);
                }}
                onUpdateTopic={handleUpdateTopic}
                setEditingTopicId={setEditingTopicId}
                editingTopicId={editingTopicId}
            />

            {currentTopic && showTopicDetail && (
                <TopicDetailModal
                    topic={currentTopic}
                    onUpdate={handleUpdateTopic}
                    onClose={() => setShowTopicDetail(false)}
                />
            )}
        </div>
    );
}
