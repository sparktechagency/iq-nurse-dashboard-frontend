'use client';

import { useState } from 'react';
import { Table, Tag, Button, Tooltip, Modal } from 'antd';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import QuestionFormModal from './QuestionFormModal';
import QustionViewModal from './QustionViewModal';

interface Question {
    id: string;
    type: 'multiple-choice' | 'multiple-response' | 'fill-in-the-blank';
    questionText: string;
    difficulty: 'easy' | 'medium' | 'hard';
    explanation: string;
    explanationImage?: string;
    options?: string[];
    correctAnswers: (string | number)[];
}

interface QuestionsTableProps {
    questions: Question[];
    onEdit: any;
    onDelete: (id: string) => void;
}

const difficultyColors = {
    easy: 'green',
    medium: 'gold',
    hard: 'red',
};

const typeLabels = {
    'multiple-choice': 'Multiple Choice',
    'multiple-response': 'Select All',
    'fill-in-the-blank': 'Fill-in-Blank',
};

export default function QuestionsTable({ questions, onEdit, onDelete }: QuestionsTableProps) {
    const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const columns: any[] = [
        {
            title: <span className="text-white font-medium">S.No</span>,
            dataIndex: 'index',
            width: 80,
            render: (_: any, __: Question, index: number) => <span>#{index + 1}</span>,
        },
        {
            title: <span className="text-white font-medium">Question</span>,
            dataIndex: 'questionText',
            render: (text: string) => <p className="line-clamp-2 text-sm max-w-md">{text}</p>,
        },
        {
            title: <span className="text-white font-medium">Type</span>,
            dataIndex: 'type',
            render: (value: keyof typeof typeLabels) => (
                <Tag bordered={false} className="border border-border">
                    {typeLabels[value]}
                </Tag>
            ),
        },
        {
            title: <span className="text-white font-medium">Difficulty</span>,
            dataIndex: 'difficulty',
            render: (value: keyof typeof difficultyColors) => (
                <Tag color={difficultyColors[value]}>{value.charAt(0).toUpperCase() + value.slice(1)}</Tag>
            ),
        },
        {
            title: <span className="text-white font-medium text-right block">Actions</span>,
            width: 150,
            render: (_: any, record: Question) => (
                <div className="flex justify-end space-x-1">
                    <Tooltip title="View question details">
                        <Button
                            type="text"
                            icon={<Eye className="w-4 h-4" />}
                            onClick={() => setViewingQuestion(record)}
                        />
                    </Tooltip>

                    <Tooltip title="Edit question">
                        <Button
                            type="text"
                            icon={<Edit2 className="w-4 h-4" />}
                            onClick={() => {
                                setEditingQuestion(record);
                                setIsFormOpen(true);
                            }}
                        />
                    </Tooltip>

                    <Tooltip title="Delete question">
                        <Button
                            type="text"
                            danger
                            icon={<Trash2 className="w-4 h-4" />}
                            onClick={() => {
                                Modal.confirm({
                                    title: 'Delete Question?',
                                    content: 'Are you sure you want to delete this question?',
                                    okText: 'Delete',
                                    okButtonProps: { danger: true },
                                    onOk: () => onDelete(record.id),
                                });
                            }}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <>
            {/* ✅ Table with primary header color */}
            <div className="border rounded-lg overflow-hidden">
                <Table
                    columns={columns}
                    dataSource={questions}
                    rowKey="id"
                    pagination={false}
                    className="custom-question-table"
                />
            </div>

            <style>{`
        .custom-question-table .ant-table-thead > tr > th {
          background-color: rgb(30 58 138) !important; /* bg-blue-900 */
          color: white;
          padding: 12px 24px;
          font-weight: 600;
        }
        .custom-question-table .ant-table-tbody > tr > td {
          padding: 12px 24px !important;
        }

        .custom-question-table .ant-table-tbody > tr:hover > td {
          background-color: rgb(248 250 252 / 0.5); /* hover:bg-muted/50 */
        }
      `}</style>

            {/* ✅ ANT DESIGN VIEW MODAL */}
            <QustionViewModal
                viewingQuestion={viewingQuestion}
                setViewingQuestion={setViewingQuestion}
                typeLabels={typeLabels}
                difficultyColors={difficultyColors}
            />
            {/* ✅ Your Edit/Create Modal (unchanged) */}
            <QuestionFormModal
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingQuestion(null);
                }}
                onSubmit={(q) => {
                    onEdit(q);
                    setIsFormOpen(false);
                    setEditingQuestion(null);
                }}
                initialData={editingQuestion}
            />
        </>
    );
}
