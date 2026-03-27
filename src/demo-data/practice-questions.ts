export interface MatrixData {
    rows: string[];
    columns: string[];
    correctCells: string[];
}

export interface CaseStudyPart {
    part: number;
    question: string;
    type: 'multiple-response' | 'multiple-choice';
    options: string[];
    correctAnswers: string | string[];
}

export interface Question {
    id: number | string;
    type: 'matrix' | 'case-study' | 'multiple-response' | 'multiple-choice';
    category: string;
    question: string;
    matrixData?: MatrixData;
    caseStudyParts?: CaseStudyPart[];
    context?: string;
    options?: string[];
    correctAnswers?: string | string[];
    rationale: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard' | string;
}

export const initialPracticeQuestions: Question[] = [
    {
        id: 1,
        type: 'matrix',
        category: 'Specimen Collection',
        question:
            'The nurse is preparing to collect various laboratory specimens. For each specimen type listed below, select the appropriate collection considerations that apply. Each consideration may apply to more than one specimen type.',
        matrixData: {
            rows: [
                'Complete Blood Count (CBC)',
                'Fasting Glucose',
                'Arterial Blood Gas (ABG)',
                'Potassium level (IV running in left arm)',
            ],
            columns: [
                'Lavender/Purple tube',
                'NPO 8-12 hours before',
                'Apply pressure 5+ minutes',
                'Draw from right arm only',
                'Ice specimen immediately',
            ],
            correctCells: [
                'Complete Blood Count (CBC)-Lavender/Purple tube',
                'Fasting Glucose-NPO 8-12 hours before',
                'Arterial Blood Gas (ABG)-Apply pressure 5+ minutes',
                'Arterial Blood Gas (ABG)-Ice specimen immediately',
                'Potassium level (IV running in left arm)-Draw from right arm only',
            ],
        },
        rationale:
            'CBC uses lavender/purple EDTA tube. Fasting glucose requires NPO 8-12 hours (draw before breakfast). ABG requires arterial puncture (5+ minutes pressure) and specimen must be iced and transported immediately. Potassium with IV running: Never draw from same arm as IV infusion (causes falsely elevated or diluted values).',
    },
    {
        id: 2,
        type: 'case-study',
        category: 'Cardiac Biomarkers',
        context:
            'A 58-year-old male arrives in the ED with crushing chest pain that started 2 hours ago. Pain radiates to left arm and jaw. He is diaphoretic and anxious. Vital signs: BP 158/92, HR 108, RR 22, SpO2 94% on room air.',
        question: 'Case Study: Acute Chest Pain',
        caseStudyParts: [
            {
                part: 1,
                question: 'What laboratory tests should the nurse anticipate will be ordered IMMEDIATELY? (Select all that apply)',
                type: 'multiple-response',
                options: [
                    'Serial troponin levels',
                    '12-lead ECG',
                    'BNP',
                    'CK-MB',
                    'Lipid panel',
                    'Complete blood count',
                ],
                correctAnswers: ['Serial troponin levels', '12-lead ECG', 'CK-MB'],
            },
            {
                part: 2,
                question: "The initial troponin result is 0.02 ng/mL (normal <0.04). What is the nurse's BEST action?",
                type: 'multiple-choice',
                options: [
                    'Document as normal and reassure the patient',
                    'Anticipate repeat troponin in 3 hours',
                    'Prepare for immediate discharge',
                    'Request a lipid panel instead',
                ],
                correctAnswers: 'Anticipate repeat troponin in 3 hours',
            },
            {
                part: 3,
                question:
                    'The 3-hour troponin is now 0.28 ng/mL. The patient continues to have chest pain. What interventions should the nurse implement? (Select all that apply)',
                type: 'multiple-response',
                options: [
                    'Notify the provider immediately',
                    'Administer oxygen to maintain SpO2 >90%',
                    'Prepare for possible cardiac catheterization',
                    'Reassure patient this is normal for chest pain',
                    'Continue cardiac monitoring',
                    'Obtain another troponin in 3 hours',
                ],
                correctAnswers: [
                    'Notify the provider immediately',
                    'Administer oxygen to maintain SpO2 >90%',
                    'Prepare for possible cardiac catheterization',
                    'Continue cardiac monitoring',
                    'Obtain another troponin in 3 hours',
                ],
            },
        ],
        rationale:
            'Troponin is the gold standard for MI diagnosis. It rises 3-4 hours after myocardial injury, so serial troponins (at 0, 3, 6 hours) are essential. Rising troponin with chest pain = ACS requiring immediate intervention. ECG and CK-MB are also standard. BNP is for heart failure, not acute MI. Lipid panel is not urgent.',
    },
    {
        id: 3,
        type: 'multiple-response',
        category: 'Potassium',
        question:
            'A patient with chronic kidney disease has a potassium level of 6.8 mEq/L. Which ECG changes would the nurse expect to observe? (Select all that apply)',
        options: [
            'Peaked T waves',
            'Widened QRS complex',
            'Flattened T waves',
            'Prolonged PR interval',
            'U waves',
            'Shortened QT interval',
        ],
        correctAnswers: ['Peaked T waves', 'Widened QRS complex', 'Prolonged PR interval'],
        rationale:
            'Hyperkalemia (K+ >6.5) causes characteristic ECG changes: peaked T waves (early), widened QRS, prolonged PR interval, and eventual loss of P waves. Flattened T waves and U waves are seen in HYPOkalemia. This is a critical value requiring immediate intervention to prevent cardiac arrest.',
    },
];

