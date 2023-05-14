import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import React from 'react';

import { Circles } from '../types';

interface CirclesPickerProps {
  circles: Circles;
  setCircles: (circles: Circles) => void;
}

const CirclesPicker: React.FC<CirclesPickerProps> = ({ circles, setCircles }) => {
  return (
    <RadioGroup orientation='horizontal' size='md' value={circles}>
      {[1, 2, 3, 4].map(i => (
        <Radio
          key={i}
          value={i}
          aria-label={`${i} Circles`}
          variant="solid"
          checked={i <= circles}
          slotProps={{ root: { onClick: () => setCircles(i as Circles) } }}
        />
      ))}
    </RadioGroup>
  )
}

export default CirclesPicker;
