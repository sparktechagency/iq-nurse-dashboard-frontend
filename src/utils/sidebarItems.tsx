import { BsPatchQuestion } from 'react-icons/bs';
import { TSidebarItem } from './generateSidebarItems';
import { LuClipboardList } from 'react-icons/lu';

const sidebarItems: TSidebarItem[] = [
    {
        key: 'client-list',
        label: 'Analytics',
        path: '',
        icon: '/icons/analtycs.png',
    },
    {
        key: 'users',
        label: 'Users',
        path: 'users',
        icon: '/icons/users.png',
    },
    {
        key: 'package',
        label: 'Package',
        path: 'package',
        icon: '/icons/package.png',
    },
    {
        key: 'study-notes',
        label: 'Study Notes',
        path: 'study-notes',
        icon: '/icons/study-notes.png',
    },
    {
        key: 'dosage-calculation',
        label: 'Dosage Calculation',
        path: 'dosage-calculation',
        icon: '/icons/dosage-calculation.png',
    },
    {
        key: 'diagnostic-tests',
        label: 'Diagnostic Tests & Laboratory',
        path: 'diagnostic-tests',
        icon: '/icons/diagnostic.png',
    },
    {
        key: 'ecg-mastery',
        label: 'ECG Mastery',
        path: 'ecg-mastery',
        icon: '/icons/ecg-mastery.png',
    },
    {
        key: 'practical-skills',
        label: 'Practical Skills',
        path: 'practical-skills',
        icon: '/icons/practical-skills.png',
    },
    {
        key: 'body-system',
        label: 'Body System',
        path: 'body-system',
        icon: '/icons/body-system.png',
    },
    {
        key: 'patient-assessment',
        label: 'Patient Assessment',
        path: 'patient-assessment',
        icon: '/icons/assessment.png',
    },
    {
        key: 'care-plans',
        label: 'Care Plans',
        path: 'care-plans',
        icon: '/icons/care-plans-icon.svg',
    },
    {
        key: 'clinical-skills',
        label: 'Clinical Skills',
        path: 'clinical-skills',
        icon: '/icons/clinical-skill.png',
    },
    {
        key: 'templates',
        label: 'Templates',
        path: 'templates',
        icon: '/icons/templates.png',
    },
    {
        key: 'exams',
        label: 'Exams',
        path: 'exam',
        icon: '/icons/quiz.png',
    },
    {
        key: 'flashcards',
        label: 'Flashcards',
        path: 'flashcards',
        icon: '/icons/flashcard.png',
    },
    {
        key: 'settings',
        label: 'Settings',
        path: 'settings',
        icon: '/icons/setting.png',
        children: [
            // {
            //     key: 'about-us',
            //     label: 'About us',
            //     path: 'about-us',
            //     icon: <TbBook size={20} />,
            // },
            {
                key: 'terms-and-condition',
                label: 'Terms and Condition',
                path: 'terms-and-condition',
                icon: <LuClipboardList size={20} />,
            },
            {
                key: 'privacy-policy',
                label: 'Privacy Policy',
                path: 'privacy-policy',
                icon: <LuClipboardList size={20} />,
            },
            {
                key: 'faq',
                label: 'FAQ',
                path: 'faq',
                icon: <BsPatchQuestion size={20} />,
            },
        ],
    },
];

export default sidebarItems;
