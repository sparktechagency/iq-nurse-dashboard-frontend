import { Table, Image, Button, Space, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { RiSearch2Line } from "react-icons/ri";
import HeaderTitle from "../../../components/shared/HeaderTitle";
import BodySystemData from "../../../demo-data/body-system-data";
import { useNavigate } from "react-router-dom";

const BodySystem = () => {
const navigate = useNavigate();

  const columns = [
    {
      title: "Title & Category",
      dataIndex: "title",
      key: "title",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.categoryImg}
            alt="category"
            width={40}
            height={40}
            preview={false}
            className="rounded-md object-container"
          />
          <span className="font-medium text-gray-800">{record.title}</span>
        </div>
      ),
    },
    {
      title: "Logo",
      dataIndex: "logoImg",
      key: "logoImg",
      render: (img: string) => (
        <Image
          src={img}
          alt="logo"
          width={50}
          height={50}
          preview={false}
          className="rounded-md object-container"
        />
      ),
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (imgs: string[]) => (
        <Space>
          {imgs.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="system"
              width={45}
              height={45}
              preview={false}
              className="rounded-md object-container"
            />
          ))}
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <span className="text-gray-700 line-clamp-2 max-w-[300px]">{text}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions", 
      render: (_: any) => (
        <Space>
          <Button  onClick={() => navigate("/body-system/add-body-system")} icon={<EditOutlined />} type="primary" />
          <Button icon={<DeleteOutlined />} danger />
          <Button icon={<EyeOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <HeaderTitle title="Body System List" />
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search"
            style={{ width: 280, height: 40 }}
            prefix={<RiSearch2Line size={22} color="#999a9e" />}
          />
          <button className="flex items-center gap-2 text-white bg-[#003877] border-0 h-[45px] px-6 rounded font-medium" 
          onClick={() => navigate("/body-system/add-body-system")}>
            <PlusOutlined />
            <span>Add Topic</span>
          </button>
        </div>
      </div>

      <Table
        dataSource={BodySystemData}
        columns={columns}
        pagination={{ pageSize: 7 }}
        
      />
    </div>
  );
};

export default BodySystem;
