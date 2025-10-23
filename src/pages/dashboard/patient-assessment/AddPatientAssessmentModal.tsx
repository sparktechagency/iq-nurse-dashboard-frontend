import React, { useState } from 'react';
import { Button, Modal, Form, Input, message,} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import FileUploadBox from '../../../components/shared/FileUploadBox';

interface SyndromeRow {
  asessment: string;
  normal: string;
  abnormal: string;
}

interface AddPatientAssessmentModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const AddPatientAssessmentModal: React.FC<AddPatientAssessmentModalProps> = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [syndromes, setSyndromes] = useState<SyndromeRow[]>([
    { asessment: '', normal: '', abnormal: '' }
  ]);
  const [_, setIconPreview] = useState<string | null>(null);
  const [__, setImagePreview] = useState<string | null>(null);

  const handleAddSyndrome = () => {
    setSyndromes([...syndromes, { asessment: '', normal: '', abnormal: '' }]);
  };

  const handleRemoveSyndrome = (idx: number) => {
    setSyndromes(syndromes.filter((_, i) => i !== idx));
  };

  const handleSyndromeChange = (idx: number, field: keyof SyndromeRow, value: string) => {
    const newSyndromes = [...syndromes];
    newSyndromes[idx][field] = value;
    setSyndromes(newSyndromes);
  };

  const handleIconChange = (info: any) => {
    if (info.file && info.file.originFileObj) {
      setIconPreview(URL.createObjectURL(info.file.originFileObj));
      form.setFieldsValue({ icon: info.file.originFileObj });
    }
  };

  const handleImageChange = (info: any) => {
    if (info.file && info.file.originFileObj) {
      setImagePreview(URL.createObjectURL(info.file.originFileObj));
      form.setFieldsValue({ image: info.file.originFileObj });
    }
  };

  const handleFinish = (values: any) => {
    if (syndromes.some(s => !s.asessment || !s.normal || !s.abnormal)) {
      message.error('Please fill all syndrome fields.');
      return;
    }
    onSubmit({
      ...values,
      syndromes: {
        asessment: syndromes.map(s => s.asessment),
        normal: syndromes.map(s => s.normal),
        abnormal: syndromes.map(s => s.abnormal)
      }
    });
    form.resetFields();
    setSyndromes([{ asessment: '', normal: '', abnormal: '' }]);
    setIconPreview(null);
    setImagePreview(null);
  };

  return (
<Modal
  title={<span className="text-lg font-semibold">Add Category</span>}
  open={visible}
  onCancel={onCancel}
  footer={null}
  width={600}
  zIndex={1000}
  centered
>
  <Form form={form} layout="vertical" onFinish={handleFinish}>
    {/* File uploads side by side */}
    <div className="flex gap-4 mb-6">
      <Form.Item
        label="Category Icon"
        name="icon"
        className="flex-1"
      >
        <FileUploadBox
          getFile={handleIconChange}
          title="Upload Icon"
        />
      </Form.Item>
      <Form.Item
        label="Category Image"
        name="image"
        className="flex-1"
      >
        <FileUploadBox
          getFile={handleImageChange}
          title="Upload Image"
        />
      </Form.Item>
    </div>

    <Form.Item
      label="Category Name"
      name="name"
      rules={[{ required: true, message: 'Please enter category name' }]}
    >
      <Input placeholder="Enter Category Name" size="large" />
    </Form.Item>

    <Form.Item label="Description" name="description">
      <Input.TextArea rows={3} placeholder="Enter description" />
    </Form.Item>

    <Form.Item label="Note" name="note">
      <Input.TextArea rows={2} placeholder="Enter note" />
    </Form.Item>

    <Form.Item label="Syndromes">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="max-h-80 overflow-y-auto">
          {syndromes.map((s, idx) => (
            <div
              className={`flex gap-2 items-center p-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              key={idx}
            >
              <Input
                placeholder="Assessment"
                value={s.asessment}
                onChange={e => handleSyndromeChange(idx, 'asessment', e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Normal"
                value={s.normal}
                onChange={e => handleSyndromeChange(idx, 'normal', e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Abnormal"
                value={s.abnormal}
                onChange={e => handleSyndromeChange(idx, 'abnormal', e.target.value)}
                className="flex-1"
              />
              {syndromes.length > 1 && (
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleRemoveSyndrome(idx)}
                  className="flex-shrink-0"
                />
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300 p-2 bg-gray-50">
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddSyndrome}
            className="w-full"
          >
            Add Row
          </Button>
        </div>
      </div>
    </Form.Item>

    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
      <Button onClick={onCancel}>
        Cancel
      </Button>
      <Button type="primary" htmlType="submit">
        Add Category
      </Button>
    </div>
  </Form>
</Modal>
  );
};

export default AddPatientAssessmentModal;