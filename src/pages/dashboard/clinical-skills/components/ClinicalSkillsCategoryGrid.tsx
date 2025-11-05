'use client';

import { Button, Card } from 'antd';
import { Edit2, Trash2 } from 'lucide-react';
import DeleteModal from '../../../../components/shared/DeleteModal';
import { useState } from 'react';

interface Category {
    id: string;
    name: string;
    logo: string;
    skillCount: number;
    skills: any[];
}

interface CategoryGridProps {
    categories: Category[];
    onCategoryClick: (categoryId: string) => void;
    onEditCategory: (category: Category) => void;
    onDeleteCategory: (categoryId: string) => void;
}

export function ClinicalSkillsCategoryGrid({
    categories,
    onCategoryClick,
    onEditCategory,
    onDeleteCategory,
}: CategoryGridProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {categories?.map((category) => (
                <Card
                    key={category.id}
                    className="cursor-pointer hover:shadow-lg transition-all group"
                    onClick={() => onCategoryClick(category.id)}
                >
                    <div className="">
                        <div className="flex items-center gap-4">
                            {/* Logo */}
                            <div className="w-12 h-12 bg-orange-100  rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">{category.logo}</span>
                            </div>
                            {/* Content */}
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-1">{category.name}</h3>
                                <p className="text-sm text-muted-foreground">{category.skillCount} Skills</p>
                            </div>
                        </div>
                        {/* Actions */}
                        <div
                            className="flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity mt-4 justify-end"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button size="small" onClick={() => onEditCategory(category)} className="h-8 w-8 p-0">
                                <Edit2 className="w-4 h-4 text-blue-600" />
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsDeleting(true);
                                    setDeleteId(category.id);
                                }}
                                size="small"
                                className="h-8 w-8 p-0"
                            >
                                <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
            <DeleteModal
                isOpen={isDeleting}
                onCancel={() => setIsDeleting(false)}
                handleDelete={() => {
                    onDeleteCategory(deleteId || '');
                    setIsDeleting(false);
                }}
            />
        </div>
    );
}
