import { Tag, Button, Modal } from 'antd';

export default function QustionViewModal({ viewingQuestion, setViewingQuestion, typeLabels, difficultyColors }: any) {
    return (
        <Modal
            open={!!viewingQuestion}
            onCancel={() => setViewingQuestion(null)}
            footer={null}
            width={650}
            className="rounded-lg"
            centered
        >
            {viewingQuestion && (
                <div className="space-y-4 p-2">
                    <h2 className="text-xl font-bold mb-2">Question Details</h2>

                    <div>
                        <h3 className="font-semibold text-sm text-muted-foreground">Type</h3>
                        <p>{typeLabels[viewingQuestion.type]}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-sm text-muted-foreground">Question</h3>
                        <p className="whitespace-pre-wrap">{viewingQuestion.questionText}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-sm text-muted-foreground">Difficulty</h3>
                        <Tag color={difficultyColors[viewingQuestion.difficulty]}>
                            {viewingQuestion.difficulty.charAt(0).toUpperCase() + viewingQuestion.difficulty.slice(1)}
                        </Tag>
                    </div>

                    {viewingQuestion.options && (
                        <div>
                            <h3 className="font-semibold text-sm text-muted-foreground">Options</h3>
                            <ul className="space-y-1">
                                {viewingQuestion.options.map((option: any, idx: any) => (
                                    <li key={idx} className="text-sm">
                                        {String.fromCharCode(65 + idx)}. {option}
                                        {viewingQuestion.correctAnswers.includes(idx) && (
                                            <Tag color="green" className="ml-2">
                                                Correct
                                            </Tag>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {viewingQuestion.explanation && (
                        <div>
                            <h3 className="font-semibold text-sm text-muted-foreground">Explanation</h3>
                            <p className="text-sm whitespace-pre-wrap">{viewingQuestion.explanation}</p>
                        </div>
                    )}

                    {viewingQuestion.explanationImage && (
                        <div>
                            <h3 className="font-semibold text-sm text-muted-foreground">Explanation Image</h3>
                            <img
                                src={viewingQuestion.explanationImage}
                                className="max-w-full h-48 object-cover rounded"
                            />
                        </div>
                    )}

                    <Button block type="default" size='large' onClick={() => setViewingQuestion(null)}>
                        Close
                    </Button>
                </div>
            )}
        </Modal>
    );
}
