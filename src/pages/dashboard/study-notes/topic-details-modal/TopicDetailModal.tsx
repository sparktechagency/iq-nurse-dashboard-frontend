'use client';

import { useState } from 'react';
import { Modal, Tabs } from 'antd';
import { TopicHeader } from './TopicHeader';
import { OverviewTab } from './tabs/OverviewTab';
import MediaTab from './tabs/MediaTab';
import FlashcardsTab from './tabs/FlashcardsTab';
import QuestionsTab from './tabs/question-tab/QuestionsTab';

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
    const [editTitle, setEditTitle] = useState(topic.title);
    const [editOverview, setEditOverview] = useState(topic.overview);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isImportingQuestions, setIsImportingQuestions] = useState(false);
    const [isImportingFlashcards, setIsImportingFlashcards] = useState(false);
    const handleSaveTitle = () => {
        if (editTitle.trim()) {
            onUpdate(topic.id, { title: editTitle });
            setIsEditingTitle(false);
        }
    };

    const handleUpdateOverview = (newOverview: string) => {
        onUpdate(topic.id, { overview: newOverview });
        setEditOverview(newOverview);
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
    };

    const handleRemoveQuestion = (index: number) => {
        onUpdate(topic.id, { questions: topic.questions.filter((_, i) => i !== index) });
    };
    const handleImportFlashcards = (flashcards: any[]) => {
        onUpdate(topic.id, {
            flashcards: [...(topic.flashcards || []), ...flashcards],
        });
        setIsImportingFlashcards(false);
    };
    const handleAddQuestionManually = (question: any) => {
        onUpdate(topic.id, {
            questions: [...(topic.questions || []), question],
        });
    };

    const tabItems = [
        {
            key: 'overview',
            label: 'Overview',
            children: <OverviewTab overview={editOverview} onUpdate={handleUpdateOverview} />,
        },
        {
            key: 'media',
            label: `Media (${topic.media?.length || 0})`,
            children: <MediaTab media={topic.media} onAdd={handleAddMedia} onRemove={handleRemoveMedia} />,
        },
        {
            key: 'flashcards',
            label: `Flashcards (${topic.flashcards?.length || 0})`,
            children: (
                <FlashcardsTab
                    flashcards={topic.flashcards}
                    onAdd={handleAddFlashcard}
                    onRemove={handleRemoveFlashcard}
                    setIsImportingFlashcards={setIsImportingFlashcards}
                    handleImportFlashcards={handleImportFlashcards}
                    isImportingFlashcards={isImportingFlashcards}
                />
            ),
        },
        {
            key: 'questions',
            label: `Questions (${topic.questions?.length || 0})`,
            children: (
                <QuestionsTab
                    questions={topic.questions}
                    onImport={handleImportQuestions}
                    onRemove={handleRemoveQuestion}
                    isImporting={isImportingQuestions}
                    setIsImporting={setIsImportingQuestions}
                    handleAddQuestionManually={handleAddQuestionManually}
                />
            ),
        },
    ];

    return (
        <Modal
            open={true}
            onCancel={onClose}
            footer={null}
            width={900}
            centered
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
        >
            <TopicHeader
                title={editTitle}
                isEditing={isEditingTitle}
                setIsEditing={setIsEditingTitle}
                setEditTitle={setEditTitle}
                handleSave={handleSaveTitle}
            />
            <Tabs defaultActiveKey="overview" type="card" items={tabItems} />
        </Modal>
    );
}