export const initialPracticalSkillsQuestions: Question[] = [
    {
        id: 'q1',
        type: 'multiple-choice',
        question: 'A nurse is making an occupied bed for a patient. Which action should the nurse take to prevent complications?',
        options: [
            'Raise the bed to the highest position during the procedure',
            'Keep wrinkles in the bottom sheet to allow air circulation',
            'Use the old pillowcase to save time',
            'Shake linens vigorously to remove debris',
        ],
        correctAnswers: 'Raise the bed to the highest position during the procedure',
        rationale:
            'Raising the bed to the highest position promotes proper body mechanics and prevents back injury for the nurse. Wrinkles in sheets can cause pressure ulcers, old linens should be replaced, and shaking linens spreads microorganisms.',
        category: 'Fundamentals / Basic Skills',
        difficulty: 'Easy',
    },
    {
        id: 'q2',
        type: 'multiple-choice',
        question: 'When performing a bed bath, which area should the nurse wash first?',
        options: ['The perineal area', 'The face and eyes', 'The arms and hands', 'The feet'],
        correctAnswers: 'The face and eyes',
        rationale:
            'The face and eyes should be washed first, moving from the cleanest to the dirtiest areas. This prevents cross-contamination and follows the principle of washing from clean to dirty.',
        category: 'Fundamentals / Basic Skills',
        difficulty: 'Easy',
    },
    {
        id: 'q3',
        type: 'multiple-choice',
        question:
            'A nurse is preparing to transfer a patient from bed to wheelchair. What is the most important action before beginning the transfer?',
        options: [
            'Document the transfer in the chart',
            "Assess the patient's ability to bear weight and assist",
            'Call for additional help regardless of patient size',
            'Remove the wheelchair footrests',
        ],
        correctAnswers: "Assess the patient's ability to bear weight and assist",
        rationale:
            "Assessing the patient's ability to bear weight and level of assistance needed is critical for safety and determines if additional staff is required. This assessment guides the transfer technique and prevents falls or injuries.",
        category: 'Fundamentals / Basic Skills',
        difficulty: 'Medium',
    },
    {
        id: 'q4',
        type: 'multiple-choice',
        question: "A nurse measures a patient's blood pressure as 168/98 mmHg. Which action should the nurse take first?",
        options: [
            'Document the finding and continue with other patients',
            'Reassess the blood pressure in 1-2 minutes',
            'Administer antihypertensive medication immediately',
            'Call the physician stat',
        ],
        correctAnswers: 'Reassess the blood pressure in 1-2 minutes',
        rationale:
            'The nurse should reassess the blood pressure after waiting 1-2 minutes to allow venous congestion to resolve and confirm the reading. A single elevated reading may not be accurate due to factors like recent activity, anxiety, or improper technique.',
        category: 'Fundamentals / Basic Skills',
        difficulty: 'Medium',
    },
];
