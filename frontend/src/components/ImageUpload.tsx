import { useState } from 'react';
import { useImage } from '../context/imagecontext';
import { uploadImage } from '../helper/apicaller';
import { useNavigate } from 'react-router-dom';

function ImageUpload() {
  const navigate = useNavigate();
  const { setImage, setOriginalPath, setPreviewUrl, image } = useImage();
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    const data = await uploadImage(formData);
    setLoading(false);
    if (data?.error) {
      alert(data.error);
      return;
    }
    setOriginalPath(data.filePath);
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    navigate('/filter');
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };
  return (
    <div
      className="flex items-center justify-center w-[60%] m-auto mt-[40px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 ${
          dragging ? 'bg-blue-200' : ''
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPEG file image only</p>
          {image && (
            <>
              <p className="text-xs text-gray-500 mt-2">{image.name}</p>
              <button
                disabled={loading}
                onClick={handleUpload}
                type="button"
                className="mt-4 text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded text-md px-5 py-1 me-2 mb-2"
              >
                {loading ? 'uploading...' : 'upload'}
              </button>
            </>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/png image/jepg"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default ImageUpload;
