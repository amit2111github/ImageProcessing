import { type Crop } from 'react-image-crop';
export interface ImageContextType {
  image: File | null;
  previewUrl: string | undefined;
  originalPath: string | undefined;
  manipulations: {
    brightness: number;
    contrast: number;
    saturation: number;
    rotation: number;
  };
  crop: Crop | undefined;
  setCrop: (value: Crop) => void;
  setImage: (file: File) => void;
  setManipulation: (type: string, value: number) => void;
  setPreviewUrl: (url: string) => void;
  setOriginalPath: (url: string) => void;
}

export type Modulator = {
  value: number;
  max: number;
  min: number;
  step: number;
  name: string;
  unit?: string;
  type: string;
};
