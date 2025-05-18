// hooks/useEraseBg.ts
import { useState } from "react";

export const useEraseBg = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const removeBackground = async (imageFile: File): Promise<Blob | null> => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("image_file", imageFile);

      const response = await fetch("https://api.erase.bg/remove-bg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to remove background");
      }

      const result = await response.json();
      const imageUrl = result.data.url;

      const imageResponse = await fetch(imageUrl);
      const blob = await imageResponse.blob();

      return blob;
    } catch (error) {
      console.error("Error removing background:", error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return { removeBackground, isProcessing };
};
