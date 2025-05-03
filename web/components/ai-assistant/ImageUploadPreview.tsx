import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ImageUploadPreviewProps {
  image: File;
  onRemove: () => void;
}

export const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({ 
  image, 
  onRemove 
}) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(image);
  }, [image]);
  
  if (!preview) {
    return null;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group"
    >
      <div className="h-20 w-20 rounded-lg overflow-hidden border-2 border-green-100 shadow-sm">
        <img 
          src={preview} 
          alt={image.name} 
          className="h-full w-full object-cover"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-200 opacity-90 group-hover:opacity-100"
      >
        <X className="h-3 w-3 text-gray-600" />
      </motion.button>
    </motion.div>
  );
};