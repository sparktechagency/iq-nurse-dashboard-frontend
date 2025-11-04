'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Upload, Button, message } from 'antd';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import PrimaryButton from '../../../components/shared/PrimaryButton';

interface Media {
    id: string;
    type: 'video' | 'image';
    file: File;
    preview: string;
    title?: string;
}

interface MediaManagerProps {
    media: Media[];
    onAdd: (media: Media) => void;
    onRemove: (index: number) => void;
}

export default function MediaManager({ media, onAdd, onRemove }: MediaManagerProps) {
    const [isAddingMedia, setIsAddingMedia] = useState(false);
    const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [mediaTitle, setMediaTitle] = useState('');

    const beforeUpload = (file: RcFile) => {
        const isValidType =
            (mediaType === 'image' && file.type.startsWith('image/')) ||
            (mediaType === 'video' && file.type.startsWith('video/'));

        if (!isValidType) {
            message.error(`Please upload a valid ${mediaType} file`);
        }
        return isValidType || Upload.LIST_IGNORE;
    };

    const handleAddMedia = () => {
        if (fileList.length === 0) {
            message.error('Please select a file first.');
            return;
        }

        fileList.forEach((f) => {
            const file = f.originFileObj as File;
            const preview = URL.createObjectURL(file);

            onAdd({
                id: `media-${Date.now()}-${f.uid}`,
                type: mediaType,
                file,
                preview,
                title: mediaTitle,
            });
        });

        setFileList([]);
        setMediaTitle('');
        setIsAddingMedia(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <PrimaryButton
                    icon={<Plus className="w-4 h-4 mr-2" />}
                    onClick={() => setIsAddingMedia(!isAddingMedia)}
                    children="Add Media"
                    width={'auto'}
                />
            </div>

            {isAddingMedia && (
                <div className="p-4 border border-border rounded-lg bg-muted/50 space-y-3">
                    <div className="flex gap-2 mb-2">
                        <Button
                            type={mediaType === 'video' ? 'primary' : 'default'}
                            onClick={() => setMediaType('video')}
                        >
                            Video
                        </Button>
                        <Button
                            type={mediaType === 'image' ? 'primary' : 'default'}
                            onClick={() => setMediaType('image')}
                        >
                            Image
                        </Button>
                    </div>

                    <Upload
                        beforeUpload={beforeUpload}
                        onRemove={(file) => setFileList((prev) => prev.filter((f) => f.uid !== file.uid))}
                        fileList={fileList}
                        onChange={({ fileList: newList }) => setFileList(newList)}
                        listType="picture-card"
                        maxCount={1}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Plus />
                            <div className="text-xs mt-1">Select {mediaType}</div>
                        </div>
                    </Upload>

                    <input
                        type="text"
                        placeholder="Title (optional)"
                        value={mediaTitle}
                        onChange={(e) => setMediaTitle(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded bg-background text-foreground placeholder:text-muted-foreground"
                    />

                    <div className="flex gap-2">
                        <Button type="primary" onClick={handleAddMedia} className="flex-1">
                            Add
                        </Button>
                        <Button onClick={() => setIsAddingMedia(false)} className="flex-1">
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                {media?.map((m, index) => (
                    <div key={index} className="border border-border rounded-lg overflow-hidden">
                        {m.type === 'video' ? (
                            <video src={m.preview} controls className="w-full aspect-video object-cover bg-black" />
                        ) : (
                            <img
                                src={m.preview}
                                alt={m.title || 'Media'}
                                className="w-full aspect-square object-cover"
                            />
                        )}
                        <div className="p-3 flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-muted-foreground truncate">
                                    {m.type.toUpperCase()}
                                </p>
                                {m.title && <p className="text-sm font-medium truncate mt-1">{m.title}</p>}
                            </div>
                            <button
                                onClick={() => onRemove(index)}
                                className="p-1 hover:bg-destructive/20 rounded text-muted-foreground hover:text-destructive flex-shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
