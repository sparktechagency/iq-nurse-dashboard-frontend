import { useEffect, useState } from 'react';
import { Modal, Button, Input } from 'antd';

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: any;
}

export default function CategoryDialog({ open, onOpenChange, category }: CategoryDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
            });
        } else {
            setFormData({ name: '' });
        }
    }, [category, open]);

    const handleSubmit = () => {
        console.log('Saving category:', formData);
        onOpenChange(false);
    };

    return (
        <Modal open={open} onCancel={() => onOpenChange(false)} footer={null} centered width={425}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">{category ? 'Edit Category' : 'Add New Category'}</h2>
                    <p className="text-sm text-gray-500">
                        {category ? 'Update the category details below.' : 'Create a new care plan category.'}
                    </p>
                </div>

                {/* Body */}
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Category Name</label>
                        <Input
                            style={{ height: 40 }}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Respiratory"
                            required
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 mt-4">
                    <Button style={{ height: 40 }} onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button style={{ height: 40 }} type="primary" htmlType="submit">
                        {category ? 'Update' : 'Create'} Category
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
