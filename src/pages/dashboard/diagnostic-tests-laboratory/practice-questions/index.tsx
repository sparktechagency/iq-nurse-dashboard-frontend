import { useState, useMemo } from 'react';
import { Table, Button, Input, Space, Tag, Modal, Card, Typography, Select, Breadcrumb, Divider } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined,
    ArrowLeftOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from '../../../../components/shared/HeaderTitle';
import DeleteModal from '../../../../components/shared/DeleteModal';
import { toast } from 'sonner';
import QuestionForm from './QuestionForm';
import { initialPracticeQuestions, Question } from '../../../../demo-data/practice-questions';

const { Text, Title, Paragraph } = Typography;

export default function PracticeQuestionsPage() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>(initialPracticeQuestions);
    const [searchText, setSearchText] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState<any>(null);

    // Get unique categories for filter
    const categories = useMemo(() => {
        const cats = Array.from(new Set(questions.map((q) => q.category)));
        return cats.map((c) => ({ label: c, value: c }));
    }, [questions]);

    const filteredQuestions = useMemo(() => {
        return questions.filter((q) => {
            const matchesSearch =
                q.question.toLowerCase().includes(searchText.toLowerCase()) ||
                q?.category?.toLowerCase().includes(searchText.toLowerCase());
            const matchesType = !typeFilter || q.type === typeFilter;
            const matchesCategory = !categoryFilter || q.category === categoryFilter;
            return matchesSearch && matchesType && matchesCategory;
        });
    }, [questions, searchText, typeFilter, categoryFilter]);

    const handleAdd = () => {
        setEditingQuestion(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (question: Question) => {
        setEditingQuestion(question);
        setIsFormModalOpen(true);
    };

    const handleView = (question: Question) => {
        setViewingQuestion(question);
        setIsViewModalOpen(true);
    };

    const handleDelete = (id: any) => {
        setDeletingId(id);
        setIsDeleting(true);
    };

    const confirmDelete = () => {
        setQuestions((prev) => prev.filter((q) => q.id !== deletingId));
        setIsDeleting(false);
        toast.success('Question deleted successfully');
    };

    const handleFormSubmit = (values: any) => {
        if (editingQuestion) {
            setQuestions((prev) => prev.map((q) => (q.id === editingQuestion.id ? { ...q, ...values } : q)));
            toast.success('Question updated successfully');
        } else {
            setQuestions((prev) => [values, ...prev]);
            toast.success('Question added successfully');
        }
    };

    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            width: '40%',
            render: (text: string) => (
                <Text ellipsis={{ tooltip: text }} style={{ maxWidth: 400 }}>
                    {text}
                </Text>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category: string) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => {
                const colors: Record<string, string> = {
                    matrix: 'purple',
                    'case-study': 'orange',
                    'multiple-response': 'green',
                    'multiple-choice': 'cyan',
                };
                return <Tag color={colors[type] || 'default'}>{type.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Question) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} size="small" onClick={() => handleView(record)} />
                    <Button icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} size="small" danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div className="p-2">
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item onClick={() => navigate('/diagnostic-tests')} className="cursor-pointer">
                    Diagnostic Tests
                </Breadcrumb.Item>
                <Breadcrumb.Item>Practice Questions</Breadcrumb.Item>
            </Breadcrumb>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <HeaderTitle title="Practice Questions Management" />
                    <p className="text-sm text-muted-foreground mt-1">Manage practice questions for students</p>
                </div>
                <Space>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/diagnostic-tests')}>
                        Back
                    </Button>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="!bg-primary">
                        Add Question
                    </Button>
                </Space>
            </div>

            <Card className="mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <Text strong className="block mb-2">
                            Search
                        </Text>
                        <Input
                            placeholder="Search by question text or category..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <div className="w-[200px]">
                        <Text strong className="block mb-2">
                            Filter by Type
                        </Text>
                        <Select
                            placeholder="All Types"
                            style={{ width: '100%' }}
                            allowClear
                            onChange={(value) => setTypeFilter(value)}
                        >
                            <Select.Option value="multiple-choice">Multiple Choice</Select.Option>
                            <Select.Option value="multiple-response">Multiple Response</Select.Option>
                            <Select.Option value="matrix">Matrix</Select.Option>
                            <Select.Option value="case-study">Case Study</Select.Option>
                        </Select>
                    </div>
                    <div className="w-[200px]">
                        <Text strong className="block mb-2">
                            Filter by Category
                        </Text>
                        <Select
                            placeholder="All Categories"
                            style={{ width: '100%' }}
                            allowClear
                            options={categories}
                            onChange={(value) => setCategoryFilter(value)}
                        />
                    </div>
                </div>
            </Card>

            <Table
                dataSource={filteredQuestions}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                className="shadow-sm border rounded-lg overflow-hidden"
            />

            <QuestionForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialValues={editingQuestion}
                categories={categories?.map((c) => c.value)}
            />

            <DeleteModal
                isOpen={isDeleting}
                onCancel={() => setIsDeleting(false)}
                deletingId={deletingId}
                setIsDeleting={setIsDeleting}
                onDelete={confirmDelete}
            />

            <Modal
                title="View Question Details"
                open={isViewModalOpen}
                onCancel={() => setIsViewModalOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setIsViewModalOpen(false)}>
                        Close
                    </Button>,
                ]}
                width={700}
            >
                {viewingQuestion && (
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <div>
                            <Text type="secondary">Category: </Text>
                            <Tag color="blue">{viewingQuestion.category}</Tag>
                            <Text type="secondary" className="ml-4">
                                Type:{' '}
                            </Text>
                            <Tag color="purple">{viewingQuestion.type?.toUpperCase()}</Tag>
                        </div>

                        <div>
                            <Title level={5}>Question</Title>
                            <Paragraph>{viewingQuestion.question}</Paragraph>
                        </div>

                        {viewingQuestion.context && (
                            <div>
                                <Title level={5}>Context</Title>
                                <Paragraph className="italic bg-gray-50 p-2 rounded">
                                    {viewingQuestion.context}
                                </Paragraph>
                            </div>
                        )}

                        {viewingQuestion.options && (
                            <div>
                                <Title level={5}>Options</Title>
                                <ul className="list-disc pl-6">
                                    {viewingQuestion.options.map((opt, i) => (
                                        <li
                                            key={i}
                                            className={
                                                (
                                                    Array.isArray(viewingQuestion.correctAnswers)
                                                        ? viewingQuestion.correctAnswers.includes(opt)
                                                        : viewingQuestion.correctAnswers === opt
                                                )
                                                    ? 'text-green-600 font-medium'
                                                    : ''
                                            }
                                        >
                                            {opt}{' '}
                                            {(Array.isArray(viewingQuestion.correctAnswers)
                                                ? viewingQuestion.correctAnswers.includes(opt)
                                                : viewingQuestion.correctAnswers === opt) && '✓'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {viewingQuestion.matrixData && (
                            <div>
                                <Title level={5}>Matrix Configuration</Title>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Text strong>Rows:</Text>
                                        <ul className="list-disc pl-4">
                                            {viewingQuestion.matrixData.rows.map((r: any) => (
                                                <li key={r}>{r}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <Text strong>Columns:</Text>
                                        <ul className="list-disc pl-4">
                                            {viewingQuestion.matrixData.columns.map((c: any) => (
                                                <li key={c}>{c}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <Text strong className="mt-2 block">
                                    Correct Pairings:
                                </Text>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {viewingQuestion.matrixData.correctCells.map((cell: any) => (
                                        <Tag key={cell}>{cell}</Tag>
                                    ))}
                                </div>
                            </div>
                        )}

                        {viewingQuestion.caseStudyParts && (
                            <div>
                                <Title level={5}>Case Study Parts</Title>
                                {viewingQuestion.caseStudyParts.map((part, index) => (
                                    <Card
                                        size="small"
                                        title={`Part ${part.part}: ${part.question}`}
                                        className="mb-2"
                                        key={index}
                                    >
                                        <ul className="list-disc pl-4">
                                            {part.options.map((opt: any, i: any) => (
                                                <li
                                                    key={i}
                                                    className={
                                                        (
                                                            Array.isArray(part.correctAnswers)
                                                                ? part.correctAnswers.includes(opt)
                                                                : part.correctAnswers === opt
                                                        )
                                                            ? 'text-green-600 font-medium'
                                                            : ''
                                                    }
                                                >
                                                    {opt}
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                ))}
                            </div>
                        )}

                        <Divider />
                        <div>
                            <Title level={5}>Rationale</Title>
                            {viewingQuestion?.rationale && (
                                typeof viewingQuestion.rationale === 'string' ? (
                                    <Paragraph className="text-gray-700">{viewingQuestion.rationale}</Paragraph>
                                ) : (
                                    <div className="space-y-4">
                                        {viewingQuestion.rationale.correct && (
                                            <div>
                                                <Text strong className="text-green-600">Correct: </Text>
                                                <Paragraph className="text-gray-700 inline">{viewingQuestion.rationale.correct}</Paragraph>
                                            </div>
                                        )}
                                        {viewingQuestion.rationale.incorrect && (
                                            <div>
                                                <Text strong className="text-red-600">Incorrect: </Text>
                                                <Paragraph className="text-gray-700 inline">{viewingQuestion.rationale.incorrect}</Paragraph>
                                            </div>
                                        )}
                                        {viewingQuestion.rationale.keyPoints && viewingQuestion.rationale.keyPoints.length > 0 && (
                                            <div>
                                                <div className="font-semibold mb-1">Key Points:</div>
                                                <ul className="list-disc pl-6">
                                                    {viewingQuestion.rationale.keyPoints.map((point, idx) => (
                                                        <li key={idx} className="text-gray-700">{point}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </Space>
                )}
            </Modal>
        </div>
    );
}
