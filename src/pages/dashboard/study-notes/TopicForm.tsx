'use client';

import { Button } from 'antd';
import type React from 'react';
import { useState } from 'react';
import JoditNote from '../../../components/shared/JoditNote';

interface TopicFormProps {
    onSubmit: (topic: any) => void;
    onCancel: () => void;
    initialTitle?: string;
    initialOverview?: string;
    isEditing?: boolean;
}

export default function TopicForm({
    onSubmit,
    onCancel,
    initialTitle = '',
    initialOverview = '',
    isEditing = false,
}: TopicFormProps) {
    const [title, setTitle] = useState(initialTitle);
    const [overview, setOverview] = useState(initialOverview);
    const [errors, setErrors] = useState<{ title?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { title?: string } = {};
        if (!title.trim()) {
            newErrors.title = 'Topic title is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit({
            id: isEditing ? undefined : `topic-${Date.now()}`,
            title,
            overview,
            media: [],
            flashcards: [],
            questions: [],
        });
        setTitle('');
        setOverview('');
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <input
                    type="text"
                    placeholder="Topic title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (errors.title) setErrors({});
                    }}
                    className={`w-full px-3 py-2 text-sm border rounded bg-background text-foreground placeholder:text-muted-foreground ${
                        errors.title ? 'border-destructive' : 'border-border'
                    }`}
                />
                {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
            </div>
            <div className="min-h-[250px]">
                <label className="block text-sm font-medium text-foreground mb-1">Topic overview</label>
                <div className="min-h-[250px] border border-border rounded-lg">
                    <JoditNote
                        content={overview}
                        handleContentChange={(newContent: string) => setOverview(newContent)}
                        height="450px"
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <Button size="large" className="flex-1 bg-primary hover:!bg-primary/90 text-white hover:!text-white">
                    {isEditing ? 'Update Topic' : 'Create Topic'}
                </Button>
                <Button size="large" onClick={onCancel} className="flex-1 bg-transparent">
                    Cancel
                </Button>
            </div>
        </form>
    );
}
