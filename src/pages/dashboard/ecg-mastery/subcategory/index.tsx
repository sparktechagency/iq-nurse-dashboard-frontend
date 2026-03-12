import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input, Modal } from 'antd';
import PrimaryButton from '../../../../components/shared/PrimaryButton';
import { DosageCalculationData } from '../../../../demo-data/dosage-calculation-data';
import HeaderTitle from '../../../../components/shared/HeaderTitle';
import { RiSearch2Line } from 'react-icons/ri';
import TopicList from './TopicList';
import TopicForm from './TopicForm';


export default function ECGMasteryCategoryPage() {
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);


    const handleAddTopic = (topic: any) => {
        if (!DosageCalculationData) return;
    };

    const handleUpdateTopic = () => {
        if (!DosageCalculationData) return;
    };

    return (
        <div className="flex flex-col ">
            <div className="flex items-center justify-between gap-4">
                <HeaderTitle title={"ECG Mastery Categories"} />

                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search"
                        style={{ width: 280, height: 40 }}
                        prefix={<RiSearch2Line size={22} color="#999a9e" />}
                    />
                    <PrimaryButton
                        icon={<Plus className="w-4 h-4" />}
                        onClick={() => {
                            setIsAddingTopic(true);
                            setEditingTopicId(null);
                        }}
                        children="New Topic"
                        width={'auto'}
                    />
                </div>


            </div>
            <Modal
                title={editingTopicId ? 'Edit Topic' : 'Add New Topic'}
                open={isAddingTopic}
                onCancel={() => {
                    setIsAddingTopic(false);
                    setEditingTopicId(null);
                }}
                footer={null}
                width={800}
                centered
                destroyOnClose
            >
                <div className="py-4">
                    <TopicForm
                        onSubmit={(topic) => {
                            if (editingTopicId) {
                                handleUpdateTopic();
                            } else {
                                handleAddTopic(topic);
                            }
                            setIsAddingTopic(false);
                            setEditingTopicId(null);
                        }}
                        onCancel={() => {
                            setIsAddingTopic(false);
                            setEditingTopicId(null);
                        }}
                        isEditing={!!editingTopicId}
                    />
                </div>
            </Modal>


            <TopicList
                subcategory={DosageCalculationData}
                selectedTopic={selectedTopic}
                onSelectTopic={(topicId) => {
                    setSelectedTopic(topicId);
                }} 
                setIsAddingTopic={setIsAddingTopic}
                onUpdateTopic={handleUpdateTopic}
                setEditingTopicId={setEditingTopicId}
                editingTopicId={editingTopicId}
            />
        </div>
    );
}
