'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from 'antd';
import PrimaryButton from '../../../components/shared/PrimaryButton';

interface Flashcard {
    id: string;
    front: string;
    back: string;
}

interface FlashcardManagerProps {
    flashcards: Flashcard[];
    onAdd: (card: Flashcard) => void;
    onRemove: any;
}

export default function FlashcardManager({ flashcards, onAdd, onRemove }: FlashcardManagerProps) {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    const handleAddCard = () => {
        if (front.trim() && back.trim()) {
            onAdd({
                id: `card-${Date.now()}`,
                front,
                back,
            });
            setFront('');
            setBack('');
            setIsAddingCard(false);
        }
    };

    return (
        <div className="space-y-4">
            <PrimaryButton
                onClick={() => setIsAddingCard(!isAddingCard)}
                icon={<Plus className="w-4 h-4 mr-2" />}
                children="Add Flashcard"
            />

            {isAddingCard && (
                <div className="p-4 border border-border rounded-lg bg-muted/50 space-y-3">
                    <textarea
                        placeholder="Front side"
                        value={front}
                        onChange={(e) => setFront(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-border rounded bg-background text-foreground placeholder:text-muted-foreground resize-none"
                    />
                    <textarea
                        placeholder="Back side"
                        value={back}
                        onChange={(e) => setBack(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-border rounded bg-background text-foreground placeholder:text-muted-foreground resize-none"
                    />
                    <div className="flex gap-2">
                        <Button size="large" type='primary'  onClick={handleAddCard} className="flex-1 !border-0 !shadow-none">
                            Add
                        </Button>
                        <Button size="large" onClick={() => setIsAddingCard(false)} className="flex-1">
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-3">
                {flashcards?.map((card, index) => (
                    <div
                        key={index}
                        className="relative h-32 cursor-pointer perspective"
                        onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
                    >
                        <div
                            className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-lg p-4 flex flex-col justify-between transition-all duration-300 ${
                                flippedIndex === index ? 'opacity-0 scale-95' : 'opacity-100'
                            }`}
                        >
                            <div className="flex-1 flex items-center">
                                <p className="text-sm font-semibold text-foreground line-clamp-4">{card.front}</p>
                            </div>
                            <p className="text-xs text-muted-foreground text-right">Click to flip</p>
                        </div>

                        <div
                            className={`absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-lg p-4 flex flex-col justify-between transition-all duration-300 ${
                                flippedIndex === index ? 'opacity-100' : 'opacity-0 scale-95'
                            }`}
                        >
                            <div className="flex-1 flex items-center">
                                <p className="text-sm text-foreground line-clamp-4">{card.back}</p>
                            </div>
                            <p className="text-xs text-muted-foreground text-right">Click to flip back</p>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(index);
                            }}
                            className="absolute -top-2 -right-2 p-1 bg-destructive/20 hover:bg-destructive/30 rounded-full text-destructive hover:text-destructive transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
