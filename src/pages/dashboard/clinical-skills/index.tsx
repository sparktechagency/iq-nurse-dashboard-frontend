import { useState } from 'react';
import { Plus, Stethoscope } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { mockClinicalCategories } from '../../../demo-data/clinical-skills-mock';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { ClinicalSkillsCategoryGrid } from './components/ClinicalSkillsCategoryGrid';
import { CategoryFormModal } from './components/CategoryFormModal';

export default function ClinicalSkillsPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState(mockClinicalCategories);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [editingCategory, setEditingCategory] = useState<(typeof mockClinicalCategories)[0] | null>(null);

    const handleAddCategory = (name: string, logo: string) => {
        const newCategory = {
            id: `category-${Date.now()}`,
            name,
            logo,
            skillCount: 0,
            skills: [],
        };
        setCategories([...categories, newCategory]);
        setIsAddingCategory(false);
    };

    const handleEditCategory = (categoryId: string, name: string, logo: string) => {
        setCategories(categories.map((cat) => (cat.id === categoryId ? { ...cat, name, logo } : cat)));
        setEditingCategory(null);
    };

    const handleDeleteCategory = (categoryId: string) => {
        setCategories(categories.filter((cat) => cat.id !== categoryId));
    };

    const handleCategoryClick = (categoryId: string) => {
        navigate(`/clinical-skills/${categoryId}`);
    };

    return (
        <section>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Clinical Skills</h1>
                    <p className="text-muted-foreground">Manage clinical skill categories and topics</p>
                </div>

                <PrimaryButton
                    onClick={() => setIsAddingCategory(true)}
                    icon={<Plus className="w-4 h-4" />}
                    children="Add Clinical Skills Category"
                />
            </div>

            {/* Categories Grid */}
            <ClinicalSkillsCategoryGrid
                categories={categories}
                onCategoryClick={handleCategoryClick}
                onEditCategory={(category) => setEditingCategory(category)}
                onDeleteCategory={handleDeleteCategory}
            />

            {/* Category Form Modal */}
            <CategoryFormModal
                isOpen={isAddingCategory || !!editingCategory}
                category={editingCategory}
                onClose={() => {
                    setIsAddingCategory(false);
                    setEditingCategory(null);
                }}
                onSubmit={(name, logo) => {
                    if (editingCategory) {
                        handleEditCategory(editingCategory.id, name, logo);
                    } else {
                        handleAddCategory(name, logo);
                    }
                }}
            />
        </section>
    );
}
