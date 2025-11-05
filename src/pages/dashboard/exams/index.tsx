'use client';

import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { mockExamTopics } from '../../../demo-data/mockExamTopics';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from 'antd';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { RiSearch2Line } from 'react-icons/ri';
import ExamTopicGrid from './components/ExamTopicGrid';
import ExamTopicFormModal from './components/ExamTopicFormModal';

type ExamTopic = (typeof mockExamTopics)[0];

export default function ExamPage() {
    const router = useNavigate();
    const [topics, setTopics] = useState<ExamTopic[]>(mockExamTopics);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTopic, setEditingTopic] = useState<ExamTopic | null>(null);

    const filteredTopics = topics.filter((topic) => topic.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleAddTopic = (newTopic: ExamTopic) => {
        setTopics([...topics, { ...newTopic, id: Date.now().toString() }]);
        setIsFormOpen(false);
    };

    const handleEditTopic = (updatedTopic: ExamTopic) => {
        setTopics(topics.map((t) => (t.id === updatedTopic.id ? updatedTopic : t)));
        setEditingTopic(null);
        setIsFormOpen(false);
    };

    const handleDeleteTopic = (id: string) => {
        setTopics(topics.filter((t) => t.id !== id));
    };

    const handleEditClick = (topic: ExamTopic) => {
        setEditingTopic(topic);
        setIsFormOpen(true);
    };

    return (
        <section>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Exam Management</h1>
                    <p className="text-muted-foreground">Create and manage exam topics and questions</p>
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
                    <PrimaryButton
                        icon={<Plus className="w-4 h-4" />}
                        children="Add Topic"
                        onClick={() => {
                            setEditingTopic(null);
                            setIsFormOpen(true);
                        }}
                    />
                </div>
            </div>

            {/* Topics Grid */}
            {filteredTopics?.length > 0 ? (
                <ExamTopicGrid
                    topics={filteredTopics}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteTopic}
                    onView={(topic) => router(`/exam/${topic.id}`)}
                />
            ) : (
                <Card className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No topics found</p>
                    <Button
                        onClick={() => {
                            setEditingTopic(null);
                            setIsFormOpen(true);
                        }}
                        type="text"
                    >
                        Create your first topic
                    </Button>
                </Card>
            )}

            {/* Form Modal */}
            <ExamTopicFormModal
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingTopic(null);
                }}
                onSubmit={editingTopic ? handleEditTopic : handleAddTopic}
                initialData={editingTopic}
            />
        </section>
    );
}
