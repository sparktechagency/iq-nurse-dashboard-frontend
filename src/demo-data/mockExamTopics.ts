export const mockExamTopics = [
    {
        id: '1',
        title: 'Blood Pressure Measurement',
        description: 'Accurately measure systolic and diastolic pressure',
        questionCount: 5,
        questions: [
            {
                id: 'q1',
                type: 'multiple-choice' as const,
                questionText: 'What is the normal blood pressure range for adults?',
                difficulty: 'easy' as const,
                explanation:
                    'Normal blood pressure is less than 120/80 mmHg. This is the baseline used to categorize all other blood pressure ranges.',
                options: ['Less than 120/80 mmHg', '120-139/80-89 mmHg', '140/90 mmHg or higher', '100/60 mmHg'],
                correctAnswers: ['0'],
            },
            {
                id: 'q2',
                type: 'multiple-response' as const,
                questionText:
                    'Which of the following factors can affect blood pressure readings? (Select all that apply)',
                difficulty: 'medium' as const,
                explanation:
                    'Multiple factors influence blood pressure including time of day, stress levels, recent caffeine/alcohol intake, and physical activity. Readings should be taken in a calm state.',
                options: [
                    'Recent caffeine intake',
                    'Stress and anxiety',
                    'Time of day',
                    'Color of clothing',
                    'Recent physical activity',
                ],
                correctAnswers: ['0', '1', '2', '4'],
            },
            {
                id: 'q3',
                type: 'fill-in-the-blank' as const,
                questionText:
                    "Calculate the patient's MAP (Mean Arterial Pressure) if systolic is 130 mmHg and diastolic is 85 mmHg. (Formula: MAP = (SYS + 2*DIA) / 3)",
                difficulty: 'hard' as const,
                explanation: '100\nMAP = (130 + 2*85) / 3 = (130 + 170) / 3 = 300 / 3 = 100 mmHg',
                correctAnswers: [100],
            },
        ],
    },
    {
        id: '2',
        title: 'Critical Care Monitoring',
        description: 'ICU Monitoring Protocols',
        questionCount: 3,
        questions: [
            {
                id: 'q4',
                type: 'multiple-choice' as const,
                questionText: 'What is the normal heart rate for adults at rest?',
                difficulty: 'easy' as const,
                explanation: 'Normal resting heart rate for adults is typically 60-100 beats per minute.',
                options: ['40-60 bpm', '60-100 bpm', '100-120 bpm', '120-150 bpm'],
                correctAnswers: ['1'],
            },
            {
                id: 'q5',
                type: 'multiple-response' as const,
                questionText: 'Which monitoring parameters should be continuous in ICU? (Select all that apply)',
                difficulty: 'medium' as const,
                explanation:
                    'ICU patients require continuous monitoring of vital signs including heart rate, blood pressure, oxygen saturation, and respiratory rate.',
                options: ['Heart rate', 'Blood pressure', 'Oxygen saturation', 'Urine color', 'Respiratory rate'],
                correctAnswers: ['0', '1', '2', '4'],
            },
        ],
    },
    {
        id: '3',
        title: 'Medication Dosage Calculation',
        description: 'Safe calculation of medication doses',
        questionCount: 2,
        questions: [
            {
                id: 'q6',
                type: 'fill-in-the-blank' as const,
                questionText:
                    'A patient weighs 70 kg and needs 5 mg/kg of medication. What is the total dose required?',
                difficulty: 'easy' as const,
                explanation: '350\nTotal dose = 70 kg × 5 mg/kg = 350 mg',
                correctAnswers: [350],
            },
            {
                id: 'q7',
                type: 'multiple-choice' as const,
                questionText: 'When should medication calculations be double-checked?',
                difficulty: 'medium' as const,
                explanation:
                    'High-risk medications like insulin, anticoagulants, and pediatric doses should always be double-checked. Many facilities require verification before administration.',
                options: [
                    'Only for pediatric patients',
                    'Only for elderly patients',
                    'For high-risk medications and before administration',
                    'Never, if the dose is calculated correctly',
                ],
                correctAnswers: ['2'],
            },
        ],
    },
];
