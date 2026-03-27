import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Modal } from 'antd';
import TopicForm from './TopicForm';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import TopicList from './TopicList';
import { DosageCalculationData } from '../../../demo-data/dosage-calculation-data';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { RiSearch2Line } from 'react-icons/ri';

export default function DosageCalculationPage() {
    const navigate = useNavigate();
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    const handleAddTopic = () => {
        if (!DosageCalculationData) return;
    };

    const handleUpdateTopic = () => {
        if (!DosageCalculationData) return;
    };

    return (
        <div className="flex flex-col ">
            <div className="flex items-center justify-between gap-4">
                <HeaderTitle title={'Dosage Calculation'} />

                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search"
                        style={{ width: 280, height: 40 }}
                        prefix={<RiSearch2Line size={22} color="#999a9e" />}
                    />
                    <Button 
                        className="!h-[40px] !bg-orange-500 !text-white border-none" 
                        icon={<Plus className="w-4 h-4" />} 
                        onClick={() => navigate('/dosage-calculation/practice-questions')}
                    >
                        Practice Questions
                    </Button>
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
                        onSubmit={() => {
                            if (editingTopicId) {
                                handleUpdateTopic();
                            } else {
                                handleAddTopic();
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
