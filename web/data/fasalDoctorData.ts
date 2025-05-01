export const commonDiseases = [
    {
      id: 1,
      name: "Leaf Blight",
      crops: ["Wheat", "Maize", "Rice"],
      symptoms: [
        "Brown or black spots on leaves",
        "Drying of leaves",
        "Stunted plant growth"
      ],
      causes: "Fungal infection, excessive moisture",
      treatment: "Fungicide spray, crop rotation",
      preventiveMeasures: [
        "Use resistant varieties",
        "Proper drainage",
        "Seed treatment"
      ],
      severity: "high",
      icon: "🍂",
      images: [
        "https://example.com/leaf-blight-1.jpg",
        "https://example.com/leaf-blight-2.jpg"
      ]
    },
    {
      id: 2,
      name: "Powdery Mildew",
      crops: ["Grapes", "Tomato", "Chilli"],
      symptoms: [
        "White powdery coating on leaves",
        "Wilting of leaves",
        "Deformed fruits"
      ],
      causes: "Fungal infection, hot and dry weather",
      treatment: "Sulfur-based fungicide, neem oil",
      preventiveMeasures: [
        "Ensure adequate air circulation between plants",
        "Remove infected leaves",
        "Irrigate at the right time"
      ],
      severity: "medium",
      icon: "⚪",
      images: [
        "https://example.com/powdery-mildew-1.jpg",
        "https://example.com/powdery-mildew-2.jpg"
      ]
    },
    {
      id: 3,
      name: "Root Rot",
      crops: ["Soybean", "Chickpea", "Pea"],
      symptoms: [
        "Blackening and rotting of roots",
        "Wilting of plants",
        "Yellowing of leaves"
      ],
      causes: "Excessive moisture, fungal infection in soil",
      treatment: "Fungicide drench, improve drainage",
      preventiveMeasures: [
        "Proper drainage",
        "Crop rotation",
        "Use healthy seeds"
      ],
      severity: "high",
      icon: "🌱",
      images: [
        "https://example.com/root-rot-1.jpg",
        "https://example.com/root-rot-2.jpg"
      ]
    }
];

export const commonPests = [
    {
      id: 1,
      name: "Aphids",
      crops: ["Vegetables", "Fruits", "Cereals"],
      symptoms: [
        "Curling of leaves",
        "Sticky honeydew",
        "Stunted plant growth"
      ],
      damage: "Suck sap, weakening plants, spread viruses",
      control: "Neem oil, soap solution, natural predators like ladybugs",
      preventiveMeasures: [
        "Regular inspection",
        "Plant healthy crops",
        "Weed control"
      ],
      severity: "medium",
      icon: "🐜",
      images: [
        "https://example.com/aphids-1.jpg",
        "https://example.com/aphids-2.jpg"
      ]
    },
    {
      id: 2,
      name: "Fall Armyworm",
      crops: ["Maize", "Sorghum", "Millet"],
      symptoms: [
        "Holes in leaves",
        "Ragged leaf edges",
        "Damage to cobs"
      ],
      damage: "Consume leaves and fruits, causing destruction",
      control: "Bacillus thuringiensis, spinosad, natural predators",
      preventiveMeasures: [
        "Early sowing",
        "Pheromone traps",
        "Crop rotation"
      ],
      severity: "high",
      icon: "🐛",
      images: [
        "https://example.com/armyworm-1.jpg",
        "https://example.com/armyworm-2.jpg"
      ]
    },
    {
      id: 3,
      name: "Thrips",
      crops: ["Onion", "Chilli", "Cotton"],
      symptoms: [
        "Silver-like spots on leaves",
        "Curling of leaves",
        "Flower drop"
      ],
      damage: "Suck sap from leaves and flowers, spread viruses",
      control: "Neem oil, spinosad, blue sticky traps",
      preventiveMeasures: [
        "Regular irrigation",
        "Weed control",
        "Use resistant varieties"
      ],
      severity: "medium",
      icon: "🐞",
      images: [
        "https://example.com/thrips-1.jpg",
        "https://example.com/thrips-2.jpg"
      ]
    }
];

