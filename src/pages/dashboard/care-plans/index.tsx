import { Input } from 'antd';
import CategoriesTable from './components/CategoriesTable';
import { RiSearch2Line } from 'react-icons/ri';
import { useState } from 'react';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import { Plus } from 'lucide-react';
import CategoryDialog from './components/CategoryDialog';
import { carePlansCategories } from '../../../utils/carePlansCategories';

export default function CarePlansMainPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const handleEdit = (category: any) => {
        setEditingCategory(category);
        setIsDialogOpen(true);
    };
    const filteredCategories = carePlansCategories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const handleAdd = () => {
        setEditingCategory(null);
        setIsDialogOpen(true);
    };
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Care Plans Management</h1>
                    <p className="text-muted-foreground mt-2">Manage categories and their care plan topics</p>
                </div>
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search Skill Category"
                        style={{ width: 280, height: 40 }}
                        prefix={<RiSearch2Line size={22} color="#999a9e" />}
                        value={searchTerm}
                        allowClear
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <PrimaryButton onClick={handleAdd} icon={<Plus className="w-4 h-4" />} children="Add Category" />
                </div>
            </div>
            <CategoriesTable handleEdit={handleEdit} categories={filteredCategories} />

            <CategoryDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} category={editingCategory} />
        </div>
    );
}
