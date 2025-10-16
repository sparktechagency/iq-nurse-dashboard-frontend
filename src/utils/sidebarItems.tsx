import { LiaThListSolid } from 'react-icons/lia';
import { TSidebarItem } from './generateSidebarItems';
import { LuClipboardList } from 'react-icons/lu';
import { TbBook, TbMessageCircleUser } from 'react-icons/tb';
import { FaRegUserCircle, FaUsers } from 'react-icons/fa';
import { PiUserList } from 'react-icons/pi';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'client-list',
        label: 'NDA',
        path: '',
        icon: <LuClipboardList  size={24} />,
    },
    {
        key: 'asset',
        label: 'Asset',
        path: 'asset',
        icon: <TbBook size={24} />,
    },
    {
        key: 'service-deck',
        label: 'Service Deck',
        path: 'service-deck',
        icon: <PiUserList size={24} />,
    },
    {
        key: 'training-material',
        label: 'Training Material',
        path: 'training-material',
        icon: <LiaThListSolid size={24} />,
    },
    {
        key: 'profile',
        label: 'Profile',
        path: 'profile',
        icon: <FaRegUserCircle size={24} />,
    },
    {
        key: 'Support',
        label: 'Support',
        path: 'support',
        icon: <TbMessageCircleUser   size={24} />,
    }
];

export default sidebarItems;
