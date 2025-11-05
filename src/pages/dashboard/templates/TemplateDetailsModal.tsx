"use client";
import { Modal, Typography } from "antd";
const { Text } = Typography;

const TemplateDetailsModal = ({ open, onCancel }: { open: boolean; onCancel: () => void }) => {
    const data = {
        title: "Head-to-Toe Assessment",
        subtitle: "Comprehensive physical assessment form.",
        description: "An abdominal aortic aneurysm (AAA) is a condition in which the largest artery in the body — the aorta — bulges or enlarges. An aneurysm is defined as a dilation of an artery that increases its diameter by at least 50%. An abdominal aortic aneurysm typically occurs due to degeneration of the aortic wall, particularly the media, or middle layer of the artery. Risk factors include: smoking, peripheral arterial disease, coronary artery disease, hypertension, genetic factors, and chronic obstructive pulmonary disease (COPD). AAA develops when the abdominal aorta balloons outward because of weakening in the arterial wall. Potential complications include dissection and rupture. Dissection occurs when blood enters between the layers of the vessel wall, causing the vessel to bulge on one side. A rupture can lead to life-threatening internal bleeding. Common symptoms include abdominal pain, back pain, and a pulsating sensation near the belly button. Surgical repair is usually the recommended treatment.",
        pdfFiles: ["sample1.pdf", "sample2.pdf", "sample3.pdf"],
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            width={600}
        >
            <div className="space-y-3">
                {/* Title */}
                <div className="flex items-start gap-4">
                    <Text className="w-[120px] text-[16px] font-semibold text-[#4b4b4b]">
                        Title
                    </Text>
                    <Text className="text-[16px] text-[#6d6d6d]">
                        : <span className=" ms-2">{data.title} </span> 
                    </Text>
                </div>

                {/* Sub-title */}
                <div className="flex items-start gap-4">
                    <Text className="w-[120px] text-[16px] font-semibold text-[#4b4b4b]">
                        Sub-title
                    </Text>
                    <Text className="text-[16px] text-[#6d6d6d]">
                        : <span className=" ms-2">{data.subtitle} </span> 
                    </Text>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-4">
                        <Text className="w-[120px] text-[16px] font-semibold text-[#4b4b4b]">
                            Description
                        </Text>
                        <Text className="text-[16px] text-[#6d6d6d]">:</Text>
                    </div>
                    <Text className="text-[16px] text-[#6d6d6d] ">
                        {data.description}
                    </Text>
                </div>

                {/* PDF Files */}
                <div className="flex items-start gap-4">
                    <Text className="w-[120px] text-[16px] font-semibold text-[#4b4b4b]">
                        pdf Files
                    </Text>
                    <Text className="text-[16px] text-[#6d6d6d] ">
                        : <span className=" ms-2 underline"> {data.pdfFiles.join(", ")}</span> 
                    </Text>
                </div>
            </div>
        </Modal>
    );
};

export default TemplateDetailsModal;