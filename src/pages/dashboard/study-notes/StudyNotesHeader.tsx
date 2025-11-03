'use client';

interface StudyNotesHeaderProps {
    category: string;
}

export default function StudyNotesHeader({ category }: StudyNotesHeaderProps) {
    const formatCategory = (cat: string) => {
        if (!cat) return 'Study Notes';
        return cat
            .split('-') // split by '-'
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
            .join(' '); // join with space
    };

    return (
        <div className="border-b border-border px-6 py-4 bg-card">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">{formatCategory(category)}</h1>
            </div>
        </div>
    );
}