export const diagnosisHistory = [
    {
      id: 1,
      date: "15 October, 2023",
      crop: "Tomato",
      disease: "Early Blight",
      confidence: 92,
      status: "Treated",
      treatment: "Mancozeb 75% WP spray",
      result: "Successful",
      image: "https://example.com/tomato-early-blight.jpg"
    },
    {
      id: 2,
      date: "28 September, 2023",
      crop: "Rice",
      disease: "Blast",
      confidence: 88,
      status: "Treated",
      treatment: "Tricyclazole 75% WP spray",
      result: "Partially Successful",
      image: "https://example.com/rice-blast.jpg"
    },
    {
      id: 3,
      date: "10 September, 2023",
      crop: "Chilli",
      disease: "Aphids",
      confidence: 95,
      status: "Treated",
      treatment: "Imidacloprid 17.8% SL spray",
      result: "Successful",
      image: "https://example.com/chili-aphids.jpg"
    }
];

export const treatmentRecommendations = [
    {
      id: 1,
      disease: "Early Blight",
      crop: "Tomato",
      chemical: [
        {
          name: "Mancozeb 75% WP",
          dosage: "2-2.5 grams/liter of water",
          frequency: "Every 7-10 days",
          precautions: "Do not apply 4-6 hours before rain, wear protective gear"
        },
        {
          name: "Chlorothalonil 75% WP",
          dosage: "1-2 grams/liter of water",
          frequency: "Every 7-14 days",
          precautions: "Do not apply 2-3 hours before rain, wear protective gear"
        }
      ],
      organic: [
        {
          name: "Neem Oil",
          dosage: "5 ml/liter of water",
          frequency: "Every 7 days",
          precautions: "Spray in the morning or evening"
        },
        {
          name: "Trichoderma viride",
          dosage: "5 grams/liter of water",
          frequency: "Every 15 days",
          precautions: "Spray in the evening"
        }
      ],
      culturalPractices: [
        "Remove and destroy infected leaves",
        "Ensure adequate air circulation between plants",
        "Avoid wetting leaves during irrigation"
      ]
    },
    {
      id: 2,
      disease: "Powdery Mildew",
      crop: "Grapes",
      chemical: [
        {
          name: "Sulfur 80% WP",
          dosage: "2-3 grams/liter of water",
          frequency: "Every 10-15 days",
          precautions: "Avoid use on hot days, wear protective gear"
        },
        {
          name: "Hexaconazole 5% EC",
          dosage: "1 ml/liter of water",
          frequency: "Every 15 days",
          precautions: "Do not apply 4-6 hours before rain, wear protective gear"
        }
      ],
      organic: [
        {
          name: "Baking Soda",
          dosage: "5 grams/liter of water",
          frequency: "Every 7 days",
          precautions: "Spray in the morning or evening"
        },
        {
          name: "Milk Solution",
          dosage: "100 ml milk/liter of water",
          frequency: "Every 7 days",
          precautions: "Spray in the morning"
        }
      ],
      culturalPractices: [
        "Ensure adequate air circulation between plants",
        "Remove and destroy infected leaves",
        "Avoid wetting leaves during irrigation"
      ]
    },
    {
      id: 3,
      disease: "Root Rot",
      crop: "Soybean",
      chemical: [
        {
          name: "Metalaxyl 35% WS",
          dosage: "2 grams/liter of water",
          frequency: "Every 15 days",
          precautions: "Mix well in soil, wear protective gear"
        },
        {
          name: "Carbendazim 50% WP",
          dosage: "1 gram/liter of water",
          frequency: "Every 10-15 days",
          precautions: "Do not apply 6 hours before rain, wear protective gear"
        }
      ],
      organic: [
        {
          name: "Trichoderma viride",
          dosage: "10 grams/kg of seed",
          frequency: "Seed treatment before sowing",
          precautions: "Do not expose treated seeds to sunlight for 24 hours"
        },
        {
          name: "Pseudomonas fluorescens",
          dosage: "10 grams/liter of water",
          frequency: "Every 15 days",
          precautions: "Spray in the evening"
        }
      ],
      culturalPractices: [
        "Ensure proper drainage",
        "Adopt crop rotation",
        "Use healthy seeds"
      ]
    }
];

