'use client';
import { Button, Card } from 'antd';
import { Plus, X } from 'lucide-react';
import QuestionsImportModal from '../../QuestionsImportModal';

interface QuestionsTabProps {
    questions: any[];
    onImport: (data: any[]) => void;
    onRemove: (index: number) => void;
    isImporting: boolean;
    setIsImporting: (val: boolean) => void;
}

const QuestionsTab = ({ questions, onImport, onRemove, isImporting, setIsImporting }: QuestionsTabProps) => {
    return (
        <div className="space-y-4 mt-4">
            <Button type="primary" onClick={() => setIsImporting(true)} icon={<Plus />} className='!h-[40px] !shadow-none'>
                Import Questions
            </Button>

            {questions && questions.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {questions.map((q, index) => (
                        <Card key={index} className="border">
                            <div className="flex items-start justify-between mb-2">
                                <div className="font-semibold flex-1">{q.question}</div>
                                <Button
                                    type="text"
                                    icon={<X className="w-4 h-4 text-red-500" />}
                                    onClick={() => onRemove(index)}
                                />
                            </div>
                            <div className="space-y-1">
                                {q.options?.map((opt: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <span className="text-xs font-semibold text-gray-400">
                                            {String.fromCharCode(65 + i)}.
                                        </span>
                                        <span className="text-sm">{opt}</span>
                                    </div>
                                ))}
                            </div>
                            {q.correctAnswer && (
                                <div className="pt-2 mt-2 border-t border-gray-200">
                                    <p className="text-xs font-semibold text-blue-500">
                                        Correct Answer: {q.correctAnswer}
                                    </p>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            ) : (
                <Card bordered={false} className="border-dashed text-center p-6">
                    <p className="text-gray-500 text-sm">No questions yet. Import questions to get started.</p>
                </Card>
            )}

            {isImporting && <QuestionsImportModal onImport={onImport} onClose={() => setIsImporting(false)} />}
        </div>
    );
};

export default QuestionsTab;
