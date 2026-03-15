
import { Modal, Form, Select, Input, Button, Space, message, Card } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { nursingCategories } from '../../../../demo-data/flashcard-data';

const { Option } = Select;
const { TextArea } = Input;

interface BulkCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBulkCreate: (cards: Array<{ question: string; answer: string }>, category: string, subcategory: string) => void;
}

export default function BulkCreateModal({
  open,
  onOpenChange,
  onBulkCreate,
}: BulkCreateModalProps) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        const lines = values.bulkText
          .trim()
          .split('\n')
          .filter(( line: string) => line.trim());

        const cards: Array<{ question: string; answer: string }> = [];
        for (let i = 0; i < lines.length; i += 2) {
          if (i + 1 < lines.length) {
            cards.push({
              question: lines[i].replace(/^Q:\s*/i, '').trim(),
              answer: lines[i + 1].replace(/^A:\s*/i, '').trim(),
            });
          }
        }

        if (cards.length === 0) {
          message.error('No valid Q/A pairs found');
          return;
        }

        onBulkCreate(cards, values.category, values.subcategory);
        form.resetFields();
        onOpenChange(false);
      })
      .catch(() => {});
  };

  return (
    <Modal
      title="Bulk Create Flashcards"
      open={open}
      onCancel={() => {
        form.resetFields();
        onOpenChange(false);
      }}
      footer={[
        <Button key="cancel" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Create Flashcards
        </Button>,
      ]}
      width={800}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Category" name="category" rules={[{ required: true }]}>
          <Select   style={{ height: 42 }} placeholder="Select category">
            {nursingCategories.map((cat: { name: string; subcategories: string[] }) => (
              <Option key={cat.name} value={cat.name}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Subcategory" name="subcategory" rules={[{ required: true }]}>
          <Select placeholder="Select subcategory"   style={{ height: 42 }}>
            {nursingCategories
              .find((c: { name: string; subcategories: string[] }) => c.name === form.getFieldValue('category'))
              ?.subcategories.map((sub: string) => (
                <Option key={sub} value={sub}>
                  {sub}
                </Option>
              )) || []}
          </Select>
        </Form.Item>

        <Card
          size="small"
          style={{ marginBottom: 16, background: '#f0f5ff', borderColor: '#91d5ff' }}
        >
          <Space>
            <InfoCircleOutlined style={{ color: '#1890ff' }} />
            <div>
              <strong>Format:</strong> One question per line, followed by its answer on the next line.<br />
              Example:<br />
              What is normal adult heart rate?<br />
              60-100 bpm
            </div>
          </Space>
        </Card>

        <Form.Item
          label="Flashcard Content"
          name="bulkText"
          rules={[{ required: true, message: 'Please enter flashcard content' }]}
        >
          <TextArea
            rows={12}
            placeholder="Paste or type flashcards here..."
            style={{ fontFamily: 'monospace' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}