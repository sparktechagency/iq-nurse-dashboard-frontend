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

export interface RationaleObject {
    correct: string;
    incorrect: string;
    keyPoints: string[];
}

export interface Question {
    id: number | string;
    type?: string;
    category?: string;
    question: string;
    scenario?: string;
    stripType?: string;
    context?: string;
    options?: string[];
    correctAnswers?: string | string[];
    correctAnswer?: string | string[] | number;
    rationale: string | RationaleObject;
    difficulty?: 'Easy' | 'Medium' | 'Hard' | string;
    explanation?: string;
    matrixData?: any;
    caseStudyParts?: any[];
    dropdownOptions?: { [key: string]: string[] };
    dropdownAnswers?: { [key: string]: string };
    matrixOptions?: {
        rows: string[];
        columns: string[];
        correctAnswers: { [key: string]: string };
    };
    orderingItems?: string[];
    correctOrder?: number[];
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

export const initialDosageCalculationQuestions: any[] = [
    {
        id: 1,
        category: 'Basic Dosage',
        question: 'A physician orders 0.5 g of medication. The medication is available in 250 mg tablets. How many tablets should the nurse administer?',
        options: ['1 tablet', '2 tablets', '3 tablets', '4 tablets'],
        correctAnswer: 1,
        explanation: 'First, convert 0.5 g to mg: 0.5 g × 1000 = 500 mg. Then use the formula: Desired (500 mg) ÷ Available (250 mg) = 2 tablets.',
        rationale: 'Always ensure units match before calculating. The metric conversion of grams to milligrams is essential for accurate dosage calculations.',
    },
    {
        id: 2,
        category: 'IV Drip Rates',
        question: 'A patient is to receive 1000 mL of normal saline over 8 hours. The IV tubing has a drop factor of 20 gtts/mL. What is the drip rate in gtts/min?',
        options: ['21 gtts/min', '32 gtts/min', '42 gtts/min', '52 gtts/min'],
        correctAnswer: 2,
        explanation: 'Formula: (Volume × Drop factor) ÷ Time in minutes = gtts/min. (1000 mL × 20 gtts/mL) ÷ (8 hrs × 60 min) = 20,000 ÷ 480 = 41.67, rounded to 42 gtts/min.',
        rationale: 'When calculating drip rates, always convert hours to minutes. Round to the nearest whole number since you cannot count partial drops.',
    },
    {
        id: 3,
        category: 'Weight-Based',
        question: 'A patient weighs 176 lbs. The order is for 5 mg/kg of medication. What is the correct dose? (1 kg = 2.2 lbs)',
        options: ['350 mg', '400 mg', '450 mg', '500 mg'],
        correctAnswer: 1,
        explanation: 'First, convert weight: 176 lbs ÷ 2.2 = 80 kg. Then calculate dose: 80 kg × 5 mg/kg = 400 mg.',
        rationale: 'Weight-based calculations require accurate conversion from pounds to kilograms. Always verify the patient\'s current weight before calculating.',
    },
    {
        id: 4,
        category: 'Pediatric',
        question: 'A child weighs 25 kg. The safe dose range for the medication is 10-15 mg/kg/day given in 3 divided doses. The physician orders 100 mg TID (three times daily). Is this order safe?',
        options: [
            'Yes, the order is safe',
            'No, the order is too low',
            'No, the order is too high',
            'Cannot determine from the information given',
        ],
        correctAnswer: 0,
        explanation: 'Calculate safe range: Minimum = 25 kg × 10 mg/kg = 250 mg/day; Maximum = 25 kg × 15 mg/kg = 375 mg/day. Ordered dose: 100 mg × 3 = 300 mg/day. This falls within the safe range (250-375 mg/day).',
        rationale: 'Always calculate the safe dose range and compare the ordered dose to ensure patient safety, especially with pediatric patients.',
    },
];

export const initialECGMasteryQuestions: Question[] = [
    {
        id: 1,
        type: 'multiple-choice',
        scenario: 'A 68-year-old male client is admitted to the telemetry unit. You observe the following rhythm on the cardiac monitor:',
        stripType: 'NSR',
        question: 'Based on the ECG strip, what rhythm is the client experiencing?',
        options: ['Normal Sinus Rhythm', 'Sinus Bradycardia', 'Sinus Tachycardia', 'Atrial Fibrillation'],
        correctAnswer: 'Normal Sinus Rhythm',
        rationale: {
            correct: 'This is correct! The ECG shows Normal Sinus Rhythm with a regular rate of 60-100 bpm, regular P waves before each QRS, and normal intervals.',
            incorrect: 'This is incorrect. Review the characteristics: regular rhythm, rate 60-100 bpm, P waves present before each QRS, PR interval 0.12-0.20 sec.',
            keyPoints: [
                'NSR criteria: Rate 60-100 bpm, regular rhythm',
                'P waves: Present, upright, one before each QRS',
                'PR interval: 0.12-0.20 seconds (constant)',
                'QRS complex: <0.12 seconds (narrow)',
                'No intervention needed for NSR unless symptomatic',
            ],
        },
    },
    {
        id: 2,
        type: 'select-all',
        scenario: 'A 55-year-old female client with a history of COPD presents to the emergency department with irregular heart palpitations. The monitor shows atrial fibrillation with rapid ventricular response (RVR) at 145 bpm.',
        question: 'Which interventions should the nurse anticipate? (Select all that apply)',
        options: [
            'Administer prescribed diltiazem IV',
            'Prepare for immediate defibrillation',
            'Initiate anticoagulation therapy as ordered',
            'Monitor for signs of decreased cardiac output',
            'Administer atropine 0.5mg IV push',
            'Assess CHA₂DS₂-VASc score for stroke risk',
        ],
        correctAnswer: [
            'Administer prescribed diltiazem IV',
            'Initiate anticoagulation therapy as ordered',
            'Monitor for signs of decreased cardiac output',
            'Assess CHA₂DS₂-VASc score for stroke risk',
        ],
        rationale: {
            correct: 'Excellent! You identified all appropriate interventions for atrial fibrillation with RVR.',
            incorrect: 'Review the correct interventions. Defibrillation is only for unstable clients or V-fib/pulseless V-tach. Atropine increases heart rate and would worsen tachycardia.',
            keyPoints: [
                'A-fib treatment goals: Rate control, rhythm control, anticoagulation',
                'Calcium channel blockers (diltiazem) or beta-blockers for rate control',
                'Anticoagulation prevents stroke (major complication of A-fib)',
                'CHA₂DS₂-VASc score determines stroke risk and need for anticoagulation',
                'Defibrillation only for unstable patients (not routine for stable A-fib)',
                'Monitor for decreased CO: Loss of atrial kick reduces output by 20-30%',
            ],
        },
    },
    {
        id: 3,
        type: 'dropdown',
        scenario: 'A 72-year-old client post-inferior wall MI is on continuous cardiac monitoring. The monitor alarm sounds.',
        question: 'Complete the nursing documentation:',
        dropdownOptions: {
            rhythm: ['Normal Sinus Rhythm', 'Sinus Bradycardia', 'Sinus Tachycardia', 'First-Degree AV Block'],
            intervention: ['Continue monitoring', 'Administer atropine 0.5mg IV', 'Prepare for cardioversion', 'Administer adenosine 6mg IV'],
            priority: ['No immediate action needed', 'Monitor closely for progression', 'Immediate emergency intervention', 'Notify provider within 1 hour'],
        },
        dropdownAnswers: {
            rhythm: 'First-Degree AV Block',
            intervention: 'Continue monitoring',
            priority: 'Monitor closely for progression',
        },
        rationale: {
            correct: 'Correct! First-degree AV block is common after inferior MI, usually benign, but requires monitoring for progression to higher-degree blocks.',
            incorrect: 'Review first-degree AV block management. It\'s characterized by PR interval >0.20 sec (constant), usually requires no treatment, but monitoring is essential post-MI.',
            keyPoints: [
                'First-degree AV block: PR interval >0.20 seconds (prolonged but constant)',
                'Common after inferior MI (right coronary artery involvement)',
                'Usually asymptomatic and benign - no treatment needed',
                'Monitor for progression to second or third-degree heart block',
                'May be caused by medications: digoxin, beta-blockers, CCBs',
                'Every P wave is followed by a QRS (1:1 conduction)',
            ],
        },
    },
    {
        id: 4,
        type: 'matrix',
        question: 'Match each ECG characteristic to the appropriate rhythm:',
        matrixOptions: {
            rows: [
                'Irregularly irregular rhythm with no discernible P waves',
                'Sawtooth flutter waves at 250-350 bpm',
                'PR interval progressively lengthens until QRS is dropped',
                'Complete AV dissociation with independent P and QRS',
            ],
            columns: ['Atrial Fibrillation', 'Atrial Flutter', 'Second-Degree AV Block Type I', 'Third-Degree AV Block'],
            correctAnswers: {
                'Irregularly irregular rhythm with no discernible P waves': 'Atrial Fibrillation',
                'Sawtooth flutter waves at 250-350 bpm': 'Atrial Flutter',
                'PR interval progressively lengthens until QRS is dropped': 'Second-Degree AV Block Type I',
                'Complete AV dissociation with independent P and QRS': 'Third-Degree AV Block',
            },
        },
        rationale: {
            correct: 'Perfect! You correctly matched all ECG characteristics to their rhythms.',
            incorrect: 'Review the distinctive features of each rhythm pattern.',
            keyPoints: [
                'A-fib: Most common arrhythmia, irregularly irregular, absent P waves',
                'A-flutter: Regular sawtooth pattern best seen in leads II, III, aVF',
                '2nd-degree Type I (Wenckebach): Progressive PR lengthening, usually benign',
                '3rd-degree: Life-threatening, requires pacemaker, no relationship between P and QRS',
                'Recognize patterns quickly for NCLEX prioritization questions',
            ],
        },
    },
    {
        id: 5,
        type: 'ordering',
        scenario: 'A client suddenly develops pulseless ventricular tachycardia in the cardiac unit.',
        question: 'Place the following nursing interventions in the correct order of priority:',
        orderingItems: [
            'Begin chest compressions immediately',
            'Call for help and activate emergency response',
            'Attach defibrillator pads and analyze rhythm',
            'Deliver shock if indicated and resume CPR',
            'Establish IV access and administer epinephrine',
            'Check for pulse and rhythm every 2 minutes',
        ],
        correctOrder: [1, 0, 2, 3, 4, 5],
        rationale: {
            correct: 'Excellent! You correctly prioritized interventions following ACLS guidelines for pulseless V-tach.',
            incorrect: 'Review ACLS algorithms. Remember: Call for help first, then start CPR immediately, defibrillate ASAP.',
            keyPoints: [
                'Pulseless V-tach = shockable rhythm requiring immediate defibrillation',
                'Call for help FIRST - you need the defibrillator and team',
                'Start high-quality CPR immediately (before defibrillator arrives)',
                'Shock as soon as defibrillator available, then resume CPR immediately',
                'Minimize interruptions in chest compressions',
                'ACLS sequence: Call → CPR → Shock → CPR → Medications → Reassess',
            ],
        },
    },
    {
        id: 6,
        type: 'multiple-choice',
        scenario: 'A 45-year-old client reports sudden onset of rapid heart palpitations. BP: 118/76, HR: 180 bpm. The monitor shows a narrow-complex regular tachycardia with no visible P waves.',
        stripType: 'SVT',
        question: 'What is the priority nursing intervention?',
        options: [
            'Prepare for immediate synchronized cardioversion',
            'Teach vagal maneuvers and attempt Valsalva',
            'Administer diltiazem 20mg IV push',
            'Begin CPR and call a code',
        ],
        correctAnswer: 'Teach vagal maneuvers and attempt Valsalva',
        rationale: {
            correct: 'Correct! This stable SVT should be treated with vagal maneuvers first. The client is hemodynamically stable (normal BP).',
            incorrect: 'Review SVT management. For stable patients, try vagal maneuvers first. Synchronized cardioversion is for unstable patients.',
            keyPoints: [
                'SVT: Narrow complex tachycardia, rate 150-250 bpm, regular rhythm',
                'Stable patient criteria: Normal BP, no chest pain, alert and oriented',
                'First-line for stable SVT: Vagal maneuvers (Valsalva, carotid massage)',
                'If vagal maneuvers fail: Adenosine 6mg rapid IV push',
                'Warn patient adenosine causes brief sense of \'impending doom\'',
                'Unstable SVT (hypotensive, altered mental status): Synchronized cardioversion',
            ],
        },
    },
    {
        id: 7,
        type: 'select-all',
        scenario: 'A nurse is caring for a client with a permanent pacemaker inserted 2 days ago for third-degree heart block.',
        question: 'Which assessment findings require immediate notification of the healthcare provider? (Select all that apply)',
        options: [
            'Pacing spikes present but no QRS complexes following',
            'Heart rate of 72 bpm (pacemaker set at 70 bpm)',
            'Swelling and redness at pacemaker insertion site',
            'Client reports hiccups that won\'t stop',
            'Pacing spike visible before each P wave and QRS complex',
            'Client\'s heart rate drops to 55 bpm during sleep',
        ],
        correctAnswer: [
            'Pacing spikes present but no QRS complexes following',
            'Swelling and redness at pacemaker insertion site',
            'Client reports hiccups that won\'t stop',
            'Client\'s heart rate drops to 55 bpm during sleep',
        ],
        rationale: {
            correct: 'Excellent recognition of pacemaker complications! All these findings indicate potential problems.',
            incorrect: 'Review pacemaker complications and normal function.',
            keyPoints: [
                'Failure to capture: Pacing spike without depolarization (no P or QRS)',
                'Failure to sense: Pacemaker fires when it shouldn\'t (competition)',
                'Infection signs: Redness, swelling, warmth, drainage at site',
                'Hiccups = possible lead displacement stimulating diaphragm',
                'Heart rate below pacemaker setting = malfunction',
                'Normal: Rate slightly above setting is okay (intrinsic rhythm)',
                'Normal: Pacing spikes with appropriate capture',
            ],
        },
    },
    {
        id: 8,
        type: 'dropdown',
        scenario: 'A client with COPD is admitted with irregular heart rhythm. Monitor shows multiple P wave morphologies with variable PR intervals and heart rate of 130 bpm.',
        question: 'Complete the clinical reasoning:',
        dropdownOptions: {
            rhythm: ['Atrial Fibrillation', 'Multifocal Atrial Tachycardia', 'Wandering Atrial Pacemaker', 'Atrial Flutter'],
            cause: ['Chronic hypoxia', 'Increased vagal tone', 'Electrolyte imbalance', 'Beta-blocker therapy'],
            treatment: ['Treat underlying COPD/hypoxia', 'Administer digoxin', 'Immediate cardioversion', 'Administer atropine'],
        },
        dropdownAnswers: {
            rhythm: 'Multifocal Atrial Tachycardia',
            cause: 'Chronic hypoxia',
            treatment: 'Treat underlying COPD/hypoxia',
        },
        rationale: {
            correct: 'Perfect clinical reasoning! MAT is classic in COPD patients and requires treating the underlying hypoxia.',
            incorrect: 'Review MAT characteristics and management. Key: ≥3 different P wave shapes, rate >100, strongly associated with lung disease.',
            keyPoints: [
                'MAT: ≥3 different P wave morphologies, rate >100 bpm, irregular',
                'Most common in COPD and pulmonary disease patients',
                'Caused by hypoxia - treat underlying condition first',
                'Calcium channel blockers for rate control (NOT digoxin - ineffective)',
                'MAT vs WAP: MAT rate >100, WAP rate <100',
                'Fix hypoxia: Oxygen, bronchodilators, treat respiratory infection',
            ],
        },
    },
    {
        id: 9,
        type: 'matrix',
        question: 'Classify each medication by its appropriate use in arrhythmia management:',
        matrixOptions: {
            rows: ['Adenosine', 'Atropine', 'Amiodarone', 'Diltiazem'],
            columns: ['Rate Control', 'Rhythm Conversion', 'Bradycardia', 'SVT Treatment'],
            correctAnswers: {
                Adenosine: 'SVT Treatment',
                Atropine: 'Bradycardia',
                Amiodarone: 'Rhythm Conversion',
                Diltiazem: 'Rate Control',
            },
        },
        rationale: {
            correct: 'Excellent! You understand the specific uses of each antiarrhythmic medication.',
            incorrect: 'Review cardiac medication classifications and their primary uses.',
            keyPoints: [
                'Adenosine: First-line for stable SVT, 6mg rapid IV push, very short half-life',
                'Atropine: Symptomatic bradycardia, 0.5mg IV, blocks vagal effects',
                'Amiodarone: Rhythm control for A-fib, V-tach, works on multiple channels',
                'Diltiazem: Calcium channel blocker for rate control in A-fib/flutter',
                'Know onset, dose, and key side effects for NCLEX',
            ],
        },
    },
    {
        id: 10,
        type: 'multiple-choice',
        scenario: 'A 58-year-old client admitted with chest pain has the following ECG changes: ST elevation in leads II, III, and aVF.',
        question: 'Which coronary artery is most likely affected, and what complication should the nurse monitor for?',
        options: [
            'Left anterior descending artery; monitor for heart failure',
            'Right coronary artery; monitor for bradycardia and heart blocks',
            'Circumflex artery; monitor for hypertension',
            'Left main coronary artery; monitor for tachycardia',
        ],
        correctAnswer: 'Right coronary artery; monitor for bradycardia and heart blocks',
        rationale: {
            correct: 'Excellent! Inferior MI (leads II, III, aVF) involves RCA and commonly causes bradycardia/blocks due to AV node involvement.',
            incorrect: 'Review MI localization by ECG leads. Inferior leads (II, III, aVF) = RCA = risk for conduction problems.',
            keyPoints: [
                'Inferior MI: Leads II, III, aVF show ST elevation',
                'Right coronary artery (RCA) supplies: Inferior wall and AV node',
                'Common complications: Bradycardia, AV blocks (first, second, third degree)',
                'Anterior MI (V3-V4): LAD → heart failure risk',
                'Lateral MI (I, aVL, V5-V6): Circumflex',
                'Always check right-sided leads (V4R) for RV involvement in inferior MI',
            ],
        },
    },
];
