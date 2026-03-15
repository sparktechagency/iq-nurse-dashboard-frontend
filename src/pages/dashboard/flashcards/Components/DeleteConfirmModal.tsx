
import { Modal, Button, Space, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface DeleteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  open,
  onOpenChange,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      title={
        <Space>
          <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: 20 }} />
          <span>Delete Flashcard?</span>
        </Space>
      }
      open={open}
      onCancel={() => onOpenChange(false)}
      footer={[
        <Button key="cancel" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>,
        <Button key="delete" danger type="primary" onClick={() => {
          onConfirm();
          onOpenChange(false);
        }}>
          Delete
        </Button>,
      ]}
      centered
    >
      <Text type="secondary">
        This action cannot be undone. The flashcard will be permanently removed.
      </Text>
    </Modal>
  );
}