export const preventiveMeasures = [
    {
      id: 1,
      category: "Crop Rotation",
      description: "Avoid growing the same crop repeatedly in the same field. Crop rotation maintains soil fertility and reduces pest and disease incidence.",
      benefits: [
        "Improves soil fertility",
        "Reduces pest and disease incidence",
        "Helps in weed control"
      ],
      icon: "🔄"
    },
    {
      id: 2,
      category: "Healthy Seeds",
      description: "Use certified and healthy seeds. Treat seeds before sowing to prevent seed-borne diseases.",
      benefits: [
        "Protection from seed-borne diseases",
        "Good germination rate",
        "Healthy plant development"
      ],
      icon: "🌱"
    },
    {
      id: 3,
      category: "Water Management",
      description: "Ensure proper drainage and schedule irrigation based on crop requirements.",
      benefits: [
        "Prevents root rot",
        "Saves water",
        "Promotes healthy plant growth"
      ],
      icon: "💧"
    }
];

export const communityInsights = [
    {
      id: 1,
      farmer: "Rajesh Patil",
      location: "Nashik, Maharashtra",
      crop: "Tomato",
      problem: "Early Blight",
      solution: "Regular inspection and timely fungicide spray",
      results: "Saved 80% of the crop",
      testimonial: "With Fasal Doctor's help, I identified the disease on time and applied proper treatment, saving most of my crop.",
      date: "August 2023",
      image: "https://example.com/farmer1.jpg"
    },
    {
      id: 2,
      farmer: "Sunil Sharma",
      location: "Karnal, Haryana",
      crop: "Wheat",
      problem: "Rust Disease",
      solution: "Propiconazole 25% EC spray",
      results: "25% increase in yield",
      testimonial: "By following Fasal Doctor's recommended treatment, I controlled the disease and increased my yield.",
      date: "March 2023",
      image: "https://example.com/farmer2.jpg"
    },
    {
      id: 3,
      farmer: "Amit Yadav",
      location: "Agra, Uttar Pradesh",
      crop: "Potato",
      problem: "Late Blight",
      solution: "Mancozeb and Metalaxyl mixture spray",
      results: "40% higher profit",
      testimonial: "By following Fasal Doctor's preventive suggestions, I protected my potato crop from late blight and earned good profits.",
      date: "January 2023",
      image: "https://example.com/farmer3.jpg"
    }
];

