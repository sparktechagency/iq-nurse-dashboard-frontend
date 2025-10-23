import React, { useState } from 'react';
import {  Select, Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Users from '../users';

const { Option } = Select;



const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  const earningsData = [
    { month: 'Jan', value: 150 },
    { month: 'Feb', value: 120 },
    { month: 'Mar', value: 100 },
    { month: 'Apr', value: 90 },
    { month: 'May', value: 150 },
    { month: 'Jun', value: 250 },
    { month: 'Jul', value: 380 },
    { month: 'Aug', value: 550 },
    { month: 'Sep', value: 650 },
    { month: 'Oct', value: 600 },
    { month: 'Nov', value: 420 },
    { month: 'Dec', value: 280 },
  ];

 
  const StatCard: React.FC<{ icon: string; title: string; value: string;}> = ({ 
    icon, 
    title, 
    value, 

  }) => (
    <Card className="rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl`}>
          <img src={icon} alt="icon" className="w-8" />
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="">
      <div className="">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            icon="/icons/users.png"
            title="Total User"
            value="32k"

          />
          <StatCard 
            icon="/icons/earning.png"
            title="Total Earnings"
            value="68K"
          />
          <StatCard 
            icon="/icons/package.png"
            title="Total Subscribers"
            value="20K"
          />
          <StatCard 
            icon="/icons/study-notes.png"
            title="Total Templates"
            value="18K"

          />
        </div>

        {/* Chart */}
        <Card className="mb-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Total Earnings</h2>
            <Select 
              value={selectedYear} 
              onChange={setSelectedYear}
              className="w-24"
            >
              <Option value="2023">2023</Option>
              <Option value="2024">2024</Option>
              <Option value="2025">2025</Option>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#999"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#999"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                formatter={(value: number) => `$${value}`}
                contentStyle={{ 
                  backgroundColor: '#1e40af',
                  color: 'white !important',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px'
                }}
                labelStyle={{ color: 'white' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#1e40af" 
                strokeWidth={2}
                dot={{ fill: '#1e40af', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Users Table */}
        <Users dashboard/>
      </div>
    </div>
  );
};

export default App;