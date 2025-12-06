'use client';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockData } from '../../../demo-data/study-note';
import SubcategoryGrid from './SubcategoryGrid';

export default function StudyNotesPage() {
    const { category } = useParams<{ category: string; subcategory: string }>();
    console.log(category);

    const [subcategories, setSubcategories] = useState(mockData[category as string] || []);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(subcategories[0]?.id || null);

    const handleAddSubcategory = (name: string, icon: string) => {
        const newSubcategory = {
            id: `sub-${Date.now()}`,
            name,
            icon,
            topics: [],
        };
        setSubcategories([...subcategories, newSubcategory]);
    };

    const handleUpdateSubcategory = (id: string, name: string, description: string) => {
        setSubcategories(subcategories.map((s: any) => (s.id === id ? { ...s, name, description } : s)));
    };

    const handleDeleteSubcategory = (id: string) => {
        setSubcategories(subcategories.filter((s: any) => s.id !== id));
        if (selectedSubcategory === id) {
            setSelectedSubcategory(subcategories[0]?.id || null);
        }
    };

    return (
        <div className="flex flex-col ">
            <div className="flex flex-col flex-1 overflow-hidden">
                <SubcategoryGrid
                    category={category}
                    subcategories={subcategories}
                    onAddSubcategory={handleAddSubcategory}
                    onUpdateSubcategory={handleUpdateSubcategory}
                    onDeleteSubcategory={handleDeleteSubcategory}
                />
            </div>
        </div>
    );
}
