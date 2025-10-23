import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { categories, Category } from '../../../demo-data/patient-assessment';
import AddPatientAssessmentModal from './AddPatientAssessmentModal';
import UpdatePatientAssessmentModal from './UpdatePatientAssessmentModal';

const PatientAssessment: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories[0]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="">
            {/* Main Content */}
            <div className="">
                {/* Content */}
                <div className="">
                    {!selectedCategory ? (
                        // Categories Grid View
                        <div>
                            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category)}
                                        className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl flex-shrink-0 transition-all ${
                                            category.id === '1' ? 'bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    >
                                        <img src={category.icon} alt="" className="w-8" />
                                    </button>
                                ))}
                            </div>

                            <div className="text-center py-20 text-gray-400">
                                <p className="text-lg">Select a category to view assessment details</p>
                            </div>
                        </div>
                    ) : (
                        // Assessment Detail View
                        <div>
                            <div className='flex justify-between items-center'>
                                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategoryClick(category)}
                                            className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl flex-shrink-0 transition-all ${
                                                selectedCategory.id === category.id
                                                    ? 'bg-primary'
                                                    : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                        >
                                            <img src={category.icon} alt="" className="w-8" />
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-end mb-6 gap-3">
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        className="!bg-primary hover:!bg-primary border-0 h-10"
                                        onClick={() => setIsAddModalVisible(true)}
                                    >
                                        Add Category
                                    </Button>
                                    <Button
                                        type="default"
                                        className="!bg-yellow-400 hover:!bg-yellow-500 !text-white border-0 h-10"
                                        onClick={() => setIsUpdateModalVisible(true)}
                                    >
                                        Update Category
                                    </Button>
                                    <Button
                                        type="default"
                                        danger
                                        className="!bg-red-500 hover:!bg-red-600 !text-white border-0 h-10"
                                        onClick={() => setIsDeleteModalVisible(true)}
                                    >
                                        Delete Category
                                    </Button>
                                </div>
                            </div>

                            <div className="flex md:flex-row flex-col gap-6">
                                {/* Left Side - Visualization Card */}
                                <Card className="border border-gray-200 !p-0 shadow-sm  md:w-[30%] w-full rounded-xl">
                                    <img src={selectedCategory.image} alt={selectedCategory.name} className="w-full" />
                                </Card>

                                {/* Right Side - Information */}
                                <div className="space-y-6 md:w-[70%] w-full ">
                                    <Card className="border !w-full border-gray-200 shadow-sm rounded-xl">
                                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                            {selectedCategory.description}
                                        </p>

                                        <div className="border border-blue-500 rounded-lg overflow-hidden">
                                            <div className="bg-blue-50 px-4 py-3 border-b border-blue-500">
                                                <h3 className="font-semibold text-gray-800">Expected Findings</h3>
                                            </div>

                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                                                Assessment
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                                                Normal
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                                                                Abnormal
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedCategory.syndromes.asessment.map((assessment, idx) => (
                                                            <tr className="border-b" key={idx}>
                                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                                    {assessment}
                                                                </td>
                                                                <td className="px-4 py-3 text-sm text-green-600">
                                                                    {selectedCategory.syndromes.normal[idx]}
                                                                </td>
                                                                <td className="px-4 py-3 text-sm text-red-600">
                                                                    {selectedCategory.syndromes.abnormal[idx]}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-700">
                                                <strong>Clinical Note:</strong> {selectedCategory.note}
                                            </p>
                                        </div>
                                    </Card>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                               
                </div>
            </div>
            <AddPatientAssessmentModal visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} onSubmit={(data)=>console.log(data)} />
            <UpdatePatientAssessmentModal
                visible={isUpdateModalVisible}
                onCancel={() => setIsUpdateModalVisible(false)}
                onSubmit={(data) => console.log(data)}
                initialData={selectedCategory}
            />
            <Modal
                title={<span className="text-lg font-semibold text-red-600">Delete Category</span>}
                open={isDeleteModalVisible}
                onCancel={() => setIsDeleteModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="delete" type="primary" danger onClick={() => {
                        // handle delete logic here
                        setIsDeleteModalVisible(false);
                    }}>
                        Delete
                    </Button>
                ]}
                width={400}
                zIndex={1100}
                centered
            >
                <div className="py-6 text-center">
                    <p className="text-lg text-gray-700 mb-4">Are you sure you want to delete this category?</p>
                    <p className="text-sm text-gray-500">This action cannot be undone.</p>
                </div>
            </Modal>
        </div>
    );
};

export default PatientAssessment;