export const fasalDoctorData = {
    mainPage: {
      title: "Fasal Doctor",
      subtitle: "Monitor your crop health and identify diseases",
      introCard: {
        title: "Check Your Crop Health",
        description: "Fasal Doctor helps identify diseases and pests in your crops and provides appropriate treatment solutions.",
        stats: [
          { text: "95% accuracy" },
          { text: "100+ diseases identified" },
          { text: "50+ crops supported" }
        ],
        ctaText: "Check your crop now and get timely treatment.",
        buttonText: "Start Now"
      },
      tabs: [
        { label: "Disease Identification", value: "diagnosis" },
        { label: "Treatment", value: "treatment" },
        { label: "Pests", value: "pests" },
        { label: "Diseases", value: "diseases" },
        { label: "History", value: "history" },
        { label: "Prevention", value: "prevention" },
        { label: "Community", value: "community" }
      ],
      successStories: {
        title: "Success Stories",
        viewAllText: "View All",
        stories: [
          {
            tag: "Tomato",
            title: "Saved Crop from Early Blight",
            description: "With Fasal Doctor's help, timely identification and treatment saved 80% of the crop.",
            date: "October 2023",
            readMoreText: "Read More",
            gradient: "from-red-50 to-red-100",
            border: "border-red-200",
            tagBg: "bg-red-100",
            tagText: "text-red-800",
            buttonText: "text-red-600"
          },
          {
            tag: "Wheat",
            title: "Successful Rust Disease Management",
            description: "Timely treatment resulted in 25% higher yield for the wheat crop.",
            date: "March 2023",
            readMoreText: "Read More",
            gradient: "from-amber-50 to-amber-100",
            border: "border-amber-200",
            tagBg: "bg-amber-100",
            tagText: "text-amber-800",
            buttonText: "text-amber-600"
          },
          {
            tag: "Potato",
            title: "Prevented Late Blight",
            description: "Preventive measures saved the potato crop from late blight, earning 40% more profit.",
            date: "January 2023",
            readMoreText: "Read More",
            gradient: "from-green-50 to-green-100",
            border: "border-green-200",
            tagBg: "bg-green-100",
            tagText: "text-green-800",
            buttonText: "text-green-600"
          }
        ]
      },
      helpSection: {
        title: "Need Expert Help?",
        description: "Connect with agricultural experts for personalized guidance",
        buttonText: "Connect with Expert"
      }
    },
    diseaseIdentification: {
      uploadSection: {
        title: "Upload Photo",
        description: "Upload a picture of your affected crop",
        uploadButtonText: "Choose Photo",
        dragDropText: "Or drag and drop the photo here",
        supportedFormats: "JPG, PNG, WEBP (maximum 5MB)"
      },
      resultsSection: {
        title: "Results",
        description: "Analysis of your affected crop",
        noResultsText: "No results found, please try again"
      },
      sampleResults: {
        diseaseName: "Leaf Blight",
        confidence: 0.92,
        description: "Leaf Blight is a fungal disease causing brown or black spots on leaves",
        symptoms: [
          "Brown or black spots on leaves",
          "Drying of leaves",
          "Stunted plant growth"
        ],
        causes: [
          "Fungal infection",
          "Excessive moisture",
          "Poor air circulation"
        ],
        severity: "medium"
      }
    }
};

export const diseaseIdentificationData = {
  uploadSection: {
    title: "Crop Disease Identification",
    description: "Upload an image of your crop and our AI will analyze it",
    dragDropText: "Drag and drop image here",
    orText: "or choose from your device",
    browseText: "Choose File",
    analyzeButtonText: "Analyze",
    analyzingText: "Analyzing...",
    uploadTips: [
      "Upload clear, well-lit images",
      "Show close-ups of affected leaves or crop parts",
      "Upload multiple images from different angles"
    ]
  },
  resultsSection: {
    title: "Analysis Results",
    diseaseDetailsTitle: "Disease Details",
    treatmentTitle: "Treatment Recommendations",
    similarCasesTitle: "Similar Cases",
    shareButtonText: "Share Results",
    saveButtonText: "Save Results",
    consultButtonText: "Consult Expert"
  },
  sampleResults: {
    diseaseName: "Leaf Blight",
    confidence: 92,
    description: "This is a major fungal disease that creates brown or black spots on leaves and eventually dries out the leaves.",
    symptoms: [
      "Brown or black spots on leaves",
      "Drying of leaves",
      "Stunted plant growth"
    ],
    causes: [
      "Fungal infection (Alternaria or Helminthosporium)",
      "Excessive moisture and warm weather",
      "Poor air circulation"
    ],
    severity: "high"
  }
};

export const diseaseIdentificationAnimations = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  },
  floatVariants: {
    hover: {
      y: -5,
      transition: {
        yoyo: Infinity,
        duration: 1.5
      }
    }
  }
};

