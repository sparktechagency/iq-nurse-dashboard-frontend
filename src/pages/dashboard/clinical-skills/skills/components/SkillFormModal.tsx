'use client';

import { useState, useEffect } from 'react';
import { Modal, Input, Button, Tabs } from 'antd';
import { ChecklistSection } from './ChecklistSection';
import { StepsSection } from './StepsSection';
import { VideoSection } from './VideoSection';

interface SkillFormModalProps {
    isOpen: boolean;
    skill?: any | null;
    onClose: () => void;
    onSubmit: (skillData: any) => void;
}

export function SkillFormModal({ isOpen, skill, onClose, onSubmit }: SkillFormModalProps) {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [checklists, setChecklists] = useState<string[]>([]);
    const [steps, setSteps] = useState<Array<{ title: string; description: string }>>([]);
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        if (skill) {
            setTitle(skill.title);
            setSubtitle(skill.subtitle);
            setChecklists(skill.checklists || []);
            setSteps(skill.steps || []);
            setVideoUrl(skill.videoUrl || '');
        } else {
            setTitle('');
            setSubtitle('');
            setChecklists([]);
            setSteps([]);
            setVideoUrl('');
        }
    }, [skill, isOpen]);

    const handleSubmit = () => {
        if (title.trim()) {
            onSubmit({
                title,
                subtitle,
                checklists,
                steps,
                videoUrl,
            });
        }
    };

    return (
        <Modal open={isOpen} onCancel={onClose} footer={null} centered width={700} className="p-0">
            <div className="max-h-[90vh] overflow-y-auto sm:max-w-[700px] px-1">
                <div className="space-y-4 py-4">
                    <h2 className="text-xl font-semibold">{skill ? 'Edit Skill' : 'Add New Skill'}</h2>

                    {/* Title */}
                    <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Blood Pressure Measurement"
                            className="mt-2"
                        />
                    </div>

                    {/* Subtitle */}
                    <div>
                        <label className="text-sm font-medium">Subtitle</label>
                        <Input
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            placeholder="e.g., Accurately measure systolic"
                            className="mt-2"
                        />
                    </div>

                    {/* Tabs */}
                    <Tabs
                        defaultActiveKey="checklist"
                        className="w-full"
                        items={[
                            {
                                key: 'checklist',
                                label: 'Checklist',
                                children: (
                                    <ChecklistSection checklists={checklists} onChecklistsChange={setChecklists} />
                                ),
                            },
                            {
                                key: 'steps',
                                label: 'Steps',
                                children: <StepsSection steps={steps} onStepsChange={setSteps} />,
                            },
                            {
                                key: 'video',
                                label: 'Video',
                                children: <VideoSection videoUrl={videoUrl} onVideoUrlChange={setVideoUrl} />,
                            },
                        ]}
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 py-4">
                    <Button onClick={onClose}>Cancel</Button>

                    <Button type="primary" onClick={handleSubmit}
                     className='!shadow-none'
                    >
                        {skill ? 'Update' : 'Create'} Skill
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
