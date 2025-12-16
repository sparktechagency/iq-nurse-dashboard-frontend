'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Plus, X } from 'lucide-react';

interface TopicDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    topic?: any;
    categoryId: string | undefined;
}

export default function TopicDialog({ open, onOpenChange, topic, categoryId }: TopicDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        relatedTo: '',
        evidencedBy: '',
        patientGoals: [''],
        nursingInterventions: [''],
        medications: [
            {
                name: '',
                route: '',
                frequency: '',
                purpose: '',
                nursingConsiderations: '',
            },
        ],
    });

    useEffect(() => {
        if (topic) {
            setFormData({
                name: topic.name,
                relatedTo: topic?.content?.relatedTo || '',
                evidencedBy: topic?.content?.evidencedBy || '',
                patientGoals: topic?.content?.patientGoals || [''],
                nursingInterventions: topic?.content?.nursingInterventions || [''],
                medications: topic?.content?.medications || [
                    {
                        name: '',
                        route: '',
                        frequency: '',
                        purpose: '',
                        nursingConsiderations: '',
                    },
                ],
            });
        } else {
            setFormData({
                name: '',
                relatedTo: '',
                evidencedBy: '',
                patientGoals: [''],
                nursingInterventions: [''],
                medications: [
                    {
                        name: '',
                        route: '',
                        frequency: '',
                        purpose: '',
                        nursingConsiderations: '',
                    },
                ],
            });
        }
    }, [topic, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saving topic:', { ...formData, categoryId });
        onOpenChange(false);
    };

    const addItem = (key: 'patientGoals' | 'nursingInterventions') => {
        setFormData({ ...formData, [key]: [...formData[key], ''] });
    };

    const removeItem = (key: 'patientGoals' | 'nursingInterventions', index: number) => {
        setFormData({
            ...formData,
            [key]: formData[key].filter((_, i) => i !== index),
        });
    };

    const updateItem = (key: 'patientGoals' | 'nursingInterventions', index: number, value: string) => {
        const updated = [...formData[key]];
        updated[index] = value;
        setFormData({ ...formData, [key]: updated });
    };

    const addMedication = () => {
        setFormData({
            ...formData,
            medications: [
                ...formData.medications,
                { name: '', route: '', frequency: '', purpose: '', nursingConsiderations: '' },
            ],
        });
    };

    const removeMedication = (index: number) => {
        setFormData({
            ...formData,
            medications: formData.medications.filter((_, i) => i !== index),
        });
    };

    const updateMedication = (index: number, field: string, value: string) => {
        const updated = [...formData.medications];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, medications: updated });
    };

    return (
        <Modal
            open={open}
            onCancel={() => onOpenChange(false)}
            footer={null}
            centered
            width={700}
            styles={{ body: { maxHeight: '90vh', overflow: 'hidden' } }}
        >
            <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">
                        {topic ? 'Edit Care Plan Topic' : 'Add New Care Plan Topic'}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {topic
                            ? 'Update the care plan topic details below.'
                            : 'Create a new care plan topic with complete information.'}
                    </p>
                </div>

                {/* Scrollable Body */}
                <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Topic name (e.g., Impaired Gas Exchange)"
                            required
                        />
                        <TextArea
                            rows={2}
                            value={formData.relatedTo}
                            onChange={(e) => setFormData({ ...formData, relatedTo: e.target.value })}
                            placeholder="Related to..."
                        />
                        <TextArea
                            rows={2}
                            value={formData.evidencedBy}
                            onChange={(e) => setFormData({ ...formData, evidencedBy: e.target.value })}
                            placeholder="Evidenced by..."
                        />
                    </div>

                    {/* Patient Goals */}
                    <Section title="Patient Goals" onAdd={() => addItem('patientGoals')}>
                        {formData.patientGoals.map((goal, i) => (
                            <RowItem
                                key={i}
                                value={goal}
                                onChange={(v: any) => updateItem('patientGoals', i, v)}
                                onRemove={() => removeItem('patientGoals', i)}
                                removable={formData.patientGoals.length > 1}
                                placeholder={`Goal ${i + 1}`}
                            />
                        ))}
                    </Section>

                    {/* Nursing Interventions */}
                    <Section title="Nursing Interventions" onAdd={() => addItem('nursingInterventions')}>
                        {formData.nursingInterventions.map((item, i) => (
                            <RowItem
                                key={i}
                                value={item}
                                onChange={(v: any) => updateItem('nursingInterventions', i, v)}
                                onRemove={() => removeItem('nursingInterventions', i)}
                                removable={formData.nursingInterventions.length > 1}
                                placeholder={`Intervention ${i + 1}`}
                            />
                        ))}
                    </Section>

                    {/* Medications */}
                    <div className="space-y-2">
                        <Header title="Medications" onAdd={addMedication} />
                        {formData.medications.map((med, i) => (
                            <div
                                key={i}
                                className={`relative border rounded-lg p-4 space-y-3
                            ${formData.medications.length > 1 ? 'pt-8' : ''}
                            `}
                            >
                                {formData.medications.length > 1 && (
                                    <Button
                                        type="text"
                                        icon={<X size={16} />}
                                        className="absolute top-2 right-2"
                                        onClick={() => removeMedication(i)}
                                    />
                                )}
                                <Input
                                    placeholder="Medication name"
                                    value={med.name}
                                    onChange={(e) => updateMedication(i, 'name', e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        placeholder="Route (PO, IV)"
                                        value={med.route}
                                        onChange={(e) => updateMedication(i, 'route', e.target.value)}
                                    />
                                    <Input
                                        placeholder="Frequency"
                                        value={med.frequency}
                                        onChange={(e) => updateMedication(i, 'frequency', e.target.value)}
                                    />
                                </div>
                                <TextArea
                                    rows={2}
                                    placeholder="Purpose"
                                    value={med.purpose}
                                    onChange={(e) => updateMedication(i, 'purpose', e.target.value)}
                                />
                                <TextArea
                                    rows={2}
                                    placeholder="Nursing considerations"
                                    value={med.nursingConsiderations}
                                    onChange={(e) => updateMedication(i, 'nursingConsiderations', e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 mt-6">
                    <Button onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="primary" htmlType="submit">
                        {topic ? 'Update' : 'Create'} Topic
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

/* ---------- helpers ---------- */

function Header({ title, onAdd }: any) {
    return (
        <div className="flex items-center justify-between">
            <span className="font-medium">{title}</span>
            <Button size="small" onClick={onAdd}>
                <Plus size={14} className="mr-1" />
                Add
            </Button>
        </div>
    );
}

function Section({ title, onAdd, children }: any) {
    return (
        <div className="space-y-2">
            <Header title={title} onAdd={onAdd} />
            {children}
        </div>
    );
}

function RowItem({ value, onChange, onRemove, removable, placeholder }: any) {
    return (
        <div className="flex gap-2">
            <TextArea rows={2} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
            {removable && <Button type="text" icon={<X size={16} />} onClick={onRemove} />}
        </div>
    );
}
