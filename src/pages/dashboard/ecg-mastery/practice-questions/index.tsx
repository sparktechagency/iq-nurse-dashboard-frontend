import { useState, useMemo } from 'react';
import { Table, Button, Input, Space, Tag, Modal, Card, Typography, Select, Breadcrumb, Divider, List } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HeaderTitle from '../../../../components/shared/HeaderTitle';
import DeleteModal from '../../../../components/shared/DeleteModal';
import { toast } from 'sonner';
import ECGQuestionForm from './ECGQuestionForm';
import { initialECGMasteryQuestions, Question, RationaleObject } from '../../../../demo-data/practice-questions';

const { Text: AntText, Title } = Typography;

const ECGMasteryQuestionsPage = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>(initialECGMasteryQuestions);
    const [searchText, setSearchText] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | null>(null);
    
    // Modal states
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingId, setDeletingId] = useState<any>(null);

    const filteredQuestions = useMemo(() => {
        return questions.filter(q => {
            const matchesSearch = q.question.toLowerCase().includes(searchText.toLowerCase()) || 
                                (q.scenario?.toLowerCase().includes(searchText.toLowerCase()) ?? false);
            const matchesType = !typeFilter || q.type === typeFilter;
            return matchesSearch && matchesType;
        });
    }, [questions, searchText, typeFilter]);

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
        // Handle JSON fields if they are strings (from form)
        let processedValues = { ...values };
        try {
            if (typeof values.dropdownOptions === 'string') processedValues.dropdownOptions = JSON.parse(values.dropdownOptions);
            if (typeof values.dropdownAnswers === 'string') processedValues.dropdownAnswers = JSON.parse(values.dropdownAnswers);
            if (values.matrixOptions && typeof values.matrixOptions.correctAnswers === 'string') {
                processedValues.matrixOptions.correctAnswers = JSON.parse(values.matrixOptions.correctAnswers);
            }
            if (typeof values.correctOrder === 'string') {
                processedValues.correctOrder = values.correctOrder.split(',').map((i: string) => parseInt(i.trim()));
            }
        } catch (e) {
            console.error("Error parsing JSON fields", e);
        }

        if (editingQuestion) {
            setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? { ...q, ...processedValues } : q));
            toast.success('Question updated successfully');
        } else {
            const newQuestion = {
                ...processedValues,
                id: Date.now().toString(),
            };
            setQuestions(prev => [newQuestion, ...prev]);
            toast.success('Question added successfully');
        }
    };

    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => <Tag color="blue">{type?.replace('-', ' ').toUpperCase()}</Tag>,
        },
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            width: '60%',
            render: (text: string) => <AntText ellipsis={{ tooltip: text }}>{text}</AntText>,
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
        if (typeof rationale === 'string') return <p className="bg-blue-50 p-3 rounded">{rationale}</p>;
        const r = rationale as RationaleObject;
        return (
            <div className="space-y-4">
                <div>
                     <Tag color="green">CORRECT FEEDBACK</Tag>
                     <p className="mt-2 text-green-700 font-medium">{r.correct}</p>
                </div>
                <div>
                     <Tag color="red">INCORRECT FEEDBACK</Tag>
                     <p className="mt-2 text-red-700 font-medium">{r.incorrect}</p>
                </div>
                <div>
                    <AntText strong>KEY LEARNING POINTS</AntText>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        {r.keyPoints.map((kp, i) => <li key={i}>{kp}</li>)}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <Card className="m-4">
            <div className="mb-6">
                <Breadcrumb 
                    items={[
                        { title: <span className="cursor-pointer" onClick={() => navigate('/ecg-mastery')}>ECG Mastery</span> },
                        { title: 'Practice Questions' }
                    ]} 
                    className="mb-4"
                />
                
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <Button 
                            icon={<ArrowLeftOutlined />} 
                            onClick={() => navigate('/ecg-mastery')}
                            className="flex items-center"
                        >
                            Back
                        </Button>
                        <HeaderTitle title="ECG Mastery Practice Questions" />
                    </div>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
                        Add Question
                    </Button>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                    <Input 
                        placeholder="Search by scenario or question..." 
                        prefix={<SearchOutlined />} 
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 350 }}
                    />
                    <Select 
                        placeholder="Filter by Type" 
                        allowClear 
                        style={{ width: 220 }}
                        onChange={setTypeFilter}
                    >
                        <Select.Option value="multiple-choice">Multiple Choice</Select.Option>
                        <Select.Option value="select-all">Select All</Select.Option>
                        <Select.Option value="dropdown">Dropdown</Select.Option>
                        <Select.Option value="matrix">Matrix</Select.Option>
                        <Select.Option value="ordering">Ordering</Select.Option>
                    </Select>
                </div>
            </div>

            <Table 
                columns={columns} 
                dataSource={filteredQuestions} 
                rowKey="id"
                pagination={{ pageSize: 8 }}
            />

            <ECGQuestionForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialValues={editingQuestion}
            />

            <DeleteModal
                isOpen={isDeleting}
                onCancel={() => setIsDeleting(false)}
                deletingId={deletingId}
                setIsDeleting={setIsDeleting}
                onDelete={confirmDelete}
            />

            <Modal
                title={viewingQuestion ? `Question Details - ${viewingQuestion.type?.toUpperCase()}` : 'View Details'}
                open={isViewModalOpen}
                onCancel={() => setIsViewModalOpen(false)}
                footer={null}
                width={750}
                centered
            >
                {viewingQuestion && (
                    <div className="space-y-6">
                        {viewingQuestion.scenario && (
                            <Card size="small" className="bg-gray-50 italic">
                                {viewingQuestion.scenario}
                            </Card>
                        )}
                        
                        <Title level={4}>{viewingQuestion.question}</Title>
                        
                        {/* Rendering by Type */}
                        <div className="bg-white p-4 border rounded shadow-sm">
                            {(viewingQuestion.type === 'multiple-choice' || viewingQuestion.type === 'select-all') && viewingQuestion.options && (
                                <ul className="list-disc pl-5 space-y-2">
                                    {viewingQuestion.options.map((opt, i) => {
                                        const isCorrect = Array.isArray(viewingQuestion.correctAnswer) 
                                            ? viewingQuestion.correctAnswer.includes(opt)
                                            : viewingQuestion.correctAnswer === opt;
                                        return (
                                            <li key={i} className={isCorrect ? "text-green-600 font-bold" : ""}>
                                                {opt} {isCorrect && "✓"}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}

                            {viewingQuestion.type === 'dropdown' && viewingQuestion.dropdownAnswers && (
                                <div className="space-y-4">
                                    {Object.entries(viewingQuestion.dropdownAnswers).map(([key, val]) => (
                                        <div key={key}>
                                            <AntText strong className="capitalize">{key}: </AntText>
                                            <Tag color="green">{val}</Tag>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {viewingQuestion.type === 'ordering' && viewingQuestion.orderingItems && viewingQuestion.correctOrder && (
                                <div className="space-y-2">
                                    <AntText strong>Correct Priority Order:</AntText>
                                    <List
                                        size="small"
                                        bordered
                                        dataSource={viewingQuestion.correctOrder}
                                        renderItem={(itemIndex, sequence) => (
                                            <List.Item>
                                                <AntText strong className="mr-4">#{sequence + 1}</AntText>
                                                {viewingQuestion.orderingItems?.[itemIndex]}
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            )}

                            {viewingQuestion.type === 'matrix' && viewingQuestion.matrixOptions && (
                                <div className="space-y-4">
                                    <AntText strong>Characteristic Matching:</AntText>
                                    {Object.entries(viewingQuestion.matrixOptions.correctAnswers).map(([row, col]) => (
                                        <div key={row} className="flex justify-between items-center border-b py-2">
                                            <AntText className="w-2/3">{row}</AntText>
                                            <Tag color="cyan">{col}</Tag>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Divider />
                        {renderRationale(viewingQuestion.rationale)}
                    </div>
                )}
            </Modal>
        </Card>
    );
};

export default ECGMasteryQuestionsPage;
