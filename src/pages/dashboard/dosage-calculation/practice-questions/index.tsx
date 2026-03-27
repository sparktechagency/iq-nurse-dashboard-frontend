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
import DosageQuestionForm from './DosageQuestionForm';
import { initialDosageCalculationQuestions, Question } from '../../../../demo-data/practice-questions';

const { Text: AntText, Title } = Typography;

const DosageCalculationQuestionsPage = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>(initialDosageCalculationQuestions);
    const [searchText, setSearchText] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

    // Modal states
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState<any>(null);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(questions.map((q) => q.category)));
        return cats.map((cat) => ({ label: cat, value: cat }));
    }, [questions]);

    const filteredQuestions = useMemo(() => {
        return questions.filter((q) => {
            const matchesSearch =
                q.question.toLowerCase().includes(searchText.toLowerCase()) ||
                q.category.toLowerCase().includes(searchText.toLowerCase());
            const matchesCategory = !categoryFilter || q.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [questions, searchText, categoryFilter]);

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

    const handleDelete = (id: string | number) => {
        setDeletingId(id);
        setIsDeleting(true);
    };

    const confirmDelete = () => {
        setQuestions((prev) => prev.filter((q) => q.id !== deletingId));
        toast.success('Question deleted successfully');
        setIsDeleting(false);
    };

    const handleFormSubmit = (values: any) => {
        if (editingQuestion) {
            setQuestions((prev) => prev.map((q) => (q.id === editingQuestion.id ? { ...q, ...values } : q)));
            toast.success('Question updated successfully');
        } else {
            const newQuestion = {
                ...values,
                id: Date.now().toString(),
            };
            setQuestions((prev) => [newQuestion, ...prev]);
            toast.success('Question added successfully');
        }
        setIsFormModalOpen(false);
    };

    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            width: '50%',
            render: (text: string) => <AntText ellipsis={{ tooltip: text }}>{text}</AntText>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category: string) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Question) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <Card className="m-4">
            <div className="mb-6">
                <Breadcrumb
                    items={[
                        {
                            title: (
                                <span className="cursor-pointer" onClick={() => navigate('/dosage-calculation')}>
                                    Dosage Calculation
                                </span>
                            ),
                        },
                        { title: 'Practice Questions' },
                    ]}
                    className="mb-4"
                />

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate('/dosage-calculation')}
                            className="flex items-center"
                        >
                            Back
                        </Button>
                        <HeaderTitle title="Dosage Calculation Practice Questions" />
                    </div>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
                        Add Question
                    </Button>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                    <Input
                        placeholder="Search questions..."
                        prefix={<SearchOutlined />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />
                    <Select
                        placeholder="Filter by Category"
                        allowClear
                        style={{ width: 220 }}
                        onChange={setCategoryFilter}
                        options={categories}
                    />
                </div>
            </div>

            <Table columns={columns} dataSource={filteredQuestions} rowKey="id" pagination={{ pageSize: 10 }} />

            <DosageQuestionForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialValues={editingQuestion}
                categories={categories.map((c) => c.value)}
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
                footer={null}
                width={700}
                centered
            >
                {viewingQuestion && (
                    <div className="space-y-4">
                        <div>
                            <Tag color="blue">{viewingQuestion.category}</Tag>
                            {viewingQuestion.difficulty && (
                                <Tag color="gold" className="ml-2">
                                    {viewingQuestion.difficulty}
                                </Tag>
                            )}
                        </div>
                        <Title level={4}>{viewingQuestion.question}</Title>

                        {viewingQuestion.options && (
                            <div className="space-y-2">
                                <AntText strong>Options:</AntText>
                                <ul className="list-disc pl-5 mt-2">
                                    {viewingQuestion.options.map((opt: string, i: number) => (
                                        <li
                                            key={i}
                                            className={
                                                viewingQuestion.correctAnswer === i ? 'text-green-600 font-bold' : ''
                                            }
                                        >
                                            {opt} {viewingQuestion.correctAnswer === i && '✓'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Divider />
                        <div className="space-y-3">
                            <div>
                                <AntText strong className="text-green-700">
                                    Rationale:
                                </AntText>
                                <p className="mt-1 bg-green-50 p-3 rounded">{viewingQuestion.rationale}</p>
                            </div>
                            {viewingQuestion.explanation && (
                                <div>
                                    <AntText strong className="text-blue-700">
                                        Calculation / Step-by-step:
                                    </AntText>
                                    <p className="mt-1 bg-blue-50 p-3 rounded font-mono whitespace-pre-wrap">
                                        {viewingQuestion.explanation}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </Card>
    );
};

export default DosageCalculationQuestionsPage;
