"use client";
import { Modal, Typography } from "antd";
const { Text } = Typography;

const CardDetailsModal = ({ open, onCancel }: { open: boolean; onCancel: () => void }) => {
    const data = {
        frontTitle: "Head-to-Toe Assessment",
        backDescription: "An abdominal aortic aneurysm (AAA) is a condition in which the largest artery in the body — the aorta — bulges or enlarges. An aneurysm is defined as a dilation of an artery that increases its diameter by at least 50%. An abdominal aortic aneurysm typically occurs due to degeneration of the aortic wall, particularly the media, or middle layer of the artery. Risk factors include: smoking, peripheral arterial disease, coronary artery disease, hypertension, genetic factors, and chronic obstructive pulmonary disease (COPD). AAA develops when the abdominal aorta balloons outward because of weakening in the arterial wall. Potential complications include dissection and rupture.",
        hintDescription: "An abdominal aortic aneurysm (AAA) is a condition in which the largest artery in the body — the aorta — bulges or enlarges. An aneurysm is defined as a dilation of an artery that increases its diameter by at least 50%. An abdominal aortic aneurysm typically occurs due to degeneration of the aortic wall, particularly the media, or middle layer of the artery. Risk factors include: smoking, peripheral arterial disease, coronary artery disease, hypertension, genetic factors, and chronic obstructive pulmonary disease (COPD). AAA develops when the abdominal aorta balloons outward because of weakening in the arterial wall. Potential complications include dissection and rupture.",
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
                        : <span className=" ms-2">{data.frontTitle} </span> 
                    </Text>
                </div>

                {/* Back Description */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-4">
                        <Text className=" text-[16px] font-semibold text-[#4b4b4b]">
                           Back Description
                        </Text>
                        <Text className="text-[16px] text-[#6d6d6d]">:</Text>
                    </div>
                    <Text className="text-[16px] text-[#6d6d6d] ">
                        {data.backDescription}
                    </Text>
                </div> 

                {/* hint Description */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-4">
                        <Text className=" text-[16px] font-semibold text-[#4b4b4b]">
                           Hint Description
                        </Text>
                        <Text className="text-[16px] text-[#6d6d6d]">:</Text>
                    </div>
                    <Text className="text-[16px] text-[#6d6d6d] ">
                        {data.hintDescription}
                    </Text>
                </div>

            </div>
        </Modal>
    );
};

export default CardDetailsModal;