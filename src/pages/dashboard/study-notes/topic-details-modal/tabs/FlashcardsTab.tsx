import FlashcardManager from '../../FlashcardManager';

interface FlashcardsTabProps {
    flashcards: any[];
    onAdd: (card: any) => void;
    onRemove: any;
}

const FlashcardsTab = ({ flashcards, onAdd, onRemove }: FlashcardsTabProps) => {
    return <FlashcardManager flashcards={flashcards} onAdd={onAdd} onRemove={onRemove} />;
};

export default FlashcardsTab;
