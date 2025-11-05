export const mockClinicalCategories = [
    {
        id: 'basic-skills',
        name: 'Basic Skills',
        logo: '🩺',
        skillCount: 6,
        skills: [
            {
                id: 'skill-1',
                serialId: '#01',
                title: 'Blood Pressure Measurement',
                subtitle: 'Accurately measure systolic and diastolic',
                checklists: [
                    'Sphygmomanometer (BP cuff)',
                    'Stethoscope',
                    'Alcohol wipes',
                    'Patient chart or electronic health record',
                    'Pen and paper for recording',
                ],
                steps: [
                    {
                        title: 'Prepare the patient',
                        description:
                            'Explain the procedure to the patient. Ensure patient has been resting for at least 5 minutes and is in a seated position with arm supported at heart level. Explain the procedure to the patient. Ensure patient has been resting for at least 5 minutes and is in a seated position with arm supported at heart level.',
                    },
                    {
                        title: 'Select appropriate cuff size',
                        description:
                            'Choose a cuff with bladder width that is 40% of arm circumference and length that encircles 80% of the arm.',
                    },
                    {
                        title: 'Position the cuff',
                        description:
                            'Palpate brachial artery in antecubital fossa. Place cuff 2-3 cm above antecubital fossa with center of bladder over arterial pulsation.',
                    },
                    {
                        title: 'Determine maximum inflation level',
                        description:
                            'Palpate radial pulse while inflating cuff. Note pressure at which pulse disappears and add 30 mmHg to estimate maximum inflation level.',
                    },
                ],
                videoUrl: 'https://res.cloudinary.com/ds1njqypu/video/upload/v1762255734/Download_4_q8hwzp.mp4',
            },
            {
                id: 'skill-2',
                serialId: '#02',
                title: 'Temperature Assessment',
                subtitle: 'Measure body temperature accurately',
                checklists: ['Clinical thermometer', 'Temporal scanner or digital thermometer'],
                steps: [
                    {
                        title: 'Select thermometer site',
                        description: 'Choose appropriate site based on patient condition',
                    },
                ],
                videoUrl: '',
            },
        ],
},
    {
        id: 'neurological',
        name: 'Neurological',
        logo: '🧠',
        skillCount: 4,
        skills: [
            {
                id: 'skill-3',
                serialId: '#01',
                title: 'Neurological Assessment',
                subtitle: 'Complete neurological examination',
                checklists: [],
                steps: [],
                videoUrl: '',
            },
        ],
    },
    {
        id: 'gastrointestinal',
        name: 'Gastrointestinal',
        logo: '🫀',
        skillCount: 3,
        skills: [],
    },
    {
        id: 'cardio',
        name: 'Cardio',
        logo: '❤️',
        skillCount: 4,
        skills: [],
    },
];
