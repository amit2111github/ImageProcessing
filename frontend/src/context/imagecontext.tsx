import { createContext, useContext, useEffect, useState } from 'react';
import { processImage } from '../helper/apicaller';
import { type Crop } from 'react-image-crop';
import { ImageContextType } from '../helper/types';

const ImageContext = createContext<ImageContextType | undefined>(undefined);

const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [originalPath, setOriginalPath] = useState<string | undefined>(
    undefined
  );
  const [manipulations, setManipulations] = useState({
    brightness: 1.0,
    contrast: 1.0,
    saturation: 1.0,
    rotation: 0,
  });
  const [crop, setCrop] = useState<Crop | undefined>(undefined);

  const setManipulation = (type: string, value: number) => {
    setManipulations((prev) => ({ ...prev, [type]: value }));
  };
  useEffect(() => {
    const id = setTimeout(async () => {
      if (!originalPath) return;
      const data = await processImage({
        ...manipulations,
        filePath: originalPath,
      });
      if (data?.error) {
        alert(data.error);
        return;
      }
      setPreviewUrl('http://localhost:3000/image/' + data.filePath);
    }, 100);
    return () => {
      clearTimeout(id);
    };
  }, [manipulations]);

  return (
    <ImageContext.Provider
      value={{
        crop,
        setCrop,
        image,
        previewUrl,
        originalPath,
        setOriginalPath,
        setPreviewUrl,
        manipulations,
        setImage,
        setManipulation,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = (): ImageContextType => {
  const data = useContext(ImageContext);
  if (data === undefined) {
    throw Error('Cannot be undefined');
  }
  return data;
};

export default ImageProvider;
