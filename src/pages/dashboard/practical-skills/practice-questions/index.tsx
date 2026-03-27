import { useState, useMemo } from 'react';
import { Table, Button, Input, Space, Tag, Modal, Card, Typography, Select, Breadcrumb, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from '../../../../components/shared/HeaderTitle';
import DeleteModal from '../../../../components/shared/DeleteModal';
import { toast } from 'sonner';
import QuestionForm from '../../diagnostic-tests-laboratory/practice-questions/QuestionForm';
import { initialPracticalSkillsQuestions, Question, RationaleObject } from '../../../../demo-data/practice-questions';

const { Text: AntText, Title } = Typography;

const PracticalSkillsQuestionsPage = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>(initialPracticalSkillsQuestions);
    const [searchText, setSearchText] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
    
    // Modal states
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState<any>(null);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(questions.map(q => q.category)));
        return cats.map(cat => ({ label: cat, value: cat }));
    }, [questions]);

    const filteredQuestions = useMemo(() => {
        return questions.filter(q => {
            const matchesSearch = q.question.toLowerCase().includes(searchText.toLowerCase()) || 
                                (q.category?.toLowerCase() || '').includes(searchText.toLowerCase());
            const matchesCategory = !categoryFilter || q.category === categoryFilter;
            const matchesDifficulty = !difficultyFilter || q.difficulty === difficultyFilter;
            return matchesSearch && matchesCategory && matchesDifficulty;
        });
    }, [questions, searchText, categoryFilter, difficultyFilter]);

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
        setQuestions(prev => prev.filter(q => q.id !== deletingId));
        toast.success('Question deleted successfully');
        setIsDeleting(false);
    };

    const handleFormSubmit = (values: any) => {
        if (editingQuestion) {
            setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? { ...q, ...values } : q));
            toast.success('Question updated successfully');
        } else {
            const newQuestion = {
                ...values,
                id: Date.now().toString(),
            };
            setQuestions(prev => [newQuestion, ...prev]);
            toast.success('Question added successfully');
        }
        setIsFormModalOpen(false);
    };

    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            width: '40%',
            render: (text: string) => <AntText ellipsis={{ tooltip: text }}>{text}</AntText>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category: string) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            key: 'difficulty',
            render: (difficulty: string) => {
                const colors: any = {
                    'Easy': 'success',
                    'Medium': 'warning',
                    'Hard': 'error'
                };
                return difficulty ? <Tag color={colors[difficulty] || 'default'}>{difficulty}</Tag> : '-';
            },
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

    const renderRationale = (rationale: any) => {
        if (!rationale) return null;
        if (typeof rationale === 'string') return <p className="mt-1 bg-green-50 p-3 rounded">{rationale}</p>;
        
        const r = rationale as RationaleObject;
        return (
            <div className="mt-1 bg-green-50 p-4 rounded space-y-4">
                {r.correct && (
                    <div>
                        <AntText strong className="text-green-600">Correct: </AntText>
                        <AntText className="text-gray-700">{r.correct}</AntText>
                    </div>
                )}
                {r.incorrect && (
                    <div>
                        <AntText strong className="text-red-600">Incorrect: </AntText>
                        <AntText className="text-gray-700">{r.incorrect}</AntText>
                    </div>
                )}
                {r.keyPoints && r.keyPoints.length > 0 && (
                    <div>
                        <AntText strong>Key Learning Points:</AntText>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                            {r.keyPoints.map((kp: string, i: number) => <li key={i} className="text-gray-700">{kp}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    return (
        <Card className="m-4">
            <div className="mb-6">
                <Breadcrumb 
                    items={[
                        { title: <span className="cursor-pointer" onClick={() => navigate('/practical-skills')}>Practical Skills</span> },
                        { title: 'Practice Questions' }
                    ]} 
                    className="mb-4"
                />
                
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <Button 
                            icon={<ArrowLeftOutlined />} 
                            onClick={() => navigate('/practical-skills')}
                            className="flex items-center"
                        >
                            Back
                        </Button>
                        <HeaderTitle title="Practical Skills Practice Questions" />
                    </div>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
                        Add Question
                    </Button>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                    <Input 
                        placeholder="Search questions..." 
                        prefix={<SearchOutlined />} 
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />
                    <Select 
                        placeholder="Filter by Category" 
                        allowClear 
                        style={{ width: 220 }}
                        onChange={setCategoryFilter}
                        options={categories}
                    />
                    <Select 
                        placeholder="Filter by Difficulty" 
                        allowClear 
                        style={{ width: 180 }}
                        onChange={setDifficultyFilter}
                    >
                        <Select.Option value="Easy">Easy</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="Hard">Hard</Select.Option>
                    </Select>
                </div>
            </div>

            <Table 
                columns={columns} 
                dataSource={filteredQuestions} 
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            <QuestionForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialValues={editingQuestion}
                categories={categories.map(c => c.value)}
                allowedTypes={['multiple-choice', 'multiple-response']}
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
            >
                {viewingQuestion && (
                    <div className="space-y-4">
                        <div>
                            <Tag color="blue">{viewingQuestion.category}</Tag>
                            {viewingQuestion.difficulty && <Tag color="gold" className="ml-2">{viewingQuestion.difficulty}</Tag>}
                        </div>
                        <Title level={4}>{viewingQuestion.question}</Title>
                        
                        {viewingQuestion.context && (
                            <Card size="small" className="bg-gray-50 mb-4 font-italic">
                                {viewingQuestion.context}
                            </Card>
                        )}

                        {viewingQuestion.options && (
                            <div className="space-y-2">
                                <AntText strong>Options:</AntText>
                                <ul className="list-disc pl-5 mt-2">
                                    {viewingQuestion.options.map((opt, i) => (
                                        <li key={i} className={viewingQuestion.correctAnswers?.includes(opt) ? "text-green-600 font-bold" : ""}>
                                            {opt} {viewingQuestion.correctAnswers?.includes(opt) && "✓"}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {viewingQuestion.matrixData && (
                            <div className="overflow-x-auto">
                                <AntText strong>Matrix Review:</AntText>
                                <Table 
                                    size="small"
                                    pagination={false}
                                    columns={[
                                        { title: 'Item', dataIndex: 'row', key: 'row' },
                                        ...(viewingQuestion.matrixData.columns.map((col: string) => ({
                                            title: col,
                                            key: col,
                                            render: (row: string) => viewingQuestion.matrixData?.correctCells.includes(`${row}-${col}`) ? "✓" : "-"
                                        })) as any)
                                    ]}
                                    dataSource={viewingQuestion.matrixData.rows}
                                />
                            </div>
                        )}

                        {viewingQuestion.caseStudyParts && (
                            <div className="space-y-6">
                                <AntText strong>Case Study Breakdown:</AntText>
                                {viewingQuestion.caseStudyParts.map((part, index) => (
                                    <Card key={index} size="small" title={`Part ${part.part}: ${part.question}`}>
                                        <ul className="list-disc pl-5">
                                            {part.options.map((opt: string, i: number) => (
                                                <li key={i} className={part.correctAnswers?.includes(opt) ? "text-green-600 font-bold" : ""}>
                                                    {opt} {part.correctAnswers?.includes(opt) && "✓"}
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                ))}
                            </div>
                        )}

                        <Divider />
                        <div>
                            <AntText strong className="text-green-700">Rationale:</AntText>
                            {renderRationale(viewingQuestion.rationale)}
                        </div>
                    </div>
                )}
            </Modal>
        </Card>
    );
};

export default PracticalSkillsQuestionsPage;
