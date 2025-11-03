import React, { useState } from 'react';
import { Table, Button, Modal, Pagination } from 'antd';
import { EyeOutlined, PlusOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import AddStudyNoteModal from './AddStudyNoteModal';
import UpdateStudyNoteModal from './UpdateStudyNoteModal';
import CategoryModal from './CategoryModal';


interface Category {
  id: string;
  name: string;
  subCategories: string[];
}

interface StudyNote {
  key: string;
  serialId: string;
  category: string;
  subCategory: string;
  image: string;
  video: string;
  concept: string;
}

const StudyNotes: React.FC = () => {
  const [studyNotes, _] = useState<StudyNote[]>([
    { key: '1', serialId: '#01', category: 'Critical Care', subCategory: 'ICU Monitoring Protocols', image: '📷', video: '🎥', concept: 'Aneurysm (AAA) is a...' },
    { key: '2', serialId: '#02', category: 'Anatomy & Physiology', subCategory: 'Airway Management', image: '📷', video: '🎥', concept: 'Aneurysm (AAA) is a...' },
    { key: '3', serialId: '#03', category: 'Pharmacology', subCategory: 'Hemodynamic Support', image: '📷', video: '🎥', concept: 'Aneurysm (AAA) is a...' },
    { key: '4', serialId: '#04', category: 'Medication Calculation', subCategory: 'ARDS Management', image: '📷', video: '🎥', concept: 'Aneurysm (AAA) is a...' },
    { key: '5', serialId: '#05', category: 'Mental Health', subCategory: 'Shock Protocols', image: '📷', video: '🎥', concept: 'Aneurysm (AAA) is a...' },
  ]);

  const [categories, __] = useState<Category[]>([
    { id: '1', name: 'Critical Care', subCategories: ['ICU Monitoring Protocols', 'Emergency Procedures'] },
    { id: '2', name: 'Anatomy & Physiology', subCategories: ['Airway Management', 'Cardiovascular System'] },
    { id: '3', name: 'Pharmacology', subCategories: ['Hemodynamic Support', 'Pain Management'] },
    { id: '4', name: 'Medication Calculation', subCategories: ['ARDS Management', 'Dosage Calculations'] },
    { id: '5', name: 'Mental Health', subCategories: ['Shock Protocols', 'Crisis Intervention'] },
    { id: '6', name: 'Fundamentals', subCategories: ['Shock Protocols', 'Basic Nursing Skills'] },
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const [isAddSubCategoryModalVisible, setIsAddSubCategoryModalVisible] = useState(false);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false);
  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);
  const [isVideoPreviewVisible, setIsVideoPreviewVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  
  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);
  const [___, setSelectedCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    subCategory: '',
    selectedCategory: '',
    categoryImage: '',
  });

  const columns = [
    {
      title: 'Serial ID',
      dataIndex: 'serialId',
      key: 'serialId',
      width: 100,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      responsive: ['md'] as any,
    },
    {
      title: 'Sub-category',
      dataIndex: 'subCategory',
      key: 'subCategory',
      responsive: ['lg'] as any,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      responsive: ['sm'] as any,
      render: (text: string) => (
        <Button
          type="link"
          className="text-xl p-0"
          onClick={() => {
            setPreviewContent('https://via.placeholder.com/600x400');
            setIsImagePreviewVisible(true);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'Video',
      dataIndex: 'video',
      key: 'video',
      width: 80,
      responsive: ['sm'] as any,
      render: (text: string) => (
        <Button
          type="link"
          className="text-xl p-0"
          onClick={() => {
            setPreviewContent('https://www.w3schools.com/html/mov_bbb.mp4');
            setIsVideoPreviewVisible(true);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'Concept',
      dataIndex: 'concept',
      key: 'concept',
      responsive: ['md'] as any,
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_: any, record: StudyNote) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          className="text-gray-500 hover:text-blue-500"
          onClick={() => {
            setSelectedNote(record);
            setIsViewModalVisible(true);
          }}
        />
      ),
    },
  ];

  const categoryColumns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sub-categories',
      dataIndex: 'subCategories',
      key: 'subCategories',
      render: (subCategories: string[]) => subCategories.join(', '),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Category) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-gray-500 hover:text-blue-500"
            onClick={() => {
              setSelectedCategory(record);
              setCategoryFormData({
                name: record.name,
                subCategory: '',
                selectedCategory: '',
                categoryImage: '',
              });
              setIsEditCategoryModalVisible(true);
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="text-gray-500 hover:text-red-500"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="">
      {/* Sidebar */}


      {/* Main Content */}
      <div className="">

        {/* Content */}
        <div className="">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Study Notes</h2>
              <div className="flex gap-3">
                <Button
                  className="bg-blue-100 text-blue-600 border-0 hover:bg-blue-200"
                  onClick={() => setIsCategoryModalVisible(true)}
                >
                  Categories
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="!bg-primary"
                  onClick={() => setIsAddModalVisible(true)}
                >
                  Add StudyNotes
                </Button>
              </div>
            </div>

            <Table
              columns={columns}
              dataSource={studyNotes}
              pagination={false}
              scroll={{ x: 800 }}
            />

            <div className="flex justify-end mt-4">
              <Pagination
                current={currentPage}
                total={50}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Study Note Modal */}
      <AddStudyNoteModal
      categories={categories}
      isAddModalVisible={isAddModalVisible}
      setIsAddModalVisible={setIsAddModalVisible}
      />
      {/* View Study Note Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Study Note Details</span>}
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="edit"
            type="primary"
            className="bg-blue-600"
            onClick={() => {
              setIsViewModalVisible(false);
              setIsEditModalVisible(true);
            }}
          >
            Edit
          </Button>,
        ]}
        width={700}
        zIndex={1000}
      >
        {selectedNote && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">Serial ID:</label>
                <p className="text-gray-600">{selectedNote.serialId}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Category:</label>
                <p className="text-gray-600">{selectedNote.category}</p>
              </div>
            </div>
            <div>
              <label className="font-medium text-gray-700">Sub-category:</label>
              <p className="text-gray-600">{selectedNote.subCategory}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Concept:</label>
              <p className="text-gray-600">{selectedNote.concept}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Study Note Modal */}
      <UpdateStudyNoteModal
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        selectedNote={selectedNote}
        categories={categories}
      />

     <CategoryModal
        isCategoryModalVisible={isCategoryModalVisible}
        setIsCategoryModalVisible={setIsCategoryModalVisible}
        isAddCategoryModalVisible={isAddCategoryModalVisible}
        setIsAddCategoryModalVisible={setIsAddCategoryModalVisible}
        isAddSubCategoryModalVisible={isAddSubCategoryModalVisible}
        setIsAddSubCategoryModalVisible={setIsAddSubCategoryModalVisible}
        isEditCategoryModalVisible={isEditCategoryModalVisible}
        setIsEditCategoryModalVisible={setIsEditCategoryModalVisible}
        categoryFormData={categoryFormData}
        setCategoryFormData={setCategoryFormData}
        categories={categories}
        categoryColumns={categoryColumns}
      />
      {/* Image Preview Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Image Preview</span>}
        open={isImagePreviewVisible}
        onCancel={() => setIsImagePreviewVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsImagePreviewVisible(false)}>
            Close
          </Button>,
        ]}
        width={700}
        zIndex={1050}
      >
        <div className="py-4 flex justify-center">
          <img src={previewContent} alt="Preview" className="max-w-full h-auto rounded-lg" />
        </div>
      </Modal>

      {/* Video Preview Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Video Preview</span>}
        open={isVideoPreviewVisible}
        onCancel={() => setIsVideoPreviewVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsVideoPreviewVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
        zIndex={1050}
      >
        <div className="py-4">
          <video src={previewContent} controls className="w-full rounded-lg" />
        </div>
      </Modal>
    </div>
  );
};

export default StudyNotes;