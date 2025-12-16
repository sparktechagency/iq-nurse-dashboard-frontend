import { Modal, Form, Input, Button, message } from "antd";
import { Category } from "./PatientAssessmentCategory";

interface CategoryModalProps {
    open: boolean;
    editingCategory: Category | null;
    setIsModalOpen: (open: boolean) => void;
    setEditingCategory: (category: Category | null) => void;
    setData: (data: any) => void;
    data: Category[];
}

const CategoryModal = ({ open, editingCategory, setIsModalOpen, setEditingCategory, setData, data }: CategoryModalProps) => {
    const [form] = Form.useForm();

    const handleClose = () => {
        setIsModalOpen(false);
        form.resetFields();
        setEditingCategory(null);
    };


    const handleFinish = (values: { name: string }) => {
        if (editingCategory) {
            // Update logic
            setData((prev: any) =>
                prev.map((item: { id: string, name: string }) =>
                    item.id === editingCategory.id ? { ...item, name: values.name } : item
                )
            );
            message.success("Category updated successfully");
        } else {
            // Add logic
            const newId = (data.length + 1).toString();
            const newCategory: Category = {
                key: newId,
                id: newId,
                name: values.name,
            };
            setData([...data, newCategory]);
            message.success("Category added successfully");
        }
        handleClose();
    };
    return (
        <Modal
            title={editingCategory ? "Edit Category" : "Add Category"}
            open={open}
            onCancel={handleClose}
            footer={null}
            destroyOnClose
            centered
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter category name" }]}
                    className="mt-5"
                >
                    <Input placeholder="Enter category name" size="large" />
                </Form.Item>
                <Form.Item className="mt-7">
                    <Button type="primary" htmlType="submit" size="large" block>
                        {editingCategory ? "Update" : "Submit"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CategoryModal;
