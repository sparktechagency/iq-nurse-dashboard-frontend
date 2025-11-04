import MediaManager from '../../MediaManager';

interface MediaTabProps {
    media: any[];
    onAdd: (item: any) => void;
    onRemove: any;
}

const MediaTab = ({ media, onAdd, onRemove }: MediaTabProps) => {
    return <MediaManager media={media} onAdd={onAdd} onRemove={onRemove} />;
};

export default MediaTab;
