
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { Flashcard, ViewMode } from './types';
import FlashcardToolbar from './Components/FlashcardToolbar';
import FlashcardFilters from './Components/FlashcardFilters';
import CategoryGridView from './Components/CategoryGridView';
import FlashcardTableView from './Components/FlashcardTableView';
import CreateFlashcardModal from './Components/CreateFlashcardModal';
import BulkCreateModal from './Components/BulkCreateModal';
import DeleteConfirmModal from './Components/DeleteConfirmModal';


interface FlashCardProps {
  flashcards: Flashcard[];
  onCreateFlashcard: (f: Omit<Flashcard, 'id'>) => void;
  onUpdateFlashcard: (f: Flashcard) => void;
  onDeleteFlashcard: (id: string) => void;
}

export default function FlashCard({
  flashcards,
  onCreateFlashcard,
  onUpdateFlashcard,
  onDeleteFlashcard,
}: FlashCardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);

  // ────────────────────────────────────────────────
  // Filtered + paginated data
  const filteredFlashcards = useMemo(() => {
    return flashcards.filter(card => {
      const q = searchQuery.toLowerCase();
      return (
        card.question.toLowerCase().includes(q) ||
        card.answer.toLowerCase().includes(q)
      ) && (
        selectedCategory === 'all' || card.category === selectedCategory
      ) && (
        selectedSubcategory === 'all' || card.subcategory === selectedSubcategory
      );
    });
  }, [flashcards, searchQuery, selectedCategory, selectedSubcategory]);

  // ────────────────────────────────────────────────
  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setShowCreateModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setCardToDelete(id);
  };

  return (
    <div className="">
      {/* <h1 className="text-3xl font-bold text-gray-900 mb-6">Flashcard Management</h1> */}

      <FlashcardToolbar 
        viewMode={viewMode}
        setViewMode={setViewMode}
        onAddNew={() => {
          setEditingCard(null);
          setShowCreateModal(true);
        }}
        onBulkAdd={() => setShowBulkModal(true)}
      />

      <FlashcardFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />

      {viewMode === 'categories' && (
        <CategoryGridView
          flashcards={flashcards}
          onCategoryClick={(cat) => {
            setSelectedCategory(cat);
            setSelectedSubcategory('all');
            setViewMode('table');
          }}
          onSubcategoryClick={(cat, sub) => {
            setSelectedCategory(cat);
            setSelectedSubcategory(sub);
            setViewMode('table');
          }}
          onAddToCategory={(cat) => {
            setSelectedCategory(cat);
            setShowCreateModal(true);
          }}
        />
      )}

      {viewMode === 'table' && (
        <FlashcardTableView
          flashcards={filteredFlashcards}
          onEdit={handleEdit}
          onDuplicate={(card) => {
            onCreateFlashcard({
              ...card,
              // id: undefined as any, 
              question: card.question + ' (Copy)',
              customCard: true,
            });
            toast.success('Duplicated');
          }}
          onDelete={handleDeleteClick}
        />
      )}

      {/* ─── Modals ──────────────────────────────────────── */}
      <CreateFlashcardModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        editingCard={editingCard}
        onCreate={onCreateFlashcard}
        onUpdate={onUpdateFlashcard}
        onCancel={() => {
          setEditingCard(null);
          setShowCreateModal(false);
        }}
      />

      <BulkCreateModal
        open={showBulkModal}
        onOpenChange={setShowBulkModal}
        onBulkCreate={(cards, category, subcategory) => {
          cards.forEach(c => {
            onCreateFlashcard({
              ...c,
              category,
              subcategory,
              customCard: true,
              timesReviewed: 0,
              correctCount: 0,
            });
          });
          toast.success(`Created ${cards.length} flashcards`);
        }}
      />

      <DeleteConfirmModal
        open={!!cardToDelete}
        onOpenChange={() => setCardToDelete(null)}
        onConfirm={() => {
          if (cardToDelete) {
            onDeleteFlashcard(cardToDelete);
            toast.success('Deleted');
          }
          setCardToDelete(null);
        }}
      />
    </div>
  );
}