import { Button, Modal } from "antd";

const DeletePatientAssessment = ({ isDeleteModalVisible, setIsDeleteModalVisible }: { isDeleteModalVisible: boolean; setIsDeleteModalVisible: (visible: boolean) => void; }) => {
    return (
        <div>
                 <Modal
                title={<span className="text-lg font-semibold text-red-600">Delete Category</span>}
                open={isDeleteModalVisible}
                onCancel={() => setIsDeleteModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="delete" type="primary" danger onClick={() => { setIsDeleteModalVisible(false) }}>
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

export default DeletePatientAssessment;