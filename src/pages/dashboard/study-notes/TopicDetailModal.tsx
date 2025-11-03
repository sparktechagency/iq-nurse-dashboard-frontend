'use client';

import { useState } from 'react';
import { X, Edit2, Plus } from 'lucide-react';
import { Modal, Button, Form, Input, Tabs, Card } from 'antd';
import QuestionsImportModal from './QuestionsImportModal';
import MediaManager from './MediaManager';
import FlashcardManager from './FlashcardManager';

const { TextArea } = Input;
const { TabPane } = Tabs;

interface Topic {
    id: string;
    title: string;
    overview: string;
    media: any[];
    flashcards: any[];
    questions: any[];
}

interface TopicDetailModalProps {
    topic: Topic;
    onUpdate: (topicId: string, updates: any) => void;
    onClose: () => void;
}

export default function TopicDetailModal({ topic, onUpdate, onClose }: TopicDetailModalProps) {
    const [isImportingQuestions, setIsImportingQuestions] = useState(false);
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [editTitle, setEditTitle] = useState(topic.title);
    const [editOverview, setEditOverview] = useState(topic.overview);

    const handleSaveDetails = () => {
        if (editTitle.trim()) {
            onUpdate(topic.id, { title: editTitle, overview: editOverview });
            setIsEditingDetails(false);
        }
    };

    const handleAddMedia = (media: any) => {
        onUpdate(topic.id, { media: [...(topic.media || []), media] });
    };

    const handleRemoveMedia = (index: number) => {
        onUpdate(topic.id, { media: topic.media.filter((_, i) => i !== index) });
    };

    const handleAddFlashcard = (card: any) => {
        onUpdate(topic.id, { flashcards: [...(topic.flashcards || []), card] });
    };

    const handleRemoveFlashcard = (index: number) => {
        onUpdate(topic.id, { flashcards: topic.flashcards.filter((_, i) => i !== index) });
    };

    const handleImportQuestions = (questions: any[]) => {
        onUpdate(topic.id, { questions: [...(topic.questions || []), ...questions] });
        setIsImportingQuestions(false);
    };

    const handleRemoveQuestion = (index: number) => {
        onUpdate(topic.id, { questions: topic.questions.filter((_, i) => i !== index) });
    };

    return (
        <Modal
            open={true}
            onCancel={onClose}
            footer={null}
            width={900}
            bodyStyle={{ maxHeight: '90vh', overflowY: 'auto' }}
        >
            {/* Header */}
            {isEditingDetails ? (
                <Form layout="vertical" className="mb-4">
                    <Form.Item label="Title">
                        <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="text-xl font-bold"
                        />
                    </Form.Item>
                    <Form.Item label="Overview">
                        <TextArea value={editOverview} onChange={(e) => setEditOverview(e.target.value)} rows={3} />
                    </Form.Item>
                    <div className="flex gap-2">
                        <Button type="primary" onClick={handleSaveDetails} className="flex-1">
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                setIsEditingDetails(false);
                                setEditTitle(topic.title);
                                setEditOverview(topic.overview);
                            }}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            ) : (
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold">{topic.title}</h2>
                        <p className="text-sm text-gray-500 mt-1">{topic.overview}</p>
                    </div>
                    <Button
                        type="text"
                        icon={<Edit2 className="w-4 h-4" />}
                        onClick={() => setIsEditingDetails(true)}
                    />
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <Card className="text-center bg-blue-50 border-blue-100">
                    <div className="text-2xl font-bold text-blue-600">{topic.media?.length || 0}</div>
                    <div className="text-xs text-gray-500">Media Files</div>
                </Card>
                <Card className="text-center bg-green-50 border-green-100">
                    <div className="text-2xl font-bold text-green-600">{topic.flashcards?.length || 0}</div>
                    <div className="text-xs text-gray-500">Flashcards</div>
                </Card>
                <Card className="text-center bg-yellow-50 border-yellow-100">
                    <div className="text-2xl font-bold text-yellow-600">{topic.questions?.length || 0}</div>
                    <div className="text-xs text-gray-500">Questions</div>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultActiveKey="media" type="card">
                <TabPane key="media" tab={`Media (${topic.media?.length || 0})`}>
                    <MediaManager media={topic.media} onAdd={handleAddMedia} onRemove={handleRemoveMedia} />
                </TabPane>

                <TabPane key="flashcards" tab={`Flashcards (${topic.flashcards?.length || 0})`}>
                    <FlashcardManager
                        flashcards={topic.flashcards}
                        onAdd={handleAddFlashcard}
                        onRemove={handleRemoveFlashcard}
                    />
                </TabPane>

                <TabPane key="questions" tab={`Questions (${topic.questions?.length || 0})`}>
                    <div className="space-y-4 mt-4">
                        <Button type="primary" onClick={() => setIsImportingQuestions(true)} icon={<Plus />}>
                            Import Questions
                        </Button>

                        {topic.questions && topic.questions.length > 0 ? (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {topic.questions.map((question, index) => (
                                    <Card key={index} className="border">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="font-semibold flex-1">{question.question}</div>
                                            <Button
                                                type="text"
                                                icon={<X className="w-4 h-4 text-red-500" />}
                                                onClick={() => handleRemoveQuestion(index)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            {question.options?.map((option: string, i: number) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <span className="text-xs font-semibold text-gray-400">
                                                        {String.fromCharCode(65 + i)}.
                                                    </span>
                                                    <span className="text-sm">{option}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {question.correctAnswer && (
                                            <div className="pt-2 mt-2 border-t border-gray-200">
                                                <p className="text-xs font-semibold text-blue-500">
                                                    Correct Answer: {question.correctAnswer}
                                                </p>
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card bordered={false} className="border-dashed text-center p-6">
                                <p className="text-gray-500 text-sm">
                                    No questions yet. Import questions to get started.
                                </p>
                            </Card>
                        )}

                        {isImportingQuestions && (
                            <QuestionsImportModal
                                onImport={handleImportQuestions}
                                onClose={() => setIsImportingQuestions(false)}
                            />
                        )}
                    </div>
                </TabPane>
            </Tabs>
        </Modal>
    );
}
