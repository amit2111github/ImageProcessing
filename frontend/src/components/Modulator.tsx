import { Slider } from './ui/slider';
import { useImage } from '../context/imagecontext';
import { Modulator } from '../helper/types';

function Rotate({ value, max, min, step, name, unit, type }: Modulator) {
  const { setManipulation } = useImage();
  const handleChange = (value: number[]) => {
    setManipulation(type, value[0]);
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="text-gray-800">{name}</p>
        <p className="text-gray-800">
          {value} {unit}
        </p>
      </div>

      <Slider
        defaultValue={[value]}
        max={max}
        min={min}
        step={step}
        onValueChange={handleChange}
        className="mt-4"
      />
    </>
  );
}

export default Rotate;
