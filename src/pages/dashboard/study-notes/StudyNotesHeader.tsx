'use client';

interface StudyNotesHeaderProps {
    category: string | undefined;
}

export default function StudyNotesHeader({ category }: StudyNotesHeaderProps) {
    const formatCategory = (cat: string | undefined) => {
        if (!cat) return 'Study Notes';
        return cat
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">{formatCategory(category)}</h1>
        </div>
    );
}
