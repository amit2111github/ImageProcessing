import './App.css';
import ImageUpload from './components/ImageUpload';
import { useImage } from './context/imagecontext';

function App() {
  const { previewUrl } = useImage();

  return (
    <div className="border rounded-sm w-[90%] mx-auto grid grid-cols-12">
      <div className="col-span-8 border border-red-400">
        <h1 className="text-lg">Filters</h1>
      </div>
      <div className="col-span-4 border border-red-400">
        {previewUrl && <img src={previewUrl} alt="preview image" />}
        <ImageUpload />
      </div>
    </div>
  );
}

export default App;
