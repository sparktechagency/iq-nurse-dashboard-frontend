'use client';

import { Button, Form, Input } from 'antd';
import { Edit2 } from 'lucide-react';

interface TopicHeaderProps {
    title: string;
    isEditing: boolean;
    setIsEditing: (v: boolean) => void;
    setEditTitle: (v: string) => void;
    handleSave: () => void;
}

export const TopicHeader = ({ title, isEditing, setIsEditing, setEditTitle, handleSave }: TopicHeaderProps) => {
    return (
        <>
            {isEditing ? (
                <Form layout="vertical" className="mb-4">
                    <Form.Item label="Title">
                        <Input
                            value={title}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="text-xl font-bold"
                        />
                    </Form.Item>
                    <div className="flex gap-2">
                        <Button type="primary" onClick={handleSave} className="flex-1 !shadow-none">
                            Save
                        </Button>
                        <Button onClick={() => setIsEditing(false)} className="flex-1 !shadow-none">
                            Cancel
                        </Button>
                    </div>
                </Form>
            ) : (
                <div className="flex items-center justify-start gap-2 mb-4">
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <Button type="text" icon={<Edit2 className="w-4 h-4" />} onClick={() => setIsEditing(true)} />
                </div>
            )}
        </>
    );
};
