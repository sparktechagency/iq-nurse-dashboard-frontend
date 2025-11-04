'use client';

import { useState } from 'react';
import { Plus, Search, CheckSquare, Square } from 'lucide-react';
import { Modal, Button, Input, Tag } from 'antd';
import { mockFlashcards } from '../../../../demo-data/study-note';

interface FlashcardImportModalProps {
    onImport: (flashcards: any[]) => void;
    onClose: () => void;
    open: boolean;
}

export default function FlashcardImportModal({ onImport, onClose, open }: FlashcardImportModalProps) {
    const [selectedFlashcards, setSelectedFlashcards] = useState<Set<string>>(new Set());
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFlashcards = mockFlashcards?.filter((fc) => {
        const matchesCategory = filter === 'all' || fc.category === filter;
        const matchesSearch =
            fc.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fc.back.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleToggle = (id: string) => {
        const newSelected = new Set(selectedFlashcards);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedFlashcards(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedFlashcards.size === filteredFlashcards.length) {
            setSelectedFlashcards(new Set());
        } else {
            const allIds = new Set(filteredFlashcards.map((fc) => fc.id));
            setSelectedFlashcards(allIds);
        }
    };

    const handleImport = () => {
        const toImport = mockFlashcards.filter((fc) => selectedFlashcards.has(fc.id));
        if (toImport.length > 0) {
            onImport(toImport);
        }
    };

    const categories = ['all', 'medical', 'surgical', 'pharmacology'];
    const categoryLabels: Record<string, string> = {
        all: 'All Flashcards',
        medical: 'Medical',
        surgical: 'Surgical',
        pharmacology: 'Pharmacology',
    };

    return (
        <Modal
            title="Import Flashcards"
            open={open}
            onCancel={onClose}
            centered
            footer={[
                <Button key="cancel" onClick={onClose} type="default">
                    Cancel
                </Button>,
                <Button key="import" type="primary" onClick={handleImport}
                className='!shadow-none' disabled={selectedFlashcards.size === 0}>
                    <Plus className="w-4 h-4 mr-2 inline" />
                    Import ({selectedFlashcards.size})
                </Button>,
            ]}
            width={700}
            styles={{
                body: { maxHeight: '400px', overflowY: 'auto', padding: 8 },
            }}
        >
            <div className="mb-3 flex gap-2">
                <Input
                    placeholder="Search flashcards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    prefix={<Search className="w-4 h-4 text-muted-foreground" />}
                />
            </div>

            <div className="mb-3 flex gap-2 flex-wrap">
                {categories?.map((cat) => (
                    <Button
                        key={cat}
                        size="small"
                        type={filter === cat ? 'primary' : 'default'}
                        onClick={() => setFilter(cat)}
                        className='!shadow-none'
                    >
                        {categoryLabels[cat]}
                    </Button>
                ))}
            </div>

            <div className="mb-2 flex items-center justify-between">
                <Button
                    type="text"
                    size="small"
                    onClick={handleSelectAll}
                    icon={
                        selectedFlashcards.size === filteredFlashcards.length && filteredFlashcards.length > 0 ? (
                            <CheckSquare className="w-4 h-4 text-primary" />
                        ) : (
                            <Square className="w-4 h-4" />
                        )
                    }
                >
                    {filteredFlashcards.length > 0
                        ? `Select all (${filteredFlashcards.length})`
                        : 'No flashcards found'}
                </Button>

                {selectedFlashcards.size > 0 && <Tag color="blue">{selectedFlashcards.size} selected</Tag>}
            </div>

            <div className="space-y-2">
                {filteredFlashcards.length > 0 ? (
                    filteredFlashcards.map((flashcard) => (
                        <label
                            key={flashcard.id}
                            className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            <input
                                type="checkbox"
                                checked={selectedFlashcards.has(flashcard.id)}
                                onChange={() => handleToggle(flashcard.id)}
                                className="mt-1 w-4 h-4"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="space-y-1">
                                    <div className="flex items-start gap-2">
                                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                            Front
                                        </span>
                                        <p className="text-sm font-semibold leading-tight text-foreground flex-1">
                                            {flashcard.front}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">
                                            Back
                                        </span>
                                        <p className="text-sm text-muted-foreground leading-tight flex-1">
                                            {flashcard.back}
                                        </p>
                                    </div>
                                </div>
                                {flashcard.category && (
                                    <Tag color="default" className="mt-2">
                                        {flashcard.category}
                                    </Tag>
                                )}
                            </div>
                        </label>
                    ))
                ) : (
                    <div className="flex items-center justify-center py-8 text-center">
                        <p className="text-muted-foreground text-sm">No flashcards match your search</p>
                    </div>
                )}
            </div>
        </Modal>
    );
}
