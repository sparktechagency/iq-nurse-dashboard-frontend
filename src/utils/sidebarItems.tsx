import { LiaThListSolid } from 'react-icons/lia';
import { TSidebarItem } from './generateSidebarItems';
import { LuClipboardList } from 'react-icons/lu';
import { TbBook } from 'react-icons/tb';
import { PiUserList } from 'react-icons/pi';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'client-list',
        label: 'Dashboard',
        path: '',
        icon: <LuClipboardList  size={24} />,
    },
    {
        key: 'users',
        label: 'Users',
        path: 'users',
        icon: <TbBook size={24} />,
    },
    {
        key: 'clubs-deck',
        label: 'Clubs Deck',
        path: 'clubs-deck',
        icon: <PiUserList size={24} />,
    },
    {
        key: 'training-material',
        label: 'Settings',
        path: 'training-material',
        icon: <LiaThListSolid size={24} />,
        children: [
            {
                key: 'about-us',
                label: 'About us',
                path: 'about-us',
                icon: <TbBook size={20} />,
            },
            {
                key: 'terms-of-service',
                label: 'Terms of Service',
                path: 'terms-of-service',
                icon: <LuClipboardList size={20} />,
            },
            {
                key: 'privacy-policy',
                label: 'Privacy Policy',
                path: 'privacy-policy',
                icon: <LuClipboardList size={20} />,
            },
            {
                key: 'disclaimer',
                label: 'Disclaimer',
                path: 'disclaimer',
                icon: <LuClipboardList size={20} />,
            },
        ],
    }
];

export default sidebarItems;
