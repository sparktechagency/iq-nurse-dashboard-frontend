import React, { useState } from 'react';
import { Table, Tag, Avatar, Space, Button } from 'antd';
import { InfoCircleOutlined, LockOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ClubModal from './ClubModal';


export interface ClassData {
  no: number;
  title: string;
  date: string;
  enrolled: number;
  price: string;
  status: 'Active' | 'Complete';
}

interface ClubData {
  key: string;
  no: number;
  name: string;
  username: string;
  avatar: string;
  email: string;
  established: string;
  country: string;
  visibility: string;
  status: 'Active' | 'Disable';
  website: string;
  postcode: string;
  speciality: string;
  manager: string;
  classes: ClassData[];
}

const ClubsTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedClub, setSelectedClub] = useState<ClubData | null>(null);

  const handleInfoClick = (club: ClubData): void => {
    setSelectedClub(club);
    setIsModalOpen(true);
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setSelectedClub(null);
  };

  const columns: ColumnsType<ClubData> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 60,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ClubData) => (
        <Space>
          <Avatar src={record.avatar} size={32} />
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
      title: 'Established',
      dataIndex: 'established',
      key: 'established',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Visibility',
      dataIndex: 'visibility',
      key: 'visibility',
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
      render: (_: any, record: ClubData) => (
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

  const data: ClubData[] = [
    {
      key: '1',
      no: 1,
      name: 'Highgate Assembly',
      username: '@highgate_assembly',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Highgate&backgroundColor=1e40af',
      email: 'tangsh@yahoo.ca',
      established: '28/10/2012',
      country: 'USA',
      visibility: 'Private',
      status: 'Active',
      website: 'http://www.aemediocs.com',
      postcode: 'LSE 3EN',
      speciality: 'Fusion Club',
      manager: 'Jhon Luca, Tony Watson',
      classes: [
        { no: 1, title: 'Choreography', date: '28/10/2012', enrolled: 543, price: '$8.99', status: 'Active' },
        { no: 2, title: 'Spinny Pole', date: '12/06/2020', enrolled: 456, price: '$5.22', status: 'Active' },
        { no: 3, title: 'Beginners Pole', date: '07/05/2016', enrolled: 213, price: '$8.99', status: 'Complete' },
        { no: 4, title: 'Mixed Ability', date: '12/06/2020', enrolled: 233, price: '$11.70', status: 'Active' },
        { no: 5, title: 'Sunday Service', date: '28/10/2012', enrolled: 546, price: '$14.81', status: 'Active' },
        { no: 6, title: 'Beginners Pole', date: '07/05/2016', enrolled: 444, price: '$17.84', status: 'Complete' },
        { no: 7, title: 'Sunday Service', date: '18/09/2016', enrolled: 622, price: '$17.84', status: 'Active' },
        { no: 8, title: 'Brookfield League', date: '15/08/2017', enrolled: 245, price: '$14.81', status: 'Complete' },
        { no: 9, title: 'Spinny Pole', date: '07/05/2016', enrolled: 846, price: '$6.48', status: 'Active' },
      ]
    },
    {
      key: '2',
      no: 2,
      name: 'Kingswell Hall',
      username: '@kingswell_hall',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Kingswell&backgroundColor=7c2d12',
      email: 'paulv@sbcglobal.net',
      established: '12/06/2020',
      country: 'Russia',
      visibility: 'Internal',
      status: 'Active',
      website: 'http://www.kingswellhall.com',
      postcode: 'MSK 101',
      speciality: 'Dance Studio',
      manager: 'Anna Petrova',
      classes: []
    },
    {
      key: '3',
      no: 3,
      name: 'Westhaven Trust',
      username: '@westhaven_trust',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Westhaven&backgroundColor=dc2626',
      email: 'michiel@comcast.net',
      established: '07/05/2016',
      country: 'France',
      visibility: 'Private',
      status: 'Disable',
      website: 'http://www.westhaven.fr',
      postcode: 'PAR 750',
      speciality: 'Ballet Center',
      manager: 'Marie Dubois',
      classes: []
    },
    {
      key: '4',
      no: 4,
      name: 'Windmere Clubhouse',
      username: '@windmere_club',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Windmere&backgroundColor=059669',
      email: 'mfburgo@icloud.com',
      established: '12/06/2020',
      country: 'India',
      visibility: 'Private',
      status: 'Active',
      website: 'http://www.windmere.in',
      postcode: 'DEL 110',
      speciality: 'Contemporary Dance',
      manager: 'Raj Kumar',
      classes: []
    },
    {
      key: '5',
      no: 5,
      name: 'Silverwood Club',
      username: '@silverwood_club',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Silverwood&backgroundColor=c2410c',
      email: 'rbarreira@optonline.net',
      established: '28/10/2012',
      country: 'UK',
      visibility: 'Private',
      status: 'Active',
      website: 'http://www.silverwood.co.uk',
      postcode: 'LON SW1',
      speciality: 'Hip Hop Studio',
      manager: 'James Brown',
      classes: []
    },
    {
      key: '6',
      no: 6,
      name: 'Ashford Circle',
      username: '@ashford_circle',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Ashford&backgroundColor=ea580c',
      email: 'aschmitz@gmail.com',
      established: '07/05/2016',
      country: 'Russia',
      visibility: 'Private',
      status: 'Disable',
      website: 'http://www.ashford.ru',
      postcode: 'SPB 190',
      speciality: 'Modern Dance',
      manager: 'Igor Sokolov',
      classes: []
    },
    {
      key: '7',
      no: 7,
      name: 'Stonegate Society',
      username: '@stonegate_society',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Stonegate&backgroundColor=1e40af',
      email: 'crobles@icloud.com',
      established: '18/09/2016',
      country: 'China',
      visibility: 'Private',
      status: 'Active',
      website: 'http://www.stonegate.cn',
      postcode: 'BEJ 100',
      speciality: 'Traditional Dance',
      manager: 'Li Wei',
      classes: []
    },
    {
      key: '8',
      no: 8,
      name: 'Brookfield League',
      username: '@brookfield_league',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Brookfield&backgroundColor=dc2626',
      email: 'camenisch@yahoo.ca',
      established: '15/08/2017',
      country: 'China',
      visibility: 'Private',
      status: 'Active',
      website: 'http://www.brookfield.cn',
      postcode: 'SHA 200',
      speciality: 'Jazz Dance',
      manager: 'Chen Ming',
      classes: []
    },
    {
      key: '9',
      no: 9,
      name: 'Elmhurst Alliance',
      username: '@elmhurst_alliance',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Elmhurst&backgroundColor=65a30d',
      email: 'camenisch@yahoo.ca',
      established: '07/05/2016',
      country: 'Russia',
      visibility: 'Private',
      status: 'Active',
      website: 'http://www.elmhurst.ru',
      postcode: 'MSK 105',
      speciality: 'Street Dance',
      manager: 'Dmitri Volkov',
      classes: []
    },
    {
      key: '10',
      no: 10,
      name: 'Harbourstone Union',
      username: '@harbourstone_union',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Harbourstone&backgroundColor=b91c1c',
      email: 'camenisch@yahoo.ca',
      established: '16/08/2013',
      country: 'Russia',
      visibility: 'Private',
      status: 'Disable',
      website: 'http://www.harbourstone.ru',
      postcode: 'KZN 420',
      speciality: 'Latin Dance',
      manager: 'Olga Ivanova',
      classes: []
    },
  ];

 

 
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow">
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{
            pageSize: 10,
            total: 100
          }}
        />
      </div>

      <ClubModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} selectedClub={selectedClub} />
      
    </div>
  );
};

export default ClubsTable;