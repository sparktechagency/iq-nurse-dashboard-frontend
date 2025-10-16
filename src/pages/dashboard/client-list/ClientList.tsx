import React, { useState } from 'react';
import { Table, Button, Tag, Space, Typography, Card } from 'antd';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import ClientFilter from './ClientFilter';
import { clientData, ClientData } from '../../../demo-data/clientlist';

const { Text } = Typography;

const ClientListTable: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [joinedFromFilter, setJoinedFromFilter] = useState('');

    // Sample client data

    const getStatusTag = (status: string) => {
        const statusConfig = {
            Active: { color: 'success', text: 'Active' },
            Pending: { color: 'warning', text: 'Pending' },
            Suspend: { color: 'error', text: 'Suspend' },
        };

        const config = statusConfig[status as keyof typeof statusConfig];
        return (
            <Tag color={config.color} className="px-3 py-1 rounded-full">
                {config.text}
            </Tag>
        );
    };

    const getActionButtons = (record: ClientData) => {
        const buttonConfig = {
            Active: { approve: 'Approve', reject: 'Suspend', approveColor: 'success', rejectColor: 'danger' },
            Pending: { approve: 'Approve', reject: 'Reject', approveColor: 'success', rejectColor: 'danger' },
            Suspend: { approve: 'Reactive', reject: '', approveColor: 'worning', rejectColor: 'danger' },
        };

        const config = buttonConfig[record.status];

        return (
            <Space size="small">
                <Button
                    className={
                        config.approveColor === 'success'
                            ? 'bg-green-500 !px-4 !py-3 text-white hover:bg-green-600 border-green-500'
                            : config.approveColor === 'warning'
                            ? 'bg-orange-500 !px-4 !py-3 text-white hover:bg-orange-600 '
                            : 'bg-orange-500 !px-4 !py-3 text-white hover:bg-orange-600 '
                    }
                >
                    {config.approve}
                </Button>
                {config.reject && (
                    <Button className="!bg-red-500 !px-4 !py-3 text-white hover:!bg-red-600">{config.reject}</Button>
                )}
            </Space>
        );
    };

    const columns = [
        {
            title: 'Partner ID',
            dataIndex: 'partnerId',
            key: 'partnerId',
            render: (text: string) => text,
        },
        {
            title: 'Partner Name',
            dataIndex: 'partnerName',
            key: 'partnerName',
            render: (text: string) => <Text>{text}</Text>,
        },
        {
            title: 'Partner Email',
            dataIndex: 'partnerEmail',
            key: 'partnerEmail',
            render: (text: string) => <Text type="secondary">{text}</Text>,
        },
        {
            title: 'Partner Number',
            dataIndex: 'partnerNumber',
            key: 'partnerNumber',
            render: (text: string) => (
                <div>
                    <div className="text-gray-900">{text}</div>
                </div>
            ),
        },
        {
            title: 'Join Date',
            dataIndex: 'joinDate',
            key: 'joinDate',
            render: (text: string) => (
                <div>
                    <div className="text-gray-900">{text}</div>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => getStatusTag(status),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: ClientData) => getActionButtons(record),
        },
        {
            title: 'Assets',
            key: 'assets',
            render: () => (
                <div className="flex items-center gap-3">
                    <Button>View</Button>
                    <Button>Edit Assets</Button>
                </div>
            ),
        },
    ];

    const filteredData = clientData.filter((item) => {
        const matchesSearch =
            !searchText ||
            item.partnerName.toLowerCase().includes(searchText.toLowerCase()) ||
            item.partnerEmail.toLowerCase().includes(searchText.toLowerCase()) ||
            item.partnerId.toLowerCase().includes(searchText.toLowerCase());

        const matchesStatus = !statusFilter || item.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-12">
            <Card className="shadow-sm">
                <div className="mb-6">
                    {/* Header */}
                    <div className="mb-4">
                        <HeaderTitle title="Client" subtitle="List" />
                        <Text type="secondary" className="!my-0">
                            Manage and monitor all your registered clients in one place.
                        </Text>
                    </div>

                    {/* Filters */}
                    <ClientFilter
                        searchText={searchText}
                        setSearchText={setSearchText}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        joinedFromFilter={joinedFromFilter}
                        setJoinedFromFilter={setJoinedFromFilter}
                    />
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    className="custom-table "
                    rowClassName="bg-[#F9F0EC]"
                    onHeaderRow={() => ({ className: 'bg-[#F3F6F9]' })}
                    scroll={{ x: 768 }}
                />
            </Card>

            <style>{`
        .custom-table .ant-table-thead > tr > th {
          background-color: ;
          border-bottom: 2px solid #e2e8f0;
          font-weight: 600;
          color: #64748b;
          padding: 16px;
        }
        .custom-table .ant-table-tbody > tr > td {
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .custom-table .ant-table-tbody > tr:hover > td {
          background-color: #f8fafc;
        }
      `}</style>
        </div>
    );
};

export default ClientListTable;
