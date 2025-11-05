'use client';

import { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { Plus, X } from 'lucide-react';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';

interface VideoSectionProps {
    videoUrl: string;
    onVideoUrlChange: (url: string) => void;
}

export function VideoSection({ videoUrl, onVideoUrlChange }: VideoSectionProps) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const beforeUpload = (file: RcFile) => {
        if (!file.type.startsWith('video/')) {
            message.error('Please upload a valid video file');
            return Upload.LIST_IGNORE;
        }
        const url = URL.createObjectURL(file);
        onVideoUrlChange(url);
        setFileList([file]);
        return false; // prevent auto-upload
    };

    const handleRemove = () => {
        setFileList([]);
        onVideoUrlChange('');
    };

    return (
        <div className="space-y-4">
            {/* Upload Input */}
            <div>
                <label className="text-sm font-medium">Upload Video</label>

                <Upload
                    accept="video/*"
                    beforeUpload={beforeUpload}
                    onRemove={handleRemove}
                    fileList={fileList}
                    onChange={({ fileList: newList }) => setFileList(newList)}
                    listType="picture-card"
                    maxCount={1}
                    showUploadList={false} // hide default AntD file list
                >
                    {!videoUrl && (
                        <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-lg cursor-pointer">
                            <Plus className="w-4 h-4" />
                            <div className="text-xs mt-1">Select Video</div>
                        </div>
                    )}
                </Upload>
            </div>

            {/* Video Preview */}
            {videoUrl && (
                <div className="relative mt-4">
                    <button
                        onClick={handleRemove}
                        className="absolute top-1 right-1 bg-white text-red-600 rounded-full p-1 shadow-lg z-10"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <video src={videoUrl} controls className="rounded-lg w-full aspect-video object-top" height={300} />
                </div>
            )}
        </div>
    );
}
