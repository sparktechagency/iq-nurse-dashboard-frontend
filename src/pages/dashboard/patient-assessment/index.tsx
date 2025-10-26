import React, { useState } from 'react';
import { categories, Category } from '../../../demo-data/patient-assessment';
import AddPatientAssessmentModal from './AddPatientAssessmentModal';
import UpdatePatientAssessmentModal from './UpdatePatientAssessmentModal';
import DeletePatientAssessment from './DeletePatientAssessment';
import AssessmentDetails from './AssessmentDetails';

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
            <div className="">
                <div className="">
                {!selectedCategory ? (
                        <div>
                            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category)}
                                        className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl flex-shrink-0 transition-all ${category.id === '1' ? 'bg-blue-600' : 'bg-gray-200 hover:bg-gray-300'
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
                     <AssessmentDetails categories={categories} selectedCategory={selectedCategory} setIsAddModalVisible={setIsAddModalVisible} setIsUpdateModalVisible={setIsUpdateModalVisible} setIsDeleteModalVisible={setIsDeleteModalVisible}  handleCategoryClick={handleCategoryClick} />
                    )
                    }

                </div>
            </div>
            <AddPatientAssessmentModal visible={isAddModalVisible} onCancel={() => setIsAddModalVisible(false)} onSubmit={(data) => console.log(data)} />
            <UpdatePatientAssessmentModal
                visible={isUpdateModalVisible}
                onCancel={() => setIsUpdateModalVisible(false)}
                onSubmit={(data) => console.log(data)}
                initialData={selectedCategory}
            />
      <DeletePatientAssessment  
      isDeleteModalVisible={isDeleteModalVisible} 
       setIsDeleteModalVisible={setIsDeleteModalVisible} 
        />
        </div>
    );
};

export default PatientAssessment;
