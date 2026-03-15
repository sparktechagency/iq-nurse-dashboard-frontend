import { Button, Space } from 'antd';
import { PlusOutlined, FileAddOutlined, DownloadOutlined } from '@ant-design/icons';
import { ViewMode } from '../types';
import HeaderTitle from '../../../../components/shared/HeaderTitle';

interface FlashcardToolbarProps {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    onAddNew: () => void;
    onBulkAdd: () => void;
    onExport?: () => void; // optional for now
}

export default function FlashcardToolbar({
    viewMode,
    setViewMode,
    onAddNew,
    onBulkAdd,
    onExport,
}: FlashcardToolbarProps) {
    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <HeaderTitle title="Flashcard Management" />

                <Space>
                    <div className='border-2 rounded-lg p-1 flex items-center gap-2'>
                        <Button
                            type={viewMode === 'categories' ? 'primary' : 'default'}
                            onClick={() => setViewMode('categories')}
                            style={{ height: 38 }}
                        >
                            Category View
                        </Button>
                        <Button
                            type={viewMode === 'table' ? 'primary' : 'default'}
                            onClick={() => setViewMode('table')}
                            style={{ height: 38 }}
                        >
                            Table View
                        </Button>
                    </div>

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={onAddNew}
                        style={{ height: 42 }}
                    >
                        Add Flashcard
                    </Button>

                    <Button
                        icon={<FileAddOutlined />}
                        onClick={onBulkAdd}
                        style={{ height: 42 }}
                    >
                        Bulk Add
                    </Button>

                    {onExport && (
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={onExport}
                        >
                            Export
                        </Button>
                    )}
                </Space>
            </div>
        </div>
    );
}