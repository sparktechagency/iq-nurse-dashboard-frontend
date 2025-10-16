import { useState } from 'react';
import { Table, Tag, Avatar, Space, Button } from 'antd';
import { InfoCircleOutlined, LockOutlined } from '@ant-design/icons';
import { demoData } from '../../../demo-data/users.data';
import UserModal from './UserModal';

const UserTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleInfoClick = (user:any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const columns = [
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
      render: (text:string, record:any) => (
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
      render: (status:string) => (
        <Tag color={status === 'Active' ? 'success' : 'error'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_:any, record:any) => (
        <Space>
          <Button 
            type="text" 
            icon={<InfoCircleOutlined />} 
            onClick={() => handleInfoClick(record)}
          />
          <Button type="text" icon={<LockOutlined />} />
        </Space>
      ),
    },
  ];





  return (
    <div className=" bg-gray-50">
      <div className="bg-white rounded-lg shadow">
        <Table 
          columns={columns as any} 
          dataSource={demoData} 
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            total: 50
          }}
          className="user-management-table"
        />
      </div>

      <UserModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} selectedUser={selectedUser}/>
    </div>
  );
};

export default UserTable;