
export function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    "Fundamentals of Nursing": "#4CAF50",          
    "Medical Surgical Nursing": "#2196F3",        
    "Maternal Newborn Nursing": "#E91E63",       
    "Pediatric Nursing": "#FF9800",            
    "Mental Health Nursing": "#9C27B0",       
    "Pharmacology": "#F44336",               
    "Critical Care Nursing": "#607D8B",          
    "Community Health Nursing": "#009688",      
    "Nursing Leadership and Management": "#795548", 
    "Gerontological Nursing": "#607D8B",      
    "ECG Interpretation": "#3F51B5",            
    "Dosage Calculations": "#FF5722",            
    "Nursing Assessment": "#00BCD4",        
    "Clinical Skills": "#8BC34A",     

    // fallback
    default: "#757575",
  };

  return colorMap[category] || colorMap.default;
}

export function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    "Fundamentals of Nursing": "🩺",
    "Medical Surgical Nursing": "🏥",
    "Maternal Newborn Nursing": "👶",
    "Pediatric Nursing": "👧",
    "Mental Health Nursing": "🧠",
    "Pharmacology": "💊",
    "Critical Care Nursing": "🩹",
    "Community Health Nursing": "🌍",
    "Nursing Leadership and Management": "👔",
    "Gerontological Nursing": "👵",
    "ECG Interpretation": "📊",
    "Dosage Calculations": "🧮",
    "Nursing Assessment": "🔍",
    "Clinical Skills": "✂️",

    // fallback
    default: "📚",
  };

  return iconMap[category] || iconMap.default;
}