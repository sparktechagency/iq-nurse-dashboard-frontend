import FlashcardManager from '../../flashcard-manager/FlashcardManager';

interface FlashcardsTabProps {
    flashcards: any[];
    onAdd: (card: any) => void;
    onRemove: any;
    setIsImportingFlashcards: (val: boolean) => void;
    isImportingFlashcards: any;
    handleImportFlashcards: (flashcards: any[]) => void;
}

const FlashcardsTab = ({
    flashcards,
    onAdd,
    onRemove,
    setIsImportingFlashcards,
    isImportingFlashcards,
    handleImportFlashcards,
}: FlashcardsTabProps) => {
    return (
        <>
            <FlashcardManager
                setIsImportingFlashcards={setIsImportingFlashcards}
                flashcards={flashcards}
                onAdd={onAdd}
                onRemove={onRemove}
                isImportingFlashcards={isImportingFlashcards}
                handleImportFlashcards={handleImportFlashcards}
            />
        </>
    );
};

export default FlashcardsTab;
