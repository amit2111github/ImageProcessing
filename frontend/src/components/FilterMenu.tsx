import Modulator from './Modulator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useImage } from '../context/imagecontext';
import 'react-image-crop/dist/ReactCrop.css';
import Crop from './Crop';
import Download from './Download';

const tabData = [
  { value: 'Brightness' },
  { value: 'Contrast' },
  { value: 'Rotate' },
  { value: 'Crop' },
  { value: 'Saturation' },
];

function FilterMenu() {
  const {
    manipulations: { rotation, saturation, brightness, contrast },
  } = useImage();

  return (
    <Tabs defaultValue={tabData[0].value}>
      <TabsList className="flex justify-start gap-4 flex-wrap">
        {tabData.map((tab, index) => {
          return (
            <TabsTrigger value={tab.value} key={index}>
              {tab.value}
            </TabsTrigger>
          );
        })}

        <Download />
      </TabsList>
      <div className="mt-3">
        <TabsContent value="Rotate">
          <Modulator
            value={rotation}
            max={360}
            min={0}
            step={1}
            name="Rotation"
            unit="deg"
            type="rotation"
          />
        </TabsContent>
        <TabsContent value="Brightness">
          <Modulator
            value={brightness}
            max={2.0}
            min={0.0}
            step={0.1}
            name="Brightness"
            unit=""
            type="brightness"
          />
        </TabsContent>
        <TabsContent value="Contrast">
          <Modulator
            value={contrast}
            max={2.0}
            min={0.0}
            step={0.1}
            name="Contrast"
            unit=""
            type="contrast"
          />
        </TabsContent>
        <TabsContent value="Saturation">
          <Modulator
            value={saturation}
            max={2.0}
            min={0.0}
            step={0.1}
            name="Saturation"
            unit=""
            type="saturation"
          />
        </TabsContent>
        <TabsContent value="Crop">
          <Crop />
        </TabsContent>
      </div>
    </Tabs>
  );
}

export default FilterMenu;
