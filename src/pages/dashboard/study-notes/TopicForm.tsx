'use client';

import { Button } from 'antd';
import type React from 'react';
import { useState } from 'react';

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
            <textarea
                placeholder="Topic overview"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-border rounded bg-background text-foreground placeholder:text-muted-foreground resize-none"
            />
            <div className="flex gap-2">
                <Button size="small" className="flex-1">
                    {isEditing ? 'Update Topic' : 'Create Topic'}
                </Button>
                <Button size="small" onClick={onCancel} className="flex-1 bg-transparent">
                    Cancel
                </Button>
            </div>
        </form>
    );
}
