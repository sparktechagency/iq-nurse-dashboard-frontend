import { Tag, Avatar, Space, Button } from 'antd';
import { InfoCircleOutlined, LockOutlined } from '@ant-design/icons';

export const getUserTableColumns = (handleInfoClick?: (user: any) => void, handleLockUser?: (id: string) => void) => [
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
    width: 100,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: any) => (
      <Space>
        <Avatar src={record.avatar} size={40} />
        <span>{text}</span>
      </Space>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Clubs',
    dataIndex: 'clubs',
    key: 'clubs',
    width: 80,
    align: 'center',
  },
  {
    title: 'Posts',
    dataIndex: 'posts',
    key: 'posts',
    width: 80,
    align: 'center',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'Active' ? 'success' : 'error'}>
        {status}
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    render: (_: any, record: any) => (
      <Space>
        <Button 
          type="text" 
          icon={<InfoCircleOutlined />} 
          onClick={() => handleInfoClick && handleInfoClick(record)}
        />
        <Button type="text" icon={<LockOutlined />} onClick={() => handleLockUser && handleLockUser(record.userId)} />
      </Space>
    ),
  },
];
