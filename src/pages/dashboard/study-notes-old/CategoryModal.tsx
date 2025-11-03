import { Button, Modal, Form, Input, Select, message, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FileUploadBox from '../../../components/shared/FileUploadBox';

export default function CategoryModal({
  isCategoryModalVisible,
  setIsCategoryModalVisible,
  isAddCategoryModalVisible,
  setIsAddCategoryModalVisible,
  isAddSubCategoryModalVisible,
  setIsAddSubCategoryModalVisible,
  isEditCategoryModalVisible,
  setIsEditCategoryModalVisible,
  categoryFormData,
  categories,
  categoryColumns,
}:{
  isCategoryModalVisible: boolean;
  setIsCategoryModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isAddCategoryModalVisible: boolean;
  setIsAddCategoryModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isAddSubCategoryModalVisible: boolean;
  setIsAddSubCategoryModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isEditCategoryModalVisible: boolean;
  setIsEditCategoryModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  categoryFormData: any;
  setCategoryFormData: React.Dispatch<React.SetStateAction<any>>;
  categories: any[];
  categoryColumns: any[];
}) {
  const [form] = Form.useForm();

  const [subcategoryForm] = Form.useForm();

  // Add Category
  const handleAddCategory = async () => {
    try {
      await form.validateFields();
      message.success('Category added!');
      console.log(form.getFieldsValue());
      
      setIsAddCategoryModalVisible(false);
      form.resetFields();
    } catch (err) {}
  };

  // Add Sub-category
  const handleAddSubCategory = async () => {
    try {
        console.log(subcategoryForm.getFieldsValue());
        
      await subcategoryForm.validateFields();
      message.success('Sub-category added!');
      console.log(subcategoryForm.getFieldsValue());
      
      setIsAddSubCategoryModalVisible(false);
      form.resetFields();
    } catch (err) {}
  };

  // Edit Category
  const handleEditCategory = async () => {
    try {
      await form.validateFields();
      message.success('Category updated!');
      setIsEditCategoryModalVisible(false);
      form.resetFields();
    } catch (err) {}
  };

  return (
    <div>
      {/* Categories Management Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Manage Categories</span>}
        open={isCategoryModalVisible}
        onCancel={() => setIsCategoryModalVisible(false)}
        footer={null}
        width={900}
        zIndex={999}
      >
        <div className="mt-4">
          <div className="flex justify-end gap-3 mb-4">
            <Button
              type="default"
              icon={<UploadOutlined />}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => setIsAddSubCategoryModalVisible(true)}
            >
              Add Sub-category
            </Button>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              className="bg-blue-600"
              onClick={() => setIsAddCategoryModalVisible(true)}
            >
              Add Category
            </Button>
          </div>
          <Table
            columns={categoryColumns}
            dataSource={categories}
            pagination={false}
          />
        </div>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Add Category</span>}
        open={isAddCategoryModalVisible}
        onCancel={() => setIsAddCategoryModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAddCategoryModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="add" type="primary" className="bg-blue-600" onClick={handleAddCategory}>
            Add Category
          </Button>,
        ]}
        width={500}
        zIndex={1000}
      >
        <Form form={form} layout="vertical" className="space-y-4 mt-6">
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: 'Please enter category name' }]}
          >
            <Input placeholder="Enter category name" size="large" />
          </Form.Item>
          <Form.Item
            label="Category Image"
            name="categoryImage"
            rules={[{ required: true, message: 'Please upload category image' }]}
          >
            <FileUploadBox title="Upload category image" subtitle="jpg, png, svg" getFile={(file) => form.setFieldsValue({ categoryImage: file })} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Sub-category Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Add Sub-category</span>}
        open={isAddSubCategoryModalVisible}
        onCancel={() => setIsAddSubCategoryModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAddSubCategoryModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="add" type="primary" className="!bg-primary" onClick={handleAddSubCategory}>
            Add Sub-category
          </Button>,
        ]}
        width={500}
        zIndex={1000}
      >
        <Form form={subcategoryForm} layout="vertical" className="space-y-4 mt-6">
          <Form.Item
            label="Select Category"
            name="selectedCategory"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select placeholder="Select category" className="w-full" size="large">
              {categories.map(cat => (
                <Select.Option key={cat.id} value={cat.name}>{cat.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Sub-category Name"
            name="subCategory"
            rules={[{ required: true, message: 'Please enter sub-category name' }]}
          >
            <Input placeholder="Enter sub-category name" size="large" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Edit Category</span>}
        open={isEditCategoryModalVisible}
        onCancel={() => setIsEditCategoryModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditCategoryModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" className="bg-blue-600" onClick={handleEditCategory}>
            Save Changes
          </Button>,
        ]}
        width={500}
        zIndex={1000}
      >
        <Form form={form} layout="vertical" className="space-y-4 mt-6" initialValues={categoryFormData}>
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: 'Please enter category name' }]}
          >
            <Input placeholder="Enter category name" size="large" />
          </Form.Item>
          <Form.Item
            label="Category Image"
            name="categoryImage"
            rules={[{ required: true, message: 'Please upload category image' }]}
          >
            <FileUploadBox title="Upload category image" subtitle="jpg, png, svg" getFile={(file) => form.setFieldsValue({ categoryImage: file })} />
          </Form.Item>
          <Form.Item
            label="Sub-category"
            name="subCategory"
            rules={[{ required: true, message: 'Please enter sub-category name' }]}
          >
            <Input placeholder="Enter sub-category name" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}