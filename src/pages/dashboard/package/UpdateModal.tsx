import { Button, Input, InputNumber, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
interface FormData {
    title: string;
    billingCycle: string;
    price: number;
    frequency: string;
}
interface SubscriptionPlan {
    id: string;
    title: string;
    billingCycle: string;
    price: number;
    frequency: string;
}










export default function UpdateModal({
    isEditModalVisible,
    setIsEditModalVisible,
    setSelectedPlan,
    selectedPlan,
}: {
    isEditModalVisible: boolean;
    setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedPlan: SubscriptionPlan | null;
    setSelectedPlan: React.Dispatch<React.SetStateAction<SubscriptionPlan | null>>;
}) {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        billingCycle: "",
        price: 0,
        frequency: "",
    });

    useEffect(() => {
        if (selectedPlan) {
            setFormData({
                title: selectedPlan.title,
                billingCycle: selectedPlan.billingCycle,
                price: selectedPlan.price,
                frequency: selectedPlan.frequency,
            });
        }
    },[selectedPlan]);
    const updateFormField = (field: keyof FormData, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleEditSubmit = () => {
        console.log(formData);
        setIsEditModalVisible(false);
        setSelectedPlan(null);
        
    }
    return (
        <Modal
            title={<span className="text-lg font-semibold">Edit Subscription Plan</span>}
            open={isEditModalVisible}
            onCancel={() => {
                setIsEditModalVisible(false);
                setSelectedPlan(null);
            }}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => {
                        setIsEditModalVisible(false);
                        setSelectedPlan(null);
                    }}
                >
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleEditSubmit} className="!bg-primary">
                    Save Changes
                </Button>,
            ]}
            width={500}
        >
            <div className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plan Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                        placeholder="e.g., Monthly, Yearly"
                        value={formData.title}
                        onChange={(e) => updateFormField('title', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Billing Cycle <span className="text-red-500">*</span>
                    </label>
                    <Input
                        placeholder="e.g., Billed monthly"
                        value={formData.billingCycle}
                        onChange={(e) => updateFormField('billingCycle', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                    </label>
                    <InputNumber
                        className="w-full"
                        placeholder="0.00"
                        min={0}
                        precision={2}
                        prefix="$"
                        value={formData.price}
                        onChange={(value) => updateFormField('price', value || 0)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency <span className="text-red-500">*</span>
                    </label>
                    <Input
                        placeholder="e.g., Annually, Monthly"
                        value={formData.frequency}
                        onChange={(e) => updateFormField('frequency', e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
}
