
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { Flashcard } from './types';
import { sampleFlashcards } from '../../../demo-data/flashcard-data';
import FlashCard from './FlashCard';

export default function FlashCardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    try {
      const savedCustom = localStorage.getItem('customFlashcards');
      const customCards: Flashcard[] = savedCustom ? JSON.parse(savedCustom) : [];

      const merged = [...sampleFlashcards];

      customCards.forEach(custom => {
        if (!merged.some(c => c.id === custom.id)) {
          merged.push(custom);
        }
      });

      setFlashcards(merged);
    } catch (err) {
      console.error('Failed to load custom flashcards:', err);
      toast.error('Failed to load your custom flashcards');
      setFlashcards([...sampleFlashcards]);
    }
  }, []);

  // Save only custom flashcards back to localStorage
  useEffect(() => {
    if (flashcards.length === 0) return;

    const customOnly = flashcards.filter(card => card.customCard === true);

    try {
      localStorage.setItem('customFlashcards', JSON.stringify(customOnly));
    } catch (err) {
      console.error('Failed to save custom flashcards:', err);
      toast.error('Failed to save your flashcards');
    }
  }, [flashcards]);

  // Handlers passed to admin page
  const handleCreateFlashcard = (newCard: Omit<Flashcard, 'id'>) => {
    const newId = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const cardWithId: Flashcard = { ...newCard, id: newId };
    setFlashcards(prev => [...prev, cardWithId]);
    toast.success('Flashcard created');
  };

  const handleUpdateFlashcard = (updatedCard: Flashcard) => {
    setFlashcards(prev =>
      prev.map(card => (card.id === updatedCard.id ? updatedCard : card))
    );
    toast.success('Flashcard updated');
  };

  const handleDeleteFlashcard = (id: string) => {
    setFlashcards(prev => prev.filter(card => card.id !== id));
    toast.success('Flashcard deleted');
  };

  return (
    <div className="">
      <FlashCard
        flashcards={flashcards}
        onCreateFlashcard={handleCreateFlashcard}
        onUpdateFlashcard={handleUpdateFlashcard}
        onDeleteFlashcard={handleDeleteFlashcard}
      />

      <Toaster richColors position="top-right" />
    </div>
  );
}