
import { TSidebarItem } from './generateSidebarItems';
import { LuClipboardList } from 'react-icons/lu';
import { TbBook } from 'react-icons/tb';


const sidebarItems: TSidebarItem[] = [
    {
        key: 'client-list',
        label: 'Dashboard',
        path: '',
        icon: "/icons/analtycs.png",
    },
    {
        key: 'users',
        label: 'Users',
        path: 'users',
        icon: "/icons/users.png",
    },
    {
        key: 'package',
        label: 'Package',
        path: 'package',
        icon:"/icons/package.png", 
    },
    {
        key: 'study-notes',
        label: 'Study Notes',
        path: 'study-notes',
        icon: "/icons/study-notes.png",
    },
    {
        key: 'patient-assessment',
        label: 'Patient Assessment',
        path: 'patient-assessment',
        icon: "/icons/assessment.png",
    },
    {
        key: 'clinical-skills',
        label: 'Clinical Skills',
        path: 'clinical-skills',
        icon: "/icons/clinical-skill.png",
    },
    {
        key: 'templates',
        label: 'Templates',
        path: 'templates',
        icon: "/icons/templates.png",
    },
    {
        key: 'quiz',
        label: 'Quiz',
        path: 'quiz',
        icon: "/icons/quiz.png",
    },
    {
        key: 'flashcards',
        label: 'Flashcards',
        path: 'flashcards',
        icon: "/icons/flashcard.png",
    },
    {
        key: 'settings',
        label: 'Settings',
        path: 'settings',
        icon: "/icons/setting.png",
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
