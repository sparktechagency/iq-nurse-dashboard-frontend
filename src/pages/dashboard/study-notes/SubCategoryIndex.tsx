import { useState, useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { mockData } from '../../../demo-data/study-note';
import TopicList from './TopicList';
import TopicDetailModal from './TopicDetailModal';

export default function SubcategoryTopicsPage() {
    const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
    const router = useNavigate();
    console.log(subcategory);

    const subcategoryId = subcategory as string;

    const [subcategoryData, setSubcategoryData] = useState(() => {
        const categoryData = mockData[category as string] || [];
        return categoryData.find((s: any) => s.id === subcategoryId) || null;
    });

    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [showTopicDetail, setShowTopicDetail] = useState(false);

    const currentTopic = useMemo(
        () => subcategoryData?.topics.find((t: any) => t.id === selectedTopic) || null,
        [subcategoryData, selectedTopic],
    );

    const handleAddTopic = (topic: any) => {
        if (!subcategoryData) return;
        setSubcategoryData({
            ...subcategoryData,
            topics: [...subcategoryData.topics, topic],
        });
    };

    const handleUpdateTopic = (topicId: string, updates: any) => {
        if (!subcategoryData) return;
        setSubcategoryData({
            ...subcategoryData,
            topics: subcategoryData.topics.map((t: any) => (t.id === topicId ? { ...t, ...updates } : t)),
        });
    };

    const handleDeleteTopic = (topicId: string) => {
        if (!subcategoryData) return;
        setSubcategoryData({
            ...subcategoryData,
            topics: subcategoryData.topics.filter((t: any) => t.id !== topicId),
        });
        setSelectedTopic(null);
        setShowTopicDetail(false);
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* <StudyNotesHeader category={category} /> */}

            <div className="border-b border-border px-6 py-4 bg-card/50">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <Button size="small" onClick={() => router(-1)} title="Back to subcategories">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <div className='flex items-center gap-2'>
                                <h2 className="text-lg font-semibold text-foreground">{subcategoryData.name}</h2>
                                <p className="text-sm text-muted-foreground">
                                    {subcategoryData.topics.length} topic
                                    {subcategoryData.topics.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground">{subcategoryData.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <TopicList
                    subcategory={subcategoryData}
                    selectedTopic={selectedTopic}
                    onSelectTopic={(topicId) => {
                        setSelectedTopic(topicId);
                        setShowTopicDetail(true);
                    }}
                    onAddTopic={handleAddTopic}
                    onUpdateTopic={handleUpdateTopic}
                    onDeleteTopic={handleDeleteTopic}
                />
            </div>

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
