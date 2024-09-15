import { useImage } from '../context/imagecontext';
import { cropImage } from '../helper/apicaller';

function Crop() {
  const { setPreviewUrl, setOriginalPath, manipulations, originalPath, crop } =
    useImage();
  const handleCrop = async () => {
    if (!originalPath) return;
    const data = await cropImage({
      ...manipulations,
      crop,
      filePath: originalPath,
    });
    if (data.error) {
      alert(data.error);
      return;
    }
    setOriginalPath(data.originalPath);
    setPreviewUrl('http://localhost:3000/image/' + data.filePath);
  };
  return (
    <div className="p-2">
      <p className="text-gray-400">*Drag over image to crop.</p>
      <button
        onClick={handleCrop}
        type="button"
        className="mt-4 text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded text-md px-5 py-1 me-2 mb-2"
      >
        crop
      </button>
    </div>
  );
}

export default Crop;
