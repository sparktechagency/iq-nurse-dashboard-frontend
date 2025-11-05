import { Button, Card } from 'antd';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import DeleteModal from '../../../../components/shared/DeleteModal';
import { useState } from 'react';

interface ExamTopic {
    id: string;
    title: string;
    description: string;
    questionCount: number;
}

interface ExamTopicGridProps {
    topics: ExamTopic[];
    onView: (topic: ExamTopic) => void;
    onEdit?: any;
    onDelete: (id: string) => void;
}

export default function ExamTopicGrid({ topics, onView, onEdit, onDelete }: ExamTopicGridProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-lg transition-shadow ">
                    <div className="pb-3">
                        <h1 className="text-xl line-clamp-2 font-semibold">{topic.title}</h1>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{topic.description}</p>

                        {/* Question Count */}
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-2xl font-bold text-primary">{topic.questionCount}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {topic.questionCount === 1 ? 'Question' : 'Questions'}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2 ">
                            <Button
                                size="large"
                                type="default"
                                className="flex-1 bg-transparent"
                                onClick={() => onView(topic)}
                            >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                            </Button>
                            <Button size="large" type="default" onClick={() => onEdit(topic)}>
                                <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                                size="large"
                                type="default"
                                onClick={() => {
                                    setIsDeleting(true);
                                    setDeleteId(topic.id);
                                }}
                                className=" hover:!text-red-500 hover:!border-red-500"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
            <DeleteModal
                isOpen={isDeleting}
                onCancel={() => setIsDeleting(false)}
                handleDelete={() => {
                    onDelete(deleteId!);
                    setIsDeleting(false);
                }}
            />
        </div>
    );
}
