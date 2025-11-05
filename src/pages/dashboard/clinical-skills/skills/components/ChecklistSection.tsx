'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Form, Input, Button } from 'antd';

interface ChecklistSectionProps {
    checklists: string[];
    onChecklistsChange: (checklists: string[]) => void;
}

export function ChecklistSection({ checklists, onChecklistsChange }: ChecklistSectionProps) {
    const handleAddChecklist = () => {
        onChecklistsChange([...checklists, '']);
    };

    const handleUpdateChecklist = (index: number, value: string) => {
        const updated = [...checklists];
        updated[index] = value;
        onChecklistsChange(updated);
    };

    const handleDeleteChecklist = (index: number) => {
        onChecklistsChange(checklists.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-3">
            {checklists?.map((item, index) => (
                <div key={index} className="flex gap-2">
                    <Form.Item className="m-0 flex-1">
                        <Input
                            value={item}
                            onChange={(e) => handleUpdateChecklist(index, e.target.value)}
                            placeholder={`Checklist item ${index + 1}`}
                        />
                    </Form.Item>

                    <Button
                        type="text"
                        onClick={() => handleDeleteChecklist(index)}
                        className="px-2"
                        icon={<Trash2 className="w-4 h-4 text-red-600" />}
                    />
                </div>
            ))}

            <Button
                type="default"
                onClick={handleAddChecklist}
                className="w-full gap-2 bg-transparent flex items-center justify-center"
                icon={<Plus className="w-4 h-4" />}
            >
                Add Checklist Item
            </Button>
        </div>
    );
}
