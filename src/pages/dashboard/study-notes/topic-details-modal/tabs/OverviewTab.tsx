'use client';

import { useState } from 'react';
import { Button, Card } from 'antd';
import JoditNote from '../../../../../components/shared/JoditNote';

interface OverviewTabProps {
    overview: string;
    onUpdate: (newOverview: string) => void;
}

export const OverviewTab = ({ overview, onUpdate }: OverviewTabProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(overview);

    const handleSave = () => {
        onUpdate(content);
        setIsEditing(false);
    };

    return (
        <div className="mt-4">
            {isEditing ? (
                <div className="space-y-4">
                    <JoditNote content={content} handleContentChange={setContent} height="300px" />
                    <div className="flex gap-2">
                        <Button type="primary" onClick={handleSave}>
                            Save Overview
                        </Button>
                        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                </div>
            ) : overview ? (
                <Card className="p-4">
                    <div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: overview }} />
                    <Button type="link" onClick={() => setIsEditing(true)} className="mt-3">
                        Edit Overview
                    </Button>
                </Card>
            ) : (
                <Card bordered={false} className="border-dashed text-center p-6">
                    <p className="text-gray-500 text-sm mb-3">No overview yet.</p>
                    <Button type="primary" onClick={() => setIsEditing(true)}>
                        Add Overview
                    </Button>
                </Card>
            )}
        </div>
    );
};
