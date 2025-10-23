import React, { useState } from 'react';
import { Button, Card, Modal, } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';
import PackageAddModal from './PackageAddModal';

interface SubscriptionPlan {
  id: string;
  title: string;
  billingCycle: string;
  price: number;
  frequency: string;
}



const Packages: React.FC = () => {
  const plans = [
    {
      id: '1',
      title: 'Monthly',
      billingCycle: 'Billed monthly',
      price: 19.00,
      frequency: 'Annually',
    },
    {
      id: '2',
      title: 'Yearly',
      billingCycle: '$96.00 billed',
      price: 8.00,
      frequency: 'Annually',
    },
  ]

  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlan | null>(null);
  


  const showAddModal = () => {

    setIsAddModalVisible(true);
  };

  const showEditModal = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);

    setIsEditModalVisible(true);
  };

  const showDeleteModal = (plan: SubscriptionPlan) => {
    setPlanToDelete(plan);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (planToDelete) {
      // Delete functionality will be implemented here
      setIsDeleteModalVisible(false);
      setPlanToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setPlanToDelete(null);
  };




  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div></div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-blue-100 text-blue-600 border-0 hover:bg-blue-200 h-10 px-6"
            onClick={showAddModal}
          >
            Add Subscription
          </Button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className="rounded-lg shadow-sm border border-gray-200 bg-gray-50"
              bodyStyle={{ padding: '32px' }}
            >
              <div className="flex flex-col h-full">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {plan.title}
                  </h2>
                  <p className="text-sm text-gray-400">{plan.billingCycle}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-auto pb-32">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-primary">
                      ${plan.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 ml-1">/{plan.frequency}</span>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    className="flex-1 bg-primry hover:bg-blue-800 h-11 text-base"
                    onClick={() => showEditModal(plan)}
                  >
                    Edit Subscription
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    className="h-11 w-11 flex items-center justify-center"
                    onClick={() => showDeleteModal(plan)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Subscription Modal */}
        <PackageAddModal
          isAddModalVisible={isAddModalVisible}
          setIsAddModalVisible={setIsAddModalVisible}
          />

        {/* Edit Subscription Modal */}
      <UpdateModal
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        />

        {/* Delete Subscription Modal */}
        <Modal
          open={isDeleteModalVisible}
          onCancel={handleDeleteCancel}
          footer={null}
          closeIcon={<span className="text-gray-400 hover:text-gray-600 text-xl">×</span>}
          width={400}
          centered
        >
          <div className="text-center py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Delete Subscription</h2>
            <p className="text-gray-500 mb-8">
              Are You Sure You Want To Delete This Subscription Plan?
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={handleDeleteCancel}
                className="px-8 py-2 h-10 border border-gray-300 hover:border-gray-400"
              >
                No
              </Button>
              <Button 
                type="primary"
                danger
                onClick={handleDeleteConfirm}
                className="px-8 py-2 h-10 bg-red-500 hover:bg-red-600"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Packages;