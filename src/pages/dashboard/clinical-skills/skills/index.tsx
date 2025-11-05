'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { mockClinicalCategories } from '../../../../demo-data/clinical-skills-mock';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from 'antd';
import { SkillsTable } from './components/SkillsTable';
import { SkillFormModal } from './components/SkillFormModal';
import PrimaryButton from '../../../../components/shared/PrimaryButton';
import { RiSearch2Line } from 'react-icons/ri';

export default function CategorySkillsPage() {
    const { categoryId } = useParams<{ categoryId: string; subcategory: string }>();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const [category, setCategory] = useState<any>(null);
    const [skills, setSkills] = useState<any[]>([]);
    const [isAddingSkill, setIsAddingSkill] = useState(false);
    const [editingSkill, setEditingSkill] = useState<any>(null);

    useEffect(() => {
        const found = mockClinicalCategories.find((cat) => cat.id === categoryId);
        if (found) {
            setCategory(found);
            setSkills(found.skills);
        }
    }, [categoryId]);

    const handleAddSkill = (skillData: any) => {
        const newSkill = {
            id: `skill-${Date.now()}`,
            serialId: `#${String(skills.length + 1).padStart(2, '0')}`,
            ...skillData,
        };
        setSkills([...skills, newSkill]);
        setIsAddingSkill(false);
    };

    const handleEditSkill = (skillData: any) => {
        setSkills(skills.map((skill) => (skill.id === editingSkill.id ? { ...skill, ...skillData } : skill)));
        setEditingSkill(null);
    };

    const handleDeleteSkill = (skillId: string) => {
        setSkills(skills.filter((skill) => skill.id !== skillId));
    };

    if (!category) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <section className="">
            {/* Header */}
            <div className="mb-8">
                <Button type="text" onClick={() => navigate(-1)} className="mb-4 gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Categories
                </Button>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
                        <p className="text-muted-foreground">{skills.length} Skills</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            placeholder="Search Skill"
                            style={{ width: 280, height: 40 }}
                            value={searchTerm}
                            allowClear
                            onChange={(e) => setSearchTerm(e.target.value)}
                            prefix={<RiSearch2Line size={22} color="#999a9e" />}
                        />
                        <PrimaryButton
                            icon={<Plus className="w-4 h-4" />}
                            children="Add Skill"
                            onClick={() => setIsAddingSkill(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Skills Table */}
            <SkillsTable
                skills={skills}
                onEditSkill={(skill) => setEditingSkill(skill)}
                onDeleteSkill={handleDeleteSkill}
            />

            {/* Skill Form Modal */}
            <SkillFormModal
                isOpen={isAddingSkill || !!editingSkill}
                skill={editingSkill}
                onClose={() => {
                    setIsAddingSkill(false);
                    setEditingSkill(null);
                }}
                onSubmit={(skillData) => {
                    if (editingSkill) {
                        handleEditSkill(skillData);
                    } else {
                        handleAddSkill(skillData);
                    }
                }}
            />
        </section>
    );
}
