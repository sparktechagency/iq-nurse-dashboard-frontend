import { Button, Modal, Select, Form, message } from "antd";
import FileUploadBox from "../../../components/shared/FileUploadBox";
import NoteTab from "../../../components/shared/NoteTab";

export default function UpdateStudyNoteModal({
  isEditModalVisible,
  setIsEditModalVisible,
  selectedNote,
  categories
}: {
  isEditModalVisible: boolean;
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNote: any;
  categories: any[];
}) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      console.log(values);
      message.success("Study note updated!");
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (err) {
      // validation errors
    }
  };

  return (
    <Modal
      title={<span className="text-lg font-semibold">Edit Study Note</span>}
      open={isEditModalVisible}
      onCancel={() => {
        setIsEditModalVisible(false);
        form.resetFields();
      }}
      footer={[
        <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
          Cancel
        </Button>,
        <Button key="save" type="primary" className="bg-blue-600" onClick={handleOk}>
          Save Changes
        </Button>,
      ]}
      width={1000}
      zIndex={1000}
    >
      <Form
        form={form}
        layout="vertical"
        className="space-y-6 mt-6"
        initialValues={{
          category: selectedNote?.category,
          subCategory: selectedNote?.subCategory,
          note: selectedNote?.concept,
        }}
      >
        <Form.Item
          label={<span className="block text-sm font-medium mb-2">Select Category</span>}
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            placeholder="Enter category"
            className="w-full"
            size="large"
          >
            {categories.map(cat => (
              <Select.Option key={cat.id} value={cat.name}>{cat.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className="block text-sm font-medium mb-2">Select Sub-category</span>}
          name="subCategory"
          rules={[{ required: true, message: "Please select a sub-category" }]}
        >
          <Select
            placeholder="Enter Sub-category"
            className="w-full"
            size="large"
          >
            <Select.Option value="ICU Monitoring">ICU Monitoring</Select.Option>
            <Select.Option value="Emergency Care">Emergency Care</Select.Option>
          </Select>
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={<span className="block text-sm font-medium mb-2">Upload Video</span>}
            name="video"
            rules={[{ required: true, message: "Please upload a video" }]}
          >
            <FileUploadBox title="Upload Video" subtitle="Upload video in mp4 format" getFile={(file: any) => console.log(file)} file={selectedNote?.video} />
          </Form.Item>
          <Form.Item
            label={<span className="block text-sm font-medium mb-2">Upload Image</span>}
            name="image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <FileUploadBox title="Upload Image" subtitle="Upload image in jpg or png format" getFile={(file: any) => console.log(file)} file={selectedNote?.image} />
          </Form.Item>
        </div>

        <Form.Item
          label={<span className="block text-sm font-medium mb-2">Note</span>}
          name="note"
          rules={[{ required: true, message: "Please enter your note" }]}
        >
          <NoteTab
          content={selectedNote?.concept}
          height="30vh"
            
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}