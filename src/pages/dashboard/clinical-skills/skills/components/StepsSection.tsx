'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Form, Input, Button } from 'antd';

interface Step {
    title: string;
    description: string;
}

interface StepsSectionProps {
    steps: Step[];
    onStepsChange: (steps: Step[]) => void;
}

export function StepsSection({ steps, onStepsChange }: StepsSectionProps) {
    const handleAddStep = () => {
        onStepsChange([...steps, { title: '', description: '' }]);
    };

    const handleUpdateStep = (index: number, field: 'title' | 'description', value: string) => {
        const updated = [...steps];
        updated[index] = { ...updated[index], [field]: value };
        onStepsChange(updated);
    };

    const handleDeleteStep = (index: number) => {
        onStepsChange(steps.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {steps.map((step, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-muted-foreground">Step {index + 1}</span>

                        <Button
                            type="text"
                            size="small"
                            onClick={() => handleDeleteStep(index)}
                            className="px-2"
                            icon={<Trash2 className="w-4 h-4 text-red-600" />}
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-xs">Title</label>
                        <Form.Item className="m-0">
                            <Input
                                value={step.title}
                                onChange={(e) => handleUpdateStep(index, 'title', e.target.value)}
                                placeholder={`Step ${index + 1} title`}
                                className="mt-1"
                            />
                        </Form.Item>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-xs">Description</label>
                        <Form.Item className="m-0">
                            <Input.TextArea
                                value={step.description}
                                onChange={(e) => handleUpdateStep(index, 'description', e.target.value)}
                                placeholder={`Step ${index + 1} description`}
                                className="mt-1 h-20"
                            />
                        </Form.Item>
                    </div>
                </div>
            ))}

            {/* Add step */}
            <Button
                type="default"
                onClick={handleAddStep}
                className="w-full gap-2 bg-transparent flex items-center justify-center"
                icon={<Plus className="w-4 h-4" />}
            >
                Add Step
            </Button>
        </div>
    );
}
