'use client';

import { useState } from 'react';
import { ArrowLeft,  Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockExamTopics } from '../../../../demo-data/mockExamTopics';
import { Button, Card, Input } from 'antd';
import { RiSearch2Line } from 'react-icons/ri';
import QuestionsTable from './components/QuestionsTable';
import QuestionFormModal from './components/QuestionFormModal';
import PrimaryButton from '../../../../components/shared/PrimaryButton';

interface Question {
    id: string;
    type: 'multiple-choice' | 'multiple-response' | 'fill-in-the-blank';
    questionText: string;
    difficulty: 'easy' | 'medium' | 'hard';
    explanation: string;
    explanationImage?: string;
    options?: string[];
    correctAnswers: string[] | number[];
}

export default function TopicQuestionsPage() {
    const router = useNavigate();
    const { topicId } = useParams<{ topicId: string; subcategory: string }>();

    const topic = mockExamTopics?.find((t) => t.id === topicId);

    const [questions, setQuestions] = useState<Question[]>(topic?.questions || []);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);

    if (!topic) {
        return (
            <div className=" bg-gradient-to-br from-background to-muted/30 p-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
                    <Button onClick={() => router('/exam')} type="text">
                        Back to Exam
                    </Button>
                </div>
            </div>
        );
    }

    const filteredQuestions = questions.filter((q) => q.questionText.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleAddQuestion = (newQuestion: Question) => {
        setQuestions([...questions, { ...newQuestion, id: Date.now().toString() }]);
        setIsFormOpen(false);
    };

    const handleEditQuestion = (updatedQuestion: Question) => {
        setQuestions(questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)));
    };

    const handleDeleteQuestion = (id: string) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    return (
        <section>
            {/* Header */}
            <Button onClick={() => router('/exam')} type="text" size="small">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">{topic.title}</h1>
                    <p className="text-muted-foreground mt-1">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search Skill Category"
                        style={{ width: 280, height: 40 }}
                        prefix={<RiSearch2Line size={22} color="#999a9e" />}
                        value={searchQuery}
                        allowClear
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <PrimaryButton
                        children="Add Question"
                        onClick={() => setIsFormOpen(true)}
                        icon={<Plus className="w-4 h-4" />}
                    />
                </div>
            </div>

            {/* Questions Table */}
            {filteredQuestions?.length > 0 ? (
                <QuestionsTable
                    questions={filteredQuestions}
                    onEdit={handleEditQuestion}
                    onDelete={handleDeleteQuestion}
                />
            ) : questions.length > 0 ? (
                <Card className="text-center py-12">
                    <div>
                        <p className="text-muted-foreground">No questions match your search</p>
                    </div>
                </Card>
            ) : (
                <Card className="text-center py-12">
                    <div>
                        <p className="text-muted-foreground mb-4">No questions yet. Create your first question.</p>
                        <Button onClick={() => setIsFormOpen(true)} type="default">
                            Create Question
                        </Button>
                    </div>
                </Card>
            )}

            {/* Question Form Modal */}
            <QuestionFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleAddQuestion} />
        </section>
    );
}
