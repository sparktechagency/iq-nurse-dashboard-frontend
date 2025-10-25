import { useState } from 'react'; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; 
import {  Select, Card } from 'antd';
import { earningsData } from '../../../demo-data/home-data';
const { Option } = Select;
const TotalEarning = () => {
    const [selectedYear, setSelectedYear] = useState<string>('2025');
    return (
        <div>
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
                                backgroundColor: '#f5f5f5',
                                color: 'white !important',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px'
                            }}
                            labelStyle={{ color: '#c61f1f' }}
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
        </div>
    );
};

export default TotalEarning;