import { Button, Input, Table } from 'antd';
import { EyeOutlined, LockOutlined } from '@ant-design/icons';
import { User, userData } from '../../../demo-data/users.data';
import { useState } from 'react';
import UserModal from './UserModal';
import BlockModal from './BlockModal';
import HeaderTitle from '../../../components/shared/HeaderTitle';

export default function Users({ dashboard }: { dashboard?: boolean }) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    const [userToBlock, setUserToBlock] = useState<User | null>(null);

    
    const showUserDetails = (user: User) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

   const showBlockModal = (user: User) => {
    setUserToBlock(user);
    setIsBlockModalVisible(true);
  };

  const handleBlockConfirm = () => {
    // Handle block user logic here
    console.log('Blocking user:', userToBlock);
    setIsBlockModalVisible(false);
    setUserToBlock(null);
  };

  const handleBlockCancel = () => {
    setIsBlockModalVisible(false);
    setUserToBlock(null);
  };


    const columns = [
        {
            title: 'Serial ID',
            dataIndex: 'serialId',
            key: 'serialId',
            responsive: ['sm'] as any,
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'] as any,
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
            responsive: ['lg'] as any,
        },
        {
            title: 'Subscription',
            dataIndex: 'subscription',
            key: 'subscription',
            responsive: ['sm'] as any,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: User) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() => showUserDetails(record)}
                    />
                    <Button
                        type="text"
                        icon={<LockOutlined />}
                        className={record?.status =="active"? "text-gray-500 hover:!text-red-500":"hover:!text-gray-500 !text-red-500"}
                        onClick={() => showBlockModal(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="rounded-lg shadow-sm border border-gray-200 p-4"> 
                <div className="flex items-center justify-between mb-4">  
                    <HeaderTitle title="Users" />
                <Input placeholder="Search" className="" style={{ width: 280 , height: 40}} prefix={<i className="bi bi-search"></i>} />
                </div>
                <Table
                    columns={columns}
                    dataSource={userData}
                    pagination={dashboard ? false : { pageSize: 9, total: userData.length }}
                    className="custom-table"
                />
            </div>

            <UserModal
                isModalVisible={isModalVisible}
                handleModalClose={handleModalClose}
                selectedUser={selectedUser}
            />

            <BlockModal
                isBlockModalVisible={isBlockModalVisible}
                handleBlockCancel={handleBlockCancel}
                handleBlockConfirm={handleBlockConfirm}
                isUserBlocked={userToBlock?.status !== 'active'}
            />
        </>
    );
}
