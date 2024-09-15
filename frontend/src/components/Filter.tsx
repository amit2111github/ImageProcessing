import { useNavigate } from 'react-router-dom';
import { useImage } from '../context/imagecontext';
import FilterMenu from './FilterMenu';

import ReactCrop, { type Crop } from 'react-image-crop';

import { useEffect } from 'react';

function Filter() {
  const navigate = useNavigate();
  const { previewUrl } = useImage();
  const { crop, setCrop } = useImage();
  useEffect(() => {
    if (!previewUrl) {
      navigate('/');
      return;
    }
  }, [previewUrl]);

  const handleCrop = (c: Crop) => {
    setCrop(c);
  };
  return (
    <div className="rounded-lg w-[90%] mx-auto grid grid-cols-12 mt-[50px] shadow-xl">
      <div className="col-span-12 md:col-span-5 mt-2">
        <h1 className="text-center">Filters</h1>
        <div className="p-2">
          <FilterMenu />
        </div>
      </div>
      <div className="col-span-12 md:col-span-7 border">
        <ReactCrop crop={crop} onChange={handleCrop}>
          <img
            src={previewUrl}
            alt="preview image"
            width="100%"
            className="h-[350px]"
          />
        </ReactCrop>
      </div>
    </div>
  );
}

export default Filter;