export const fallbackTreatmentData = {
  treatments: [
    {
      title: "Fungicide Application",
      description: "Apply copper-based fungicide spray to affected plants. Ensure complete coverage of foliage.",
      timeline: "Apply every 7-10 days until symptoms subside",
      effectiveness: "high"
    },
    {
      title: "Improve Air Circulation",
      description: "Prune surrounding vegetation to improve airflow around affected plants.",
      timeline: "Immediate action recommended",
      effectiveness: "medium"
    },
    {
      title: "Soil Management",
      description: "Ensure proper drainage and avoid overwatering to reduce humidity levels.",
      timeline: "Ongoing practice",
      effectiveness: "medium"
    }
  ],
  preventiveMeasures: [
    "Use disease-resistant varieties in future plantings",
    "Implement crop rotation practices",
    "Maintain proper plant spacing for adequate airflow",
    "Apply preventive fungicides during high-risk periods"
  ]
};

export const fallbackCaseHistoryData = [
  {
    id: "case-001",
    disease: "Leaf Blight",
    date: "2023-06-15",
    location: "Maharashtra, India",
    cropType: "Wheat",
    severity: "medium",
    resolution: "Resolved with fungicide treatment within 14 days",
    farmerName: "Rajesh Kumar",
    imageUrl: "https://placehold.co/100x100/green/white?text=Case"
  },
  {
    id: "case-002",
    disease: "Leaf Blight",
    date: "2023-05-22",
    location: "Punjab, India",
    cropType: "Wheat",
    severity: "high",
    resolution: "Required multiple treatments and partial crop loss",
    farmerName: "Amit Singh",
    imageUrl: "https://placehold.co/100x100/green/white?text=Case"
  },
  {
    id: "case-003",
    disease: "Leaf Blight",
    date: "2023-07-03",
    location: "Uttar Pradesh, India",
    cropType: "Rice",
    severity: "low",
    resolution: "Early detection led to quick resolution with minimal treatment",
    farmerName: "Priya Sharma",
    imageUrl: "https://placehold.co/100x100/green/white?text=Case"
  }
];

export const fallbackCommunityInsightsData = [
  {
    id: "insight-001",
    author: {
      name: "Dr. Patel",
      role: "Agricultural Scientist",
      avatar: "https://placehold.co/50x50/green/white?text=DP"
    },
    title: "Effective Management of Leaf Blight",
    content: "I've found that early morning application of fungicides yields better results as it allows for better absorption before the heat of the day.",
    likes: 42,
    date: "2023-08-10",
    relatedDiseases: ["Leaf Blight"]
  },
  {
    id: "insight-002",
    author: {
      name: "Farmer Suresh",
      role: "Experienced Farmer",
      avatar: "https://placehold.co/50x50/green/white?text=FS"
    },
    title: "Traditional Remedies for Leaf Blight",
    content: "My family has been using neem oil mixed with water as a natural fungicide for generations. It's especially effective for early-stage infections.",
    likes: 28,
    date: "2023-07-25",
    relatedDiseases: ["Leaf Blight"]
  },
  {
    id: "insight-003",
    author: {
      name: "Agro-Tech Solutions",
      role: "Agricultural Company",
      avatar: "https://placehold.co/50x50/green/white?text=AT"
    },
    title: "New Research on Leaf Blight Resistance",
    content: "Our latest field trials show that crop varieties with the XR-7 gene demonstrate up to 75% higher resistance to this disease under various conditions.",
    likes: 56,
    date: "2023-09-05",
    relatedDiseases: ["Leaf Blight"]
  }
];

export const diseaseIdentificationHelpers = {
  getSeverityColor: (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-amber-600 bg-amber-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-blue-600 bg-blue-100";
    }
  },
  getSeverityIcon: (severity: string, iconSize: string = "h-4 w-4") => {
    return { severity, iconSize };
  }
};