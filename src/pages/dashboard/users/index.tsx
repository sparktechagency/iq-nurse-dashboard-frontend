import { Button, Input, Select, Table } from 'antd';
import { EyeOutlined, LockOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { User, userData } from '../../../demo-data/users.data';
import UserModal from './UserModal';
import BlockModal from './BlockModal';
import HeaderTitle from '../../../components/shared/HeaderTitle';

export default function Users({ dashboard }: { dashboard?: boolean }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
    const [userToBlock, setUserToBlock] = useState<User | null>(null);
    const [countryFilter, setCountryFilter] = useState<string | null>(null);

    // Unique country list
    const countryOptions = useMemo(
        () =>
            Array.from(new Set(userData.map((user) => user.country))).map((country) => ({
                label: country,
                value: country,
            })),
        [],
    );

    // Filtered users
    const filteredUsers = useMemo(() => {
        return userData.filter((user) => {
            if (!countryFilter) return true;
            return user.country === countryFilter;
        });
    }, [countryFilter]);

    const columns = [
        {
            title: 'Serial ID',
            dataIndex: 'serialId',
            key: 'serialId',
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Profession',
            dataIndex: 'profession',
            key: 'profession',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: User) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedUser(record);
                            setIsModalVisible(true);
                        }}
                    />
                    <Button
                        type="text"
                        icon={<LockOutlined />}
                        className={record.status === 'active' ? 'text-gray-500 hover:!text-red-500' : '!text-red-500'}
                        onClick={() => {
                            setUserToBlock(record);
                            setIsBlockModalVisible(true);
                        }}
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

                    <div className="flex gap-3">
                        <Select
                            allowClear
                            showSearch
                            placeholder="Filter by country"
                            options={countryOptions}
                            style={{ width: 220, height: 40 }}
                            onChange={(value) => setCountryFilter(value)}
                            optionFilterProp="label"
                        />

                        <Input
                            placeholder="Search"
                            style={{ width: 280, height: 40 }}
                            prefix={<i className="bi bi-search"></i>}
                        />
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    pagination={dashboard ? false : { pageSize: 9 }}
                    className="custom-table"
                />
            </div>

            <UserModal
                isModalVisible={isModalVisible}
                handleModalClose={() => setIsModalVisible(false)}
                selectedUser={selectedUser}
            />

            <BlockModal
                isBlockModalVisible={isBlockModalVisible}
                handleBlockCancel={() => setIsBlockModalVisible(false)}
                handleBlockConfirm={() => setIsBlockModalVisible(false)}
                isUserBlocked={userToBlock?.status !== 'active'}
            />
        </>
    );
}
