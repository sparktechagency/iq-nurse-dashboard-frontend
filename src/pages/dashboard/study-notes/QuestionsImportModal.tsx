'use client';

import { useState } from 'react';
import { Plus, Search, CheckSquare, Square } from 'lucide-react';
import { Modal, Button, Input, Checkbox, Tag } from 'antd';
import { mockQuestions } from '../../../demo-data/study-note';

const { Search: SearchInput } = Input;

interface QuestionsImportModalProps {
    onImport: (questions: any[]) => void;
    onClose: () => void;
}

export default function QuestionsImportModal({ onImport, onClose }: QuestionsImportModalProps) {
    const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredQuestions = mockQuestions.filter((q) => {
        const matchesCategory = filter === 'all' || q.category === filter;
        const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleToggle = (id: string) => {
        const newSelected = new Set(selectedQuestions);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedQuestions(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedQuestions.size === filteredQuestions.length) {
            setSelectedQuestions(new Set());
        } else {
            const allIds = new Set(filteredQuestions.map((q) => q.id));
            setSelectedQuestions(allIds);
        }
    };

    const handleImport = () => {
        const toImport = mockQuestions.filter((q) => selectedQuestions.has(q.id));
        if (toImport.length > 0) onImport(toImport);
    };

    const categories = ['all', 'medical', 'surgical', 'pharmacology'];
    const categoryLabels: Record<string, string> = {
        all: 'All Questions',
        medical: 'Medical',
        surgical: 'Surgical',
        pharmacology: 'Pharmacology',
    };

    return (
        <Modal
            open={true}
            onCancel={onClose}
            footer={null}
            title="Import Questions"
            width={700}
            centered
            styles={{
                body: {
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            {/* Search Input */}
            <div className="mb-3">
                <SearchInput
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    prefix={<Search className="w-4 h-4 text-gray-400" />}
                    allowClear
                />
            </div>

            {/* Category Buttons */}
            <div className="flex gap-2 flex-wrap mb-3">
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        size="small"
                        onClick={() => setFilter(cat)}
                        type={filter === cat ? 'primary' : 'default'}
                        className={'!shadow-none'}
                    >
                        {categoryLabels[cat]}
                    </Button>
                ))}
            </div>

            {/* Select All + Count */}
            <div className="flex items-center justify-between mb-2">
                <Button
                    type="text"
                    onClick={handleSelectAll}
                    icon={
                        selectedQuestions.size === filteredQuestions.length && filteredQuestions.length > 0 ? (
                            <CheckSquare className="w-4 h-4 text-blue-500" />
                        ) : (
                            <Square className="w-4 h-4" />
                        )
                    }
                >
                    {filteredQuestions.length > 0 ? `Select all (${filteredQuestions.length})` : 'No questions found'}
                </Button>
                {selectedQuestions.size > 0 && <Tag color="blue">{selectedQuestions.size} selected</Tag>}
            </div>

            {/* Question List */}
            <div className="flex-1 overflow-y-auto space-y-2">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                        <div
                            key={question.id}
                            className="flex items-start gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleToggle(question.id)}
                        >
                            <div className="mt-1">
                                <Checkbox
                                    checked={selectedQuestions.has(question.id)}
                                    onChange={() => handleToggle(question.id)}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold leading-tight">{question.question}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Tag color="default" className="capitalize">
                                        {question.category}
                                    </Tag>
                                    <span className="text-xs text-gray-500">
                                        {question.options?.length || 0} options
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center py-8 text-center">
                        <p className="text-gray-500 text-sm">No questions match your search</p>
                    </div>
                )}
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-2 mt-4">
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    type="primary"
                    onClick={handleImport}
                    disabled={selectedQuestions.size === 0}
                    icon={<Plus className="w-4 h-4" />}
                >
                    Import ({selectedQuestions.size})
                </Button>
            </div>
        </Modal>
    );
}
