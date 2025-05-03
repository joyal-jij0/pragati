import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  color 
}) => {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, hover: string, border: string, shadow: string, text: string, ringFocus: string }> = {
      blue: { 
        bg: "bg-blue-50", 
        hover: "hover:bg-blue-100", 
        border: "border-blue-100",
        shadow: "shadow-blue-100/50",
        text: "text-blue-600",
        ringFocus: "focus:ring-blue-400"
      },
      green: { 
        bg: "bg-green-50", 
        hover: "hover:bg-green-100", 
        border: "border-green-100",
        shadow: "shadow-green-100/50",
        text: "text-green-600",
        ringFocus: "focus:ring-green-400"
      },
      amber: { 
        bg: "bg-amber-50", 
        hover: "hover:bg-amber-100", 
        border: "border-amber-100",
        shadow: "shadow-amber-100/50",
        text: "text-amber-600",
        ringFocus: "focus:ring-amber-400"
      },
      red: { 
        bg: "bg-red-50", 
        hover: "hover:bg-red-100", 
        border: "border-red-100",
        shadow: "shadow-red-100/50",
        text: "text-red-600",
        ringFocus: "focus:ring-red-400"
      },
      purple: { 
        bg: "bg-purple-50", 
        hover: "hover:bg-purple-100", 
        border: "border-purple-100",
        shadow: "shadow-purple-100/50",
        text: "text-purple-600",
        ringFocus: "focus:ring-purple-400"
      },
      sky: { 
        bg: "bg-sky-50", 
        hover: "hover:bg-sky-100", 
        border: "border-sky-100",
        shadow: "shadow-sky-100/50",
        text: "text-sky-600",
        ringFocus: "focus:ring-sky-400"
      },
      orange: { 
        bg: "bg-orange-50", 
        hover: "hover:bg-orange-100", 
        border: "border-orange-100",
        shadow: "shadow-orange-100/50",
        text: "text-orange-600",
        ringFocus: "focus:ring-orange-400"
      },
    };
    
    return colorMap[color] || colorMap.green;
  };
  
  const { bg, hover, border, shadow, text, ringFocus } = getColorClasses(color);
  
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className={`p-5 rounded-xl ${bg} ${hover} border ${border} cursor-pointer transition-all duration-300 shadow-md ${shadow} focus:outline-none focus:ring-2 ${ringFocus}`}
      tabIndex={0}
    >
      <div className="flex items-start gap-4">
        <div className={`text-3xl ${text} bg-white h-12 w-12 rounded-full flex items-center justify-center shadow-sm`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-800 text-lg">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          
          <motion.div 
            className={`mt-4 flex items-center text-sm font-medium ${text} group`}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span>Ask about this</span>
            <motion.div
              className="ml-1 transition-transform"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};