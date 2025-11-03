'use client';

import { useState } from 'react';
import { Plus, X, Play, ImageIcon } from 'lucide-react';
import { Button } from 'antd';

interface Media {
    id: string;
    type: 'video' | 'image';
    url: string;
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
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaTitle, setMediaTitle] = useState('');

    const handleAddMedia = () => {
        if (mediaUrl.trim()) {
            onAdd({
                id: `media-${Date.now()}`,
                type: mediaType,
                url: mediaUrl,
                title: mediaTitle,
            });
            setMediaUrl('');
            setMediaTitle('');
            setIsAddingMedia(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Button onClick={() => setIsAddingMedia(!isAddingMedia)} size="small">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Media
                </Button>
            </div>

            {isAddingMedia && (
                <div className="p-4 border border-border rounded-lg bg-muted/50 space-y-3">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setMediaType('video')}
                            className={`px-3 py-1 text-sm rounded border ${
                                mediaType === 'video'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'border-border'
                            }`}
                        >
                            <Play className="w-3 h-3 inline mr-1" />
                            Video
                        </button>
                        <button
                            onClick={() => setMediaType('image')}
                            className={`px-3 py-1 text-sm rounded border ${
                                mediaType === 'image'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'border-border'
                            }`}
                        >
                            <ImageIcon className="w-3 h-3 inline mr-1" />
                            Image
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Media URL"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded bg-background text-foreground placeholder:text-muted-foreground"
                    />
                    <input
                        type="text"
                        placeholder="Title (optional)"
                        value={mediaTitle}
                        onChange={(e) => setMediaTitle(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded bg-background text-foreground placeholder:text-muted-foreground"
                    />
                    <div className="flex gap-2">
                        <Button size="small" onClick={handleAddMedia} className="flex-1">
                            Add
                        </Button>
                        <Button size="small"  onClick={() => setIsAddingMedia(false)} className="flex-1">
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                {media?.map((m, index) => (
                    <div key={index} className="border border-border rounded-lg overflow-hidden">
                        {m.type === 'video' ? (
                            <div className="aspect-video bg-muted flex items-center justify-center">
                                <Play className="w-8 h-8 text-muted-foreground" />
                            </div>
                        ) : (
                            <img
                                src={m.url || '/placeholder.svg'}
                                alt={m.title || 'Media'}
                                className="w-full aspect-square object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/abstract-colorful-swirls.png';
                                }}
                            />
                        )}
                        <div className="p-3">
                            <div className="flex items-start justify-between gap-2">
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
                    </div>
                ))}
            </div>
        </div>
    );
}
