'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Button } from 'antd';
import TopicForm from './TopicForm';

interface Topic {
    id: string;
    title: string;
    overview: string;
    media: any[];
    flashcards: any[];
    questions: any[];
}

interface Subcategory {
    id: string;
    name: string;
    description: string;
    topics: Topic[];
}

interface TopicListProps {
    subcategory: Subcategory;
    selectedTopic: string | null;
    onSelectTopic: (id: string | null) => void;
    onAddTopic: (topic: Topic) => void;
    onUpdateTopic: (id: string, updates: any) => void;
    onDeleteTopic: (id: string) => void;
}

export default function TopicList({
    subcategory,
    selectedTopic,
    onSelectTopic,
    onAddTopic,
    onUpdateTopic,
    onDeleteTopic,
}: TopicListProps) {
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [editingTopicId, setEditingTopicId] = useState<string | null>(null);

    const findTopic = (id: string) => subcategory.topics.find((t) => t.id === id);

    return (
        <div className="border-b border-border p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold">{subcategory.name}</h2>
                    <p className="text-sm text-muted-foreground">{subcategory.description}</p>
                </div>
                <Button
                    size="small"
                    onClick={() => {
                        setIsAddingTopic(!isAddingTopic);
                        setEditingTopicId(null);
                    }}
                    // variant={isAddingTopic ? 'outline' : 'default'}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Topic
                </Button>
            </div>

            {isAddingTopic && (
                <div className="mb-4 p-4 border border-border rounded-lg bg-muted/50">
                    <TopicForm
                        onSubmit={(topic) => {
                            onAddTopic(topic);
                            setIsAddingTopic(false);
                        }}
                        onCancel={() => setIsAddingTopic(false)}
                    />
                </div>
            )}

            <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                {subcategory.topics.map((topic) => (
                    <div key={topic.id}>
                        {editingTopicId === topic.id ? (
                            <div className="p-3 border border-border rounded-lg bg-muted/50">
                                <TopicForm
                                    initialTitle={topic.title}
                                    initialOverview={topic.overview}
                                    isEditing={true}
                                    onSubmit={(updates) => {
                                        onUpdateTopic(topic.id, { title: updates.title, overview: updates.overview });
                                        setEditingTopicId(null);
                                    }}
                                    onCancel={() => setEditingTopicId(null)}
                                />
                            </div>
                        ) : (
                            <button
                                onClick={() => onSelectTopic(topic.id)}
                                className={`w-full text-left p-3 border rounded-lg transition-all hover:border-primary
                                    ${
                                        selectedTopic === topic.id
                                            ? 'bg-primary/10 border-primary'
                                            : 'border-border bg-card'
                                    }
                                `}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm line-clamp-1">{topic.title}</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                            {topic.overview}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2 text-xs">
                                            <span className="text-muted-foreground">
                                                {topic.flashcards?.length || 0} cards
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingTopicId(topic.id);
                                            }}
                                            className="p-1 hover:bg-primary/20 rounded text-muted-foreground hover:text-primary"
                                        >
                                            <Edit2 className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteTopic(topic.id);
                                            }}
                                            className="p-1 hover:bg-destructive/20 rounded text-muted-foreground hover:text-destructive"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
