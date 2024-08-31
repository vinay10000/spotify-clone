"use client";
import * as RadixSlider from "@radix-ui/react-slider";
interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}
const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      value={[value]}
      max={1}
      step={0.1}
      onValueChange={handleChange}
      aria-label="Volume"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-1">
        <RadixSlider.Range className="absolute bg-white h-full rounded-full" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block h-5 w-5 rounded-full bg-white shadow" />
    </RadixSlider.Root>
  );
};

export default Slider;
