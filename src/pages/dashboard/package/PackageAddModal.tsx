import { Button, Input, InputNumber, Modal } from 'antd';
import React, {  useState } from 'react';
interface FormData {
    title: string;
    billingCycle: string;
    price: number;
    frequency: string;
}









export default function PackageAddModal({
    isAddModalVisible,
    setIsAddModalVisible
}: {
    isAddModalVisible: boolean;
    setIsAddModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        billingCycle: "",
        price: 0,
        frequency: "",
    });

   
    const updateFormField = (field: keyof FormData, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleAddSubmit = () => {
        if (!formData.title || !formData.billingCycle || !formData.price || !formData.frequency) {
          return;
        }
        
        

      };
  
    return (
        <Modal
                  title={<span className="text-lg font-semibold">Add Subscription Plan</span>}
                  open={isAddModalVisible}
                  onCancel={() => setIsAddModalVisible(false)}
                  footer={[
                    <Button key="cancel" onClick={() => setIsAddModalVisible(false)}>
                      Cancel
                    </Button>,
                    <Button 
                      key="submit" 
                      type="primary" 
                      onClick={handleAddSubmit}
                      className="!bg-primary"
                    >
                      Add Plan
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
