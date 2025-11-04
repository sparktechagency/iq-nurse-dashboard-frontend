export const mockData: any = {
    'np-study-notes': [
        {
            id: 'sub-1',
            name: 'Medical-Surgical Nursing',
            description: 'Core medical and surgical nursing concepts',
            topics: [
                {
                    id: 'topic-1',
                    title: 'Hypertension Management',
                    overview: 'Understanding hypertension pathophysiology and nursing interventions',
                    media: [
                        {
                            id: 'm1',
                            type: 'video' as const,
                            url: 'https://res.cloudinary.com/ds1njqypu/video/upload/v1762255314/Download_3_xjddcb.mp4',
                            title: 'HTN Overview',
                        },
                        {
                            id: 'm2',
                            type: 'image' as const,
                            url: 'https://res.cloudinary.com/ds1njqypu/image/upload/v1762255389/messi-world-cup_hnv4n8.jpg',
                            title: 'HTN Diagram x',
                        },
                    ],
                    flashcards: [
                        { id: 'f1', front: 'What is normal blood pressure?', back: 'Less than 120/80 mmHg' },
                        { id: 'f2', front: 'Stage 1 Hypertension', back: '130-139 systolic or 80-89 diastolic' },
                    ],
                    questions: [],
                },
                {
                    id: 'topic-2',
                    title: 'Diabetes Management',
                    overview: 'Type 1 and Type 2 diabetes nursing care',
                    media: [
                        {
                            id: 'm1',
                            type: 'video' as const,
                            url: 'https://res.cloudinary.com/ds1njqypu/video/upload/v1762255734/Download_4_q8hwzp.mp4',
                            title: 'Diabetes Overview',
                        },
                    ],
                    flashcards: [{ id: 'f3', front: 'Normal fasting glucose', back: '70-100 mg/dL' }],
                    questions: [],
                },
            ],
        },
        {
            id: 'sub-2',
            name: 'Pharmacology',
            description: 'Drug classifications and nursing considerations',
            topics: [
                {
                    id: 'topic-3',
                    title: 'ACE Inhibitors',
                    overview: 'Mechanism of action and clinical use',
                    media: [],
                    flashcards: [{ id: 'f4', front: 'ACE stands for', back: 'Angiotensin Converting Enzyme' }],
                    questions: [],
                },
            ],
        },
    ],
    'rp-study-notes': [
        {
            id: 'sub-3',
            name: 'Pharmaceutical Sciences',
            description: 'Chemistry and pharmacokinetics',
            topics: [
                {
                    id: 'topic-4',
                    title: 'Drug Absorption',
                    overview: 'Routes of administration and absorption mechanisms',
                    media: [],
                    flashcards: [
                        {
                            id: 'f5',
                            front: 'What affects drug absorption?',
                            back: 'pH, blood flow, surface area, GI motility',
                        },
                    ],
                    questions: [],
                },
            ],
        },
    ],
    'lpn-study-notes': [
        {
            id: 'sub-4',
            name: 'Basic Nursing Care',
            description: 'Fundamental nursing skills',
            topics: [
                {
                    id: 'topic-5',
                    title: 'Vital Signs',
                    overview: 'Measurement and interpretation of vital signs',
                    media: [],
                    flashcards: [{ id: 'f6', front: 'Normal body temperature', back: '36.5-37.5°C or 97.7-99.5°F' }],
                    questions: [],
                },
            ],
        },
    ],
};

export const mockQuestions = [
    {
        id: 'q1',
        question:
            'A patient with hypertension presents with a BP of 150/95. What is the most appropriate intervention?',
        category: 'medical',
        options: [
            'Administer antihypertensive medication',
            'Measure BP again in 5 minutes',
            'Perform stress reduction techniques',
            'Refer to cardiology immediately',
        ],
        correctAnswer: 'A',
    },
    {
        id: 'q2',
        question: 'Which of the following is a complication of diabetes?',
        category: 'medical',
        options: ['Retinopathy', 'Nephropathy', 'Neuropathy', 'All of the above'],
        correctAnswer: 'D',
    },
    {
        id: 'q3',
        question: 'What is the mechanism of action of ACE inhibitors?',
        category: 'pharmacology',
        options: [
            'Block beta-receptors',
            'Inhibit angiotensin II formation',
            'Promote vasodilation',
            'Increase sodium reabsorption',
        ],
        correctAnswer: 'B',
    },
    {
        id: 'q4',
        question: 'Which surgical approach minimizes tissue trauma?',
        category: 'surgical',
        options: ['Open surgery', 'Laparoscopic surgery', 'Robotic surgery', 'Both B and C'],
        correctAnswer: 'D',
    },
];

export const mockFlashcards = [
    {
        id: 'fc-1',
        front: 'What is normal blood pressure?',
        back: 'Less than 120/80 mmHg',
        category: 'medical',
    },
    {
        id: 'fc-2',
        front: 'Stage 1 Hypertension range',
        back: '130-139 systolic or 80-89 diastolic',
        category: 'medical',
    },
    {
        id: 'fc-3',
        front: 'Normal fasting glucose level',
        back: '70-100 mg/dL',
        category: 'medical',
    },
    {
        id: 'fc-4',
        front: 'What does ACE stand for?',
        back: 'Angiotensin Converting Enzyme',
        category: 'pharmacology',
    },
    {
        id: 'fc-5',
        front: 'Mechanism of ACE inhibitors',
        back: 'Block conversion of angiotensin I to angiotensin II, reducing vasoconstriction',
        category: 'pharmacology',
    },
    {
        id: 'fc-6',
        front: 'What is the most common side effect of ACE inhibitors?',
        back: 'Dry cough due to bradykinin accumulation',
        category: 'pharmacology',
    },
    {
        id: 'fc-7',
        front: 'What is hemostasis?',
        back: 'The process that stops bleeding through vasoconstriction, platelet plug formation, and coagulation',
        category: 'surgical',
    },
    {
        id: 'fc-8',
        front: 'What are the three phases of wound healing?',
        back: 'Inflammatory, proliferative, and remodeling phases',
        category: 'surgical',
    },
    {
        id: 'fc-9',
        front: 'What is the Golden Period in trauma?',
        back: 'The first 60 minutes after trauma when treatment is most effective',
        category: 'surgical',
    },
    {
        id: 'fc-10',
        front: 'Normal body temperature range',
        back: '36.5-37.5°C or 97.7-99.5°F',
        category: 'medical',
    },
];
