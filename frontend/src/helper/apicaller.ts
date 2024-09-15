import axios from 'axios';
const api = 'http://localhost:3000';
import { type Crop } from 'react-image-crop';
type Manipulations = {
  brightness: number;
  contrast: number;
  saturation: number;
  rotation: number;
  filePath: string;
  crop?: Crop;
  format?: string;
  originalPath?: string;
};

export const uploadImage = async (formData: FormData) => {
  try {
    const response = await axios.post(`${api}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const data = await response.data;
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const processImage = async (payload: Manipulations) => {
  try {
    const response = await axios.put(`${api}/process`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.data;
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const cropImage = async (payload: Manipulations) => {
  try {
    const response = await axios.put(`${api}/process/crop`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.data;
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const download = async (payload: Manipulations) => {
  try {
    const response = await axios.put(`${api}/download`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    });
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = response.headers['content-disposition']
      ? response.headers['content-disposition'].split('filename=')[1]
      : 'downloaded_file';
    link.download = fileName.replace(/['"]/g, '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert('Failed to download');
    }
  }
};
