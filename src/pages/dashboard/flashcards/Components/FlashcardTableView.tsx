import { Table, Button, Space, Tag, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Flashcard } from '../types';

interface FlashcardTableViewProps {
    flashcards: Flashcard[];
    onEdit: (card: Flashcard) => void;
    onDuplicate: (card: Flashcard) => void;
    onDelete: (id: string) => void;
}

export default function FlashcardTableView({
    flashcards,
    onEdit,
    onDelete,
}: FlashcardTableViewProps) {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 100,
            render: (_: any, __: any, index: number) => `#${index + 1}`,
        },
        {
            title: 'Question',
            dataIndex: 'question',
            ellipsis: true,
            width: 300,
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            ellipsis: true,
            width: 300,
        },
        {
            title: 'Category / Subcategory',
            render: (_: any, record: Flashcard) => (
                <Space direction="vertical" size={2}>
                    <div className='bg-primary px-2.5 py-1 text-white rounded-lg text-xs'>{record.category}</div>
                    <Tag color='#00387790'>{record.subcategory || '-'}</Tag>
                </Space>
            ),
        },
        {
            title: 'Type',
            render: (_: any, record: Flashcard) => (
                <Tag color={record.customCard ? 'green' : 'geekblue'}>
                    {record.customCard ? 'Custom' : 'Default'}
                </Tag>
            ),
        },
        {
            title: 'Accuracy',
            render: (_: any, record: Flashcard) => {
                if (!record.timesReviewed) return <span style={{ color: '#999' }}>Not reviewed</span>;
                const acc = Math.round((record.correctCount / record.timesReviewed) * 100);
                return `${acc}%`;
            },
        },
        {
            title: 'Actions',
            width: 160,
            render: (_: any, record: Flashcard) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    </Tooltip>

                    <Tooltip title="View">
                        <Button icon={<EyeOutlined />} disabled />
                    </Tooltip>
                    <Popconfirm
                        title="Delete flashcard?"
                        description="This action cannot be undone."
                        onConfirm={() => onDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className='p-1 '>
            <Table
                columns={columns}
                dataSource={flashcards}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                // scroll={{ x: 1200 }}
            />
        </div>
    );
}