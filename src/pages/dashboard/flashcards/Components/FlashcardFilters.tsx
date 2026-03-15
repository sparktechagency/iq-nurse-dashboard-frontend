import { Input, Select, Space } from 'antd';
import { nursingCategories } from '../../../../demo-data/flashcard-data';
import { FiSearch } from 'react-icons/fi';
const { Option } = Select;

interface FlashcardFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
}

export default function FlashcardFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
}: FlashcardFiltersProps) {
  const currentSubcategories =
    nursingCategories.find(c => c.name === selectedCategory)?.subcategories || [];

  return (
    <Space direction="horizontal" size="middle" style={{ marginBottom: 24, width: '100%', flexWrap: 'wrap' }}>
      <Input
        placeholder="Search question or answer..."
        allowClear
        prefix={<FiSearch size={18} color='#969494' />}
        style={{ width: 320 , height: 42}}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <Select
        placeholder="All Categories"
        style={{ width: 240 , height: 42}}
        value={selectedCategory}
        onChange={v => {
          setSelectedCategory(v);
          setSelectedSubcategory('all');
        }}
        allowClear
      >
        <Option value="all">All Categories</Option>
        {nursingCategories.map(cat => (
          <Option key={cat.name} value={cat.name}>
            {cat.name}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="All Subcategories"
        style={{ width: 240 , height: 42}}
        value={selectedSubcategory}
        onChange={setSelectedSubcategory}
        disabled={selectedCategory === 'all'}
        allowClear
      >
        <Option value="all">All Subcategories</Option>
        {currentSubcategories.map(sub => (
          <Option key={sub} value={sub}>
            {sub}
          </Option>
        ))}
      </Select> 

      <Select
        placeholder="Date Range"
        style={{ width: 180, height: 42 }}
        // value={selectedDateRange}
        // onChange={v => setSelectedDateRange(v as string)}
        allowClear
      >
        <Option value="all">All Time</Option>
        <Option value="last7">Last 7 Days</Option>
        <Option value="last30">Last 30 Days</Option>
        <Option value="last90">Last 90 Days</Option>
        <Option value="thisMonth">This Month</Option>
        <Option value="lastMonth">Last Month</Option>
      </Select>
    </Space>
  );
}