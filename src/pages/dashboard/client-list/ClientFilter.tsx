import { Input, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import { Calendar, Filter, Search } from 'lucide-react'

export default function ClientFilter({searchText, setSearchText, statusFilter, setStatusFilter, joinedFromFilter, setJoinedFromFilter}:{searchText:string, setSearchText:React.Dispatch<React.SetStateAction<string>>, statusFilter:string, setStatusFilter:React.Dispatch<React.SetStateAction<string>>, joinedFromFilter:string, setJoinedFromFilter:React.Dispatch<React.SetStateAction<string>>}) {
  return (
        <div className="flex flex-wrap gap-4 items-center"> 
            <div className="flex">
              <Input
                placeholder="Search by name, email, or ID"
                prefix={<Search className="w-4 h-4 text-gray-400" />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="rounded-full !text-sm"
                size="large"
              />
            </div>
            
            <Select
              placeholder="Status"
              suffixIcon={<Filter className="w-4 h-4" />}
              style={{ minWidth: 120}}
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              className='!text-sm '
              defaultValue={"Active"}
              
            >
              <Option value="Active">Active</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Suspend">Suspend</Option>
            </Select>

            <Select
              placeholder="Joined From"
              suffixIcon={<Calendar className="w-4 h-4" />}
              style={{ minWidth: 140 }}
              size="large"
              value={joinedFromFilter}
              onChange={setJoinedFromFilter}
              allowClear
            >
              <Option value="thisMonth">This Month</Option>
              <Option value="lastMonth">Last Month</Option>
              <Option value="last3Months">Last 3 Months</Option>
              <Option value="thisYear">This Year</Option>
            </Select>
          </div>
  )
}
