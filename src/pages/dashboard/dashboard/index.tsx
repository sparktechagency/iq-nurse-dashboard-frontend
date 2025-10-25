
import { Card } from 'antd';
import Users from '../users';
import TotalEarning from './TotalEarning';

const App: React.FC = () => {

  const StatCard: React.FC<{ icon: string; title: string; value: string; }> = ({
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
    <div className=" pb-5">
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
        <TotalEarning />
        {/* Users Table */}
        <Users dashboard />
      </div>
    </div>
  );
};

export default App;