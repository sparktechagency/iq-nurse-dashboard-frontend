import { FiBell, } from "react-icons/fi";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import getNavbatItem from "../../data/getNavbarItems";
import { useLocation } from "react-router-dom";

export default function DashboardHeader() {

  const param = useLocation().pathname.split("/")[1];
  
  const keyItem = getNavbatItem(param!)?.label || "Dashboard";

  
  
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 " >
      <div className="flex items-center justify-between gap-4">
        {/* Left section - Greeting */}
        <div>
          <h1 className="text-xl sm:text-3xl text-[#425464]">
            {keyItem}
          </h1>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search */}
          <div className="hidden sm:flex items-center">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="!w-64 !rounded-lg !border !border-gray-300 !py-2 !px-3 bg-white focus:!shadow-none"
              allowClear={false}
              autoFocus
              style={{
                height: '40px',
                fontSize: '16px',
                backgroundColor: '#fff',
                borderColor: '#E5E7EB',
              }}
            />

          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <FiBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <img
              src="https://noman1.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAbdullah_Al_Noman.c5d6012f.jpg&w=640&q=75"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-semibold text-gray-900">Administrator</span>
              <span className="text-xs sm:text-sm text-gray-400">Super Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}