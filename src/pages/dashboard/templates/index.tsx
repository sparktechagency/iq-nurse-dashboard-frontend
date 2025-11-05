"use client";
import { useState } from "react";
import HeaderTitle from "../../../components/shared/HeaderTitle";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Input, Select, Table } from "antd";
import { RiSearch2Line } from "react-icons/ri";
import { templateCategories, TemplateData } from "../../../demo-data/template-data";
import AddTemplateModal from "./AddTemplateModal";
import TemplateDetailsModal from "./TemplateDetailsModal";

const TemplatesPage = () => {
    const [open, setOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const columns = [
        {
            title: "Serial ID",
            dataIndex: "id",
            key: "id",
            render: (text: string) => <span className="text-[#003877] font-medium">{text}</span>,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Sub-title",
            dataIndex: "subtitle",
            key: "subtitle",
        },
        {
            title: "Action",
            key: "action",
            align: "center" as const,
            render: () => (
                <div className="flex justify-center gap-4 text-[18px] text-[#003877]">
                    <EyeOutlined className="cursor-pointer hover:text-[#1677ff]" onClick={() => setDetailsOpen(true)} />
                    <EditOutlined className="cursor-pointer text-[#faad14]" onClick={() => setOpen(true)} />
                    <DeleteOutlined className="cursor-pointer text-[#ff4d4f]" />
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <HeaderTitle title="Templates List" />
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search"
                        style={{ width: 280, height: 40 }}
                        prefix={<RiSearch2Line size={22} color="#999a9e" />}
                    />
                    <Select placeholder="Select category" className="w-[200px] h-10" size="large">
                        {templateCategories.map((cat) => (
                            <Select.Option key={cat.id} value={cat.name}>
                                {cat.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <button
                        className="flex items-center gap-2 text-white bg-[#003877] border-0 h-[40px] px-6 rounded font-medium"
                        onClick={() => setOpen(true)}
                    >
                        <PlusOutlined />
                        <span>Add Template</span>
                    </button>
                </div>
            </div>

            <div className="bg-white border rounded-lg shadow-sm">
                <Table
                    dataSource={TemplateData}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                    className="custom-table"
                />
            </div>
            <AddTemplateModal open={open} setOpen={setOpen} />
            <TemplateDetailsModal open={detailsOpen} onCancel={() => setDetailsOpen(false)} />
        </div>
    );
};

export default TemplatesPage;
