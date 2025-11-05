'use client';

import { Eye, Edit2, Trash2 } from 'lucide-react';
import { Button, Table } from 'antd';
import { useState } from 'react';
import DeleteModal from '../../../../../components/shared/DeleteModal';

interface Skill {
    id: string;
    serialId: string;
    title: string;
    subtitle: string;
}

interface SkillsTableProps {
    skills: Skill[];
    onEditSkill: (skill: Skill) => void;
    onDeleteSkill: (skillId: string) => void;
}

export function SkillsTable({ skills, onEditSkill, onDeleteSkill }: SkillsTableProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const columns = [
        {
            title: <span className="text-white font-semibold">Serial ID</span>,
            dataIndex: 'serialId',
            key: 'serialId',
            render: (value: string) => <span className="text-sm font-medium text-foreground">{value}</span>,
        },
        {
            title: <span className="text-white font-semibold">Title</span>,
            dataIndex: 'title',
            key: 'title',
            render: (value: string) => <span className="text-sm text-foreground">{value}</span>,
        },
        {
            title: <span className="text-white font-semibold">Subtitle</span>,
            dataIndex: 'subtitle',
            key: 'subtitle',
            render: (value: string) => <span className="text-sm text-muted-foreground">{value}</span>,
        },
        {
            title: <span className="text-white font-semibold">Action</span>,
            key: 'action',
            render: (_: any, record: Skill) => (
                <div className="flex items-center gap-3">
                    <Button type="default" size="small" onClick={() => onEditSkill(record)} className="h-8 w-8 p-0">
                        <Edit2 className="w-4 h-4 text-blue-600" />
                    </Button>

                    <Button
                        type="default"
                        size="small"
                        onClick={() => {
                            setIsDeleting(true);
                            setDeleteId(record.id);
                        }}
                        className="h-8 w-8 p-0"
                    >
                        <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="overflow-x-auto border rounded-lg">
            <Table
                dataSource={skills}
                columns={columns}
                rowKey="id"
                pagination={false}
                className="custom-skill-table"
                locale={{
                    emptyText: (
                        <div className="p-8 text-center text-muted-foreground">
                            No skills added yet. Click "Add Skill" to get started.
                        </div>
                    ),
                }}
            />

            {/* Custom Header Background */}
            <style>{`
        .custom-skill-table .ant-table-thead > tr > th {
          background-color: rgb(30 58 138); /* bg-blue-900 */
          color: white;
          padding: 12px 24px;
          font-weight: 600;
        }
        .custom-skill-table .ant-table-tbody > tr > td {
          padding: 12px 24px !important;
        }

        .custom-skill-table .ant-table-tbody > tr:hover > td {
          background-color: rgb(248 250 252 / 0.5); /* hover:bg-muted/50 */
        }
      `}</style>

            <DeleteModal
                isOpen={isDeleting}
                onCancel={() => setIsDeleting(false)}
                handleDelete={() => {
                    setIsDeleting(false);
                    onDeleteSkill(deleteId!);
                }}
            />
        </div>
    );
}
