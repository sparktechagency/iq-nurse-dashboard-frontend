import { useState } from "react";
import { useParams } from "react-router-dom";
import { Table,  Space } from "antd";
import HeaderTitle from "../../../../components/shared/HeaderTitle";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { FlashCategoryData } from "../../../../demo-data/flashcard-data";
import AddCardInfoModal from "./AddCardInfoModal";
import CardDetailsModal from "./CardDetailsModal";

const FlashcardList = () => {
  const { category } = useParams<{ category: string }>();
  const [open, setOpen] = useState(false); 
  const [addCardInfoOpen, setCardInfoOpen] = useState(false);

  const columns = [
    {
      title: "Front Title",
      dataIndex: "frontTitle",
      key: "frontTitle",
      render: (text: string) => <span className="font-medium text-[#003877]">{text}</span>,
    },
    {
      title: "Hint Description",
      dataIndex: "hint",
      key: "hint",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Back Description",
      dataIndex: "backDescription",
      key: "backDescription",
      render: (text: string) => (
        <span className="text-gray-600">{text.length > 50 ? `${text.slice(0, 50)}...` : text}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
            <EyeOutlined className="text-blue-500 hover:text-blue-700 cursor-pointer text-lg" onClick={()=>setCardInfoOpen(true)}/>
            <EditOutlined className="text-green-500 hover:text-green-700 cursor-pointer text-lg" onClick={()=>setOpen(true)} />
            <DeleteOutlined className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <HeaderTitle title={`List of ${category}`} />
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 text-white bg-[#003877] border-0 h-[45px] px-6 rounded font-medium"
            onClick={() => setOpen(true)}
          >
            <PlusOutlined />
            <span>Add Card</span>
          </button>
        </div>
      </div>

      <Table
        dataSource={FlashCategoryData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        className=""
      /> 
      <AddCardInfoModal open={open} setOpen={setOpen} /> 
      <CardDetailsModal open={addCardInfoOpen} onCancel={() => setCardInfoOpen(false)} />
    </div>
  );
};

export default FlashcardList;
