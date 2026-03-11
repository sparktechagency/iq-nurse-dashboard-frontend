'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import DeleteModal from '../../../components/shared/DeleteModal';

interface TopicListProps {
    subcategory: any;
    selectedTopic: string | null;
    onSelectTopic: (id: string | null) => void;
    onUpdateTopic: (id: string, updates: any) => void;
    setEditingTopicId: (id: string | null) => void;
    editingTopicId: string | null;
}

export default function TopicList({ subcategory, selectedTopic, onSelectTopic }: TopicListProps) {
    const [isDeletingTopic, setIsDeletingTopic] = useState(false);
    const [topicToDeleteId, setTopicToDeleteId] = useState<string | null>(null);
    return (
        <div className=" p-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 ">
                {subcategory?.map((topic: { id: string; title: string; content: string }) => (
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
                                        dangerouslySetInnerHTML={{ __html: topic.content }}
                                    ></p>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-end mt-2 text-xs">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setTopicToDeleteId(topic.id);
                                            setIsDeletingTopic(true);
                                        }}
                                        className="p-1 bg-red-500/20 rounded text-muted-foreground hover:text-destructive text-red-500"
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
                deletingId={subcategory?.id}
                setIsDeleting={setIsDeletingTopic}
            />
        </div>
    );
}
