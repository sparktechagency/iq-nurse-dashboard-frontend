
import { useState, useRef } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Upload,
  message,
  Typography,
  Divider,
  List,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  SaveOutlined,
  DeleteOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile } from 'antd/es/upload/interface';
import { nursingCategories } from '../../../../demo-data/flashcard-data';
import { Flashcard } from '../types';


const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface CreateFlashcardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCard: Flashcard | null;
  onCreate: (card: Omit<Flashcard, 'id'>) => void;
  onUpdate: (card: Flashcard) => void;
  onCancel: () => void;
}

export default function CreateFlashcardModal({
  open,
  onOpenChange,
  editingCard,
  onCreate,
  onUpdate,
  onCancel,
}: CreateFlashcardModalProps) {
  const [form] = Form.useForm();
  const [cardsToCreate, setCardsToCreate] = useState<
    Array<{ question: string; answer: string; questionImage?: string; answerImage?: string }>
  >([]);
  const [currentCategory, setCurrentCategory] = useState('Fundamentals of Nursing');
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  const isEditing = !!editingCard;

  const availableSubcategories =
    nursingCategories.find((c: { name: string; subcategories: string[] }) => c.name === currentCategory)?.subcategories || [];

  const insertFormat = (field: 'question' | 'answer', format: 'bold' | 'italic' | 'underline' | 'list') => {
    const ref = field === 'question' ? questionRef : answerRef;
    if (!ref.current) return;

    const textarea = ref.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);

    let newText = '';
    switch (format) {
      case 'bold':
        newText = selected ? `**${selected}**` : '**text**';
        break;
      case 'italic':
        newText = selected ? `*${selected}*` : '*text*';
        break;
      case 'underline':
        newText = selected ? `__${selected}__` : '__text__';
        break;
      case 'list':
        newText = selected
          ? selected
              .split('\n')
              .map(line => `• ${line}`)
              .join('\n')
          : '• Item 1\n• Item 2';
        break;
    }

    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);
    const updated = before + newText + after;

    form.setFieldsValue({ [field]: updated });

    setTimeout(() => {
      textarea.focus();
      const pos = start + newText.length;
      textarea.setSelectionRange(pos, pos);
    }, 0);
  };

  const handleImageUpload = (
    field: 'questionImage' | 'answerImage',
    info: UploadChangeParam
  ) => {
    if (info.file.status === 'done') {
      // For demo - in real app you'd upload to server / get URL
      const reader = new FileReader();
      reader.onload = e => {
        form.setFieldsValue({ [field]: e.target?.result as string });
        message.success(`${field.replace('Image', '')} image uploaded`);
      };
      reader.readAsDataURL(info.file.originFileObj as RcFile);
    } else if (info.file.status === 'error') {
      message.error('Image upload failed');
    }
  };

  const addToQueue = () => {
    form
      .validateFields()
      .then(values => {
        setCardsToCreate([
          ...cardsToCreate,
          {
            question: values.question.trim(),
            answer: values.answer.trim(),
            questionImage: values.questionImage,
            answerImage: values.answerImage,
          },
        ]);
        form.setFieldsValue({
          question: '',
          answer: '',
          questionImage: undefined,
          answerImage: undefined,
        });
        message.success('Card added to queue');
      })
      .catch(() => {});
  };

  const removeFromQueue = (index: number) => {
    setCardsToCreate(cardsToCreate.filter((_, i) => i !== index));
    message.success('Card removed');
  };

  const handleSaveSingle = () => {
    form
      .validateFields()
      .then(values => {
        const cardData = {
          question: values.question.trim(),
          answer: values.answer.trim(),
          category: values.category,
          subcategory: values.subcategory,
          questionImage: values.questionImage,
          answerImage: values.answerImage,
          timesReviewed: 0,
          correctCount: 0,
          customCard: true,
        };

        if (isEditing && editingCard) {
          onUpdate({ ...editingCard, ...cardData });
          message.success('Flashcard updated');
        } else {
          onCreate(cardData);
          message.success('Flashcard created');
        }

        onOpenChange(false);
        form.resetFields();
      })
      .catch(() => {});
  };

  const handleSaveAll = () => {
    if (cardsToCreate.length === 0) {
      message.warning('No cards in queue');
      return;
    }

    form
      .validateFields(['category', 'subcategory'])
      .then(values => {
        cardsToCreate.forEach(item => {
          onCreate({
            ...item,
            category: values.category,
            subcategory: values.subcategory,
            timesReviewed: 0,
            correctCount: 0,
            customCard: true,
          });
        });
        message.success(`Created ${cardsToCreate.length} flashcards`);
        setCardsToCreate([]);
        onOpenChange(false);
        form.resetFields();
      })
      .catch(() => {});
  };

  return (
    <Modal
      title={isEditing ? 'Edit Flashcard' : 'Create Flashcard'}
      open={open}
      onCancel={() => {
        form.resetFields();
        setCardsToCreate([]);
        onCancel();
        onOpenChange(false);
      }}
      footer={null}
      width={900}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={editingCard || { category: 'Fundamentals of Nursing' }}>
        <Form.Item label="Category" name="category" rules={[{ required: true }]}>
          <Select style={{ height: 42 }} onChange={v => setCurrentCategory(v as string)}>
            {nursingCategories.map((cat: { name: string; subcategories: string[] }) => (
              <Option key={cat.name} value={cat.name}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Subcategory" name="subcategory" rules={[{ required: true, message: 'Please select subcategory' }]}>
          <Select   style={{ height: 42 }} placeholder="Select subcategory">
            {availableSubcategories.map((sub: string) => (
              <Option key={sub} value={sub}>
                {sub}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Divider />

        {cardsToCreate.length > 0 && (
          <>
            <Title level={5}>Cards in Queue ({cardsToCreate.length})</Title>
            <List
              size="small"
              bordered
              dataSource={cardsToCreate}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Remove this card?"
                      onConfirm={() => removeFromQueue(index)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>,
                  ]}
                >
                  <div style={{ flex: 1 }}>
                    <Text strong>{item.question.substring(0, 80)}{item.question.length > 80 ? '...' : ''}</Text>
                    <br />
                    <Text type="secondary">{item.answer.substring(0, 80)}{item.answer.length > 80 ? '...' : ''}</Text>
                  </div>
                </List.Item>
              )}
              style={{ marginBottom: 24 }}
            />
          </>
        )}

        <Form.Item label="Question" name="question" rules={[{ required: true }]}>
          <div style={{ marginBottom: 8 }}>
            <Space>
              <Button icon={<BoldOutlined />} onClick={() => insertFormat('question', 'bold')} />
              <Button icon={<ItalicOutlined />} onClick={() => insertFormat('question', 'italic')} />
              <Button icon={<UnderlineOutlined />} onClick={() => insertFormat('question', 'underline')} />
              <Button icon={<OrderedListOutlined />} onClick={() => insertFormat('question', 'list')} />
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={info => handleImageUpload('questionImage', info)}
                accept="image/*"
              >
                <Button icon={<PictureOutlined />}>Image</Button>
              </Upload>
            </Space>
          </div>
          <TextArea ref={questionRef} rows={4} placeholder="Enter question..." />
        </Form.Item>

        <Form.Item label="Answer" name="answer" rules={[{ required: true }]}>
          <div style={{ marginBottom: 8 }}>
            <Space>
              <Button icon={<BoldOutlined />} onClick={() => insertFormat('answer', 'bold')} />
              <Button icon={<ItalicOutlined />} onClick={() => insertFormat('answer', 'italic')} />
              <Button icon={<UnderlineOutlined />} onClick={() => insertFormat('answer', 'underline')} />
              <Button icon={<OrderedListOutlined />} onClick={() => insertFormat('answer', 'list')} />
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={info => handleImageUpload('answerImage', info)}
                accept="image/*"
              >
                <Button icon={<PictureOutlined />}>Image</Button>
              </Upload>
            </Space>
          </div>
          <TextArea ref={answerRef} rows={5} placeholder="Enter answer..." />
        </Form.Item>

        <Space style={{ marginTop: 24, width: '100%' }} size="middle">
          {!isEditing && (
            <>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addToQueue}
                style={{ flex: 1 }}
              >
                Add to Queue
              </Button>

              {cardsToCreate.length > 0 && (
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSaveAll}
                  style={{ flex: 1 }}
                >
                  Save All ({cardsToCreate.length})
                </Button>
              )}

              <Button onClick={handleSaveSingle}>Save Single</Button>
            </>
          )}

          {isEditing && (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSaveSingle}
              block
            >
              Update Flashcard
            </Button>
          )}
        </Space>
      </Form>
    </Modal>
  );
}