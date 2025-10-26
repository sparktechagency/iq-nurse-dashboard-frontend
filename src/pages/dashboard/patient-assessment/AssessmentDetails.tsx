
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; 
import { Category } from "../../../demo-data/patient-assessment";

const AssessmentDetails = ({ categories, selectedCategory, handleCategoryClick, setIsAddModalVisible, setIsUpdateModalVisible, setIsDeleteModalVisible }: { categories: Category[], selectedCategory: any, handleCategoryClick: any, setIsAddModalVisible: any, setIsUpdateModalVisible: any, setIsDeleteModalVisible: any}) => {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl flex-shrink-0 transition-all ${selectedCategory.id === category.id
                                ? 'bg-primary/70'
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
                                        {selectedCategory.syndromes.asessment.map((assessment:string, idx:number) => (
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
    );
};

export default AssessmentDetails;