export interface MedicationData {
    name: string;
    dosage: string;
    route: string;
    frequency: string;
    purpose: string;
    nursingConsiderations: string;
}

export interface CarePlanContent {
    diagnosisTitle: string;
    relatedTo: string;
    evidencedBy: string;
    patientGoals: string[];
    nursingInterventions: string[];
    medications: MedicationData[];
}

export interface CarePlanSubcategory {
    id: string;
    name: string;
    isBookmarked: boolean;
    content: CarePlanContent;
}

export interface CarePlanCategory {
    id: string;
    name: string;
    color: string;
    topicCount: number;
    subcategories: CarePlanSubcategory[];
}

export const carePlansCategories: CarePlanCategory[] = [
    {
        id: 'respiratory',
        name: 'Respiratory Care Plans',
        color: '#3B82F6',
        topicCount: 8,
        subcategories: [
            {
                id: 'impaired-gas-exchange',
                name: 'Impaired Gas Exchange',
                isBookmarked: false,
                content: {
                    diagnosisTitle: 'Nursing Diagnosis #1: Impaired Gas Exchange',
                    relatedTo: 'Ventilation-Perfusion imbalance secondary to inflammatory process',
                    evidencedBy: 'Hypoxemia with PaO2 of accessory muscles',
                    patientGoals: [
                        'Patient will maintain adequate oxygenation sp02>95% within 24 hours',
                        'Patient will demonstrate improved ventilation with clear breath sounds within 72 hours',
                        'patient will Report decreased within 48 hours',
                    ],
                    nursingInterventions: [
                        'Monitor respiratory status q4h including rate,depth,effort and oxygen saturation',
                        "Position patient in semi-fowler's or high -fowler's position to optimize lung expansion",
                        'Administer supplemental oxygen as prescribed to maintain sp02>95%',
                        'Encourage deep breathing exercise and use of incentive spirometer q2h while awake',
                        'Access and document breath sounds q8h',
                        'Monitor ABG results and report abnormal values to physician',
                    ],
                    medications: [
                        {
                            name: 'Azithromycin',
                            dosage: '500mg',
                            route: 'PO',
                            frequency: 'Daily x 5 days',
                            purpose: 'Antibiotic therapy for bacterial pneumonia',
                            nursingConsiderations: 'Monitor for GI upset,take with food if needed',
                        },
                        {
                            name: 'Albuterol',
                            dosage: '2.5mg',
                            route: 'Nebulizer',
                            frequency: 'q6h PRN',
                            purpose: 'Bronchodilation to improve airflow',
                            nursingConsiderations: 'Monitor heart rate,assess breath sounds before/after',
                        },
                    ],
                },
            },
            {
                id: 'ineffective-airway',
                name: 'Ineffective Airway Clearance',
                isBookmarked: false,
                content: {
                    diagnosisTitle: 'Nursing Diagnosis #2: Ineffective Airway Clearance',
                    relatedTo: 'Excessive mucus production and weak cough effort',
                    evidencedBy: 'Productive cough, adventitious breath sounds, difficulty expectorating secretions',
                    patientGoals: [
                        'Patient will demonstrate effective coughing techniques within 24 hours',
                        'Patient will maintain clear lung sounds bilaterally within 48 hours',
                        'Patient will expectorate secretions without difficulty within 72 hours',
                    ],
                    nursingInterventions: [
                        'Assess respiratory status and lung sounds every 4 hours',
                        'Encourage fluid intake of 2-3 liters daily unless contraindicated',
                        'Teach and assist with coughing and deep breathing exercises',
                        'Perform chest physiotherapy as ordered',
                        'Suction airway PRN using sterile technique',
                        'Administer mucolytics and bronchodilators as prescribed',
                    ],
                    medications: [
                        {
                            name: 'Guaifenesin',
                            dosage: '400mg',
                            route: 'PO',
                            frequency: 'q4h',
                            purpose: 'Expectorant to thin mucus secretions',
                            nursingConsiderations: 'Encourage increased fluid intake for maximum effectiveness',
                        },
                    ],
                },
            },
            {
                id: 'acute-pain-respiratory',
                name: 'Acute Pain (Pleuritic)',
                isBookmarked: false,
                content: {
                    diagnosisTitle: 'Nursing Diagnosis #3: Acute Pain Related to Pleurisy',
                    relatedTo: 'Inflammation of pleural membranes',
                    evidencedBy: 'Patient reports sharp chest pain rated 7/10, worse with deep inspiration',
                    patientGoals: [
                        'Patient will report pain level of 3/10 or less within 24 hours',
                        'Patient will demonstrate use of pain management techniques within 12 hours',
                        'Patient will be able to take deep breaths without severe pain within 48 hours',
                    ],
                    nursingInterventions: [
                        'Assess pain level using 0-10 scale every 2-4 hours',
                        'Administer analgesics as prescribed and evaluate effectiveness',
                        'Teach splinting techniques for coughing and deep breathing',
                        'Apply heating pad to affected area as tolerated',
                        'Position patient for comfort, typically on affected side',
                        'Monitor for signs of respiratory compromise due to pain',
                    ],
                    medications: [
                        {
                            name: 'Ibuprofen',
                            dosage: '600mg',
                            route: 'PO',
                            frequency: 'q6h',
                            purpose: 'Anti-inflammatory and analgesic for pleuritic pain',
                            nursingConsiderations: 'Administer with food, monitor for GI upset',
                        },
                    ],
                },
            },
        ],
    },
    {
        id: 'cardiovascular',
        name: 'Cardiovascular Care Plans',
        color: '#EF4444',
        topicCount: 12,
        subcategories: [
            {
                id: 'decreased-cardiac-output',
                name: 'Decreased Cardiac Output',
                isBookmarked: false,
                content: {
                    diagnosisTitle: 'Nursing Diagnosis #1: Decreased Cardiac Output',
                    relatedTo: 'Impaired contractility and altered preload/afterload',
                    evidencedBy: 'Tachycardia, decreased BP, fatigue, dyspnea, peripheral edema',
                    patientGoals: [
                        'Patient will maintain adequate cardiac output as evidenced by stable vital signs within 24 hours',
                        'Patient will demonstrate decreased peripheral edema within 48 hours',
                        'Patient will report decreased fatigue and improved activity tolerance within 72 hours',
                    ],
                    nursingInterventions: [
                        'Monitor vital signs and cardiac rhythm continuously',
                        'Assess for signs of decreased perfusion: cool extremities, decreased urine output',
                        'Monitor intake and output strictly, daily weights',
                        'Administer cardiac medications as prescribed',
                        'Maintain oxygen therapy to keep SpO2 >92%',
                        'Limit activities and provide rest periods',
                    ],
                    medications: [
                        {
                            name: 'Furosemide',
                            dosage: '40mg',
                            route: 'IV',
                            frequency: 'q12h',
                            purpose: 'Diuretic to reduce fluid overload and preload',
                            nursingConsiderations:
                                'Monitor electrolytes, particularly potassium, assess for orthostatic hypotension',
                        },
                        {
                            name: 'Metoprolol',
                            dosage: '25mg',
                            route: 'PO',
                            frequency: 'BID',
                            purpose: 'Beta-blocker to reduce heart rate and cardiac workload',
                            nursingConsiderations:
                                'Monitor heart rate and BP before administration, hold if HR <60 or SBP <100',
                        },
                    ],
                },
            },
            {
                id: 'excess-fluid-volume',
                name: 'Excess Fluid Volume',
                isBookmarked: false,
                content: {
                    diagnosisTitle: 'Nursing Diagnosis #2: Excess Fluid Volume',
                    relatedTo: 'Compromised regulatory mechanisms and decreased cardiac output',
                    evidencedBy: 'Peripheral edema 3+, weight gain 5 lbs in 2 days, jugular venous distension',
                    patientGoals: [
                        'Patient will demonstrate reduced edema within 48 hours',
                        'Patient will return to baseline weight within 5 days',
                        'Patient will have clear lung sounds within 72 hours',
                    ],
                    nursingInterventions: [
                        'Monitor daily weights at same time with same scale',
                        'Restrict fluid intake to 1500-2000 mL/day as ordered',
                        'Implement sodium restriction as prescribed',
                        'Monitor intake and output every 4 hours',
                        'Assess lung sounds and peripheral edema every shift',
                        'Elevate extremities to reduce peripheral edema',
                    ],
                    medications: [
                        {
                            name: 'Spironolactone',
                            dosage: '25mg',
                            route: 'PO',
                            frequency: 'Daily',
                            purpose: 'Potassium-sparing diuretic',
                            nursingConsiderations: 'Monitor potassium levels, avoid potassium supplements',
                        },
                    ],
                },
            },
        ],
    },
    {
        id: 'neurological',
        name: 'Neurological Care Plans',
        color: '#8B5CF6',
        topicCount: 10,
        subcategories: [
            {
                id: 'acute-confusion',
                name: 'Acute Confusion',
                isBookmarked: false,
                content: {
                    diagnosisTitle: 'Nursing Diagnosis #1: Acute Confusion',
                    relatedTo: 'Electrolyte imbalance and medication side effects',
                    evidencedBy: 'Disorientation to time and place, fluctuating level of consciousness, restlessness',
                    patientGoals: [
                        'Patient will demonstrate improved orientation to person, place, and time within 48 hours',
                        'Patient will experience reduced episodes of agitation within 24 hours',
                        'Patient will maintain safety without falls or injury throughout hospitalization',
                    ],
                    nursingInterventions: [
                        'Assess mental status and orientation every 4 hours using standardized tool',
                        'Maintain consistent caregivers and daily routines',
                        'Provide reality orientation: clocks, calendars, family photos',
                        'Ensure adequate lighting and reduce excessive noise',
                        'Review medications for potential contributing factors',
                        'Monitor lab values: electrolytes, glucose, oxygen saturation',
                    ],
                    medications: [
                        {
                            name: 'Haloperidol',
                            dosage: '0.5mg',
                            route: 'PO',
                            frequency: 'q6h PRN',
                            purpose: 'Management of severe agitation and confusion',
                            nursingConsiderations: 'Use lowest effective dose, monitor for extrapyramidal symptoms',
                        },
                    ],
                },
            },
            {
                id: 'risk-injury',
                name: 'Risk for Injury',
                isBookmarked: false,
                content: {
                    diagnosisTitle: 'Nursing Diagnosis #2: Risk for Injury',
                    relatedTo: 'Altered level of consciousness and impaired mobility',
                    evidencedBy: 'History of falls, confusion, weakness, impaired gait',
                    patientGoals: [
                        'Patient will remain free from injury throughout hospitalization',
                        'Patient will demonstrate understanding of safety measures within 24 hours',
                        'Caregiver will verbalize fall prevention strategies before discharge',
                    ],
                    nursingInterventions: [
                        'Complete fall risk assessment on admission and daily',
                        'Implement fall precautions: bed alarm, non-skid socks, call light within reach',
                        'Keep environment clear of clutter and well-lit',
                        'Assist with ambulation and transfers',
                        'Orient patient to surroundings and review safety measures',
                        'Educate family on fall prevention strategies',
                    ],
                    medications: [],
                },
            },
        ],
    },
    {
        id: 'pain-comfort',
        name: 'Pain & Comfort Care Plans',
        color: '#F59E0B',
        topicCount: 6,
        subcategories: [
            {
                id: 'acute-pain',
                name: 'Acute Pain Management',
                isBookmarked: false,
                content: {
                    diagnosisTitle: 'Nursing Diagnosis #1: Acute Pain',
                    relatedTo: 'Surgical incision and tissue trauma',
                    evidencedBy: 'Patient reports pain 8/10, grimacing, guarding behavior, elevated vital signs',
                    patientGoals: [
                        'Patient will report pain level of 3/10 or less within 2 hours of intervention',
                        'Patient will demonstrate use of non-pharmacological pain relief methods within 24 hours',
                        'Patient will achieve adequate rest and sleep with pain control within 48 hours',
                    ],
                    nursingInterventions: [
                        'Assess pain using 0-10 scale before and after interventions',
                        'Administer analgesics as prescribed on regular schedule',
                        'Teach non-pharmacological pain management: relaxation, positioning, cold/heat therapy',
                        'Monitor for adverse effects of pain medications',
                        'Assess effectiveness of pain management plan regularly',
                        'Document pain assessments and interventions thoroughly',
                    ],
                    medications: [
                        {
                            name: 'Morphine',
                            dosage: '4mg',
                            route: 'IV',
                            frequency: 'q4h PRN',
                            purpose: 'Opioid analgesic for moderate to severe pain',
                            nursingConsiderations: 'Monitor respiratory rate, sedation level, and bowel function',
                        },
                        {
                            name: 'Acetaminophen',
                            dosage: '650mg',
                            route: 'PO',
                            frequency: 'q6h',
                            purpose: 'Non-opioid analgesic for mild to moderate pain',
                            nursingConsiderations: 'Monitor total daily dose, not to exceed 4000mg/day',
                        },
                    ],
                },
            },
            {
                id: 'chronic-pain',
                name: 'Chronic Pain Management',
                isBookmarked: false,
                content: {
                    diagnosisTitle: 'Nursing Diagnosis #2: Chronic Pain',
                    relatedTo: 'Degenerative joint disease and nerve damage',
                    evidencedBy: 'Reports persistent pain 6/10 for >3 months, limited mobility, depression',
                    patientGoals: [
                        'Patient will report pain at manageable level 4/10 or less within 1 week',
                        'Patient will demonstrate three non-pharmacological pain management techniques within 72 hours',
                        'Patient will show improved functional ability and participation in ADLs within 2 weeks',
                    ],
                    nursingInterventions: [
                        'Complete comprehensive pain assessment including quality, location, duration',
                        'Develop individualized pain management plan with patient input',
                        'Teach various pain management strategies: heat/cold, massage, distraction',
                        'Encourage physical activity within tolerance',
                        'Assess for signs of depression and provide psychosocial support',
                        'Coordinate care with pain management specialist if needed',
                    ],
                    medications: [
                        {
                            name: 'Gabapentin',
                            dosage: '300mg',
                            route: 'PO',
                            frequency: 'TID',
                            purpose: 'Neuropathic pain management',
                            nursingConsiderations:
                                'Monitor for dizziness and sedation, dose should be titrated gradually',
                        },
                    ],
                },
            },
        ],
    },
    {
        id: 'infection',
        name: 'Infection Control Care Plans',
        color: '#10B981',
        topicCount: 7,
        subcategories: [
            {
                id: 'risk-infection',
                name: 'Risk for Infection',
                isBookmarked: false,
                content: {
                    diagnosisTitle: 'Nursing Diagnosis #1: Risk for Infection',
                    relatedTo: 'Invasive procedures and immunosuppression',
                    evidencedBy: 'Central line present, WBC 3.2, receiving chemotherapy',
                    patientGoals: [
                        'Patient will remain free from signs and symptoms of infection',
                        'Patient will verbalize infection prevention measures within 24 hours',
                        'Patient will maintain WBC within acceptable limits throughout treatment',
                    ],
                    nursingInterventions: [
                        'Monitor vital signs every 4 hours, report fever >38°C immediately',
                        'Perform hand hygiene before and after patient contact',
                        'Maintain aseptic technique for all invasive procedures',
                        'Assess central line site daily for redness, swelling, drainage',
                        'Monitor lab values: WBC, differential count',
                        'Limit visitors with active infections',
                    ],
                    medications: [
                        {
                            name: 'Cefazolin',
                            dosage: '1g',
                            route: 'IV',
                            frequency: 'q8h',
                            purpose: 'Prophylactic antibiotic therapy',
                            nursingConsiderations: 'Monitor for allergic reactions, assess renal function',
                        },
                    ],
                },
            },
        ],
    },
];
