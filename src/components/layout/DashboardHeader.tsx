import { FiBell, FiMail } from "react-icons/fi";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function DashboardHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="bg-white border-b rounded-md border-gray-200 px-4 sm:px-6 py-4 mb-3" style={{ boxShadow: '0px 4px 4px 0px #00000029' }}>
      <div className="flex items-center justify-between gap-4">
        {/* Left section - Greeting */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Good <span className="text-orange-500 font-semibold">Morning</span>, Admin
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 hidden md:block">
            Here's everything you need to grow with BeTopiq.
          </p>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search */}
          <div className="hidden sm:flex items-center">
            {!searchOpen && (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <SearchOutlined className="h-5 w-5" />
              </button>
            )}
            {searchOpen && (
              <div className="flex items-center">
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="w-48 sm:w-64"
                  allowClear
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <FiBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Messages */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <FiMail className="h-5 w-5" />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center justify-center h-8 w-8 bg-teal-100 text-teal-600 rounded-full text-sm font-medium">
              A
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}