'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import DeleteModal from '../../../components/shared/DeleteModal';
import { toast } from 'sonner';

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
    onUpdateTopic: (id: string, updates: any) => void;
    onDeleteTopic: (id: string) => void;
    setEditingTopicId: (id: string | null) => void;
    editingTopicId: string | null;
}

export default function TopicList({ subcategory, selectedTopic, onSelectTopic, onDeleteTopic }: TopicListProps) {
    const [isDeletingTopic, setIsDeletingTopic] = useState(false);
    const [topicToDeleteId, setTopicToDeleteId] = useState<string | null>(null);
    return (
        <div className=" p-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 ">
                {subcategory?.topics.map((topic) => (
                    <div key={topic.id} className="flex flex-col h-full">
                        <button
                            onClick={() => onSelectTopic(topic.id)}
                            className={`w-full text-left p-3 border rounded-lg transition-all hover:border-primary
      ${selectedTopic === topic.id ? 'bg-primary/10 border-primary' : 'border-border bg-card'}
    flex flex-col h-full`}
                        >
                            <div className="flex flex-col flex-1">
                                {/* Title and Overview */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm line-clamp-1">{topic.title}</h4>
                                    <p
                                        className="text-xs text-muted-foreground line-clamp-2 mt-1"
                                        dangerouslySetInnerHTML={{ __html: topic.overview }}
                                    ></p>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-2 text-xs">
                                    <span className="text-muted-foreground">{topic.flashcards?.length || 0} cards</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setTopicToDeleteId(topic.id);
                                            setIsDeletingTopic(true);
                                        }}
                                        className="p-1 hover:bg-primary/20 rounded text-muted-foreground hover:text-destructive"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
            <DeleteModal
                isOpen={isDeletingTopic}
                onCancel={() => setIsDeletingTopic(false)}
                handleDelete={() => {
                    onDeleteTopic(topicToDeleteId || '');
                    setIsDeletingTopic(false);
                    toast.success('Topic deleted successfully.');
                }}
            />
        </div>
    );
}
