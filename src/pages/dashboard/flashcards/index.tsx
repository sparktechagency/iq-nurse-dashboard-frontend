import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FlashCardData } from "../../../demo-data/flashcard-data";
import { useState } from "react";
import AddFlashCardModal from "./AddFlashCardModal";
import { useNavigate } from "react-router-dom";
interface EditEvent {
    preventDefault: () => void;
    stopPropagation: () => void;
}

const FlashcardsPage = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (e: EditEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
    }
    return (
        <div className="">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">NCLEX Study Subjects</h1>
                    <p className="text-gray-600 mt-1">
                        Choose a subject to start studying with our pre-made flashcards
                    </p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium shadow" onClick={() => setOpen(true)}>
                    + Add FlashCard
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {FlashCardData.map((subject, index) => (
                    <div
                        key={index}
                        className="relative bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                        onClick={() => navigate(`/flashcards/${subject.title}`)}
                    >
                        <div className="absolute top-3 right-3 flex space-x-2 text-gray-500">
                            <button className="text-yellow-500" onClick={(e) => handleEdit(e)}>
                                <FiEdit2 size={16} />
                            </button>
                            <button className="text-red-500">
                                <FiTrash2 size={16} />
                            </button>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">{subject.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {subject.description}
                        </p>
                    </div>
                ))}
            </div>
            <AddFlashCardModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default FlashcardsPage;