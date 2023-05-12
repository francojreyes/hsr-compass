import React from 'react';
import { Radio, Stack } from '@mui/joy';
import { Circles } from '../types';

interface CirclesPickerProps {
  circles: Circles;
  setCircles: (circles: Circles) => void;
}

const CirclesPicker: React.FC<CirclesPickerProps> = ({ circles, setCircles }) => {
  return (
    <Stack direction='row' spacing={3}>
      {[1, 2, 3, 4].map(i => (
        <Radio
          key={i}
          value={i}
          aria-label={`${i} Circle`}
          variant="solid"
          size='md'
          checked={i <= circles}
          slotProps={{ root: { onClick: () => setCircles(i as Circles) } }}
        />
      ))}
    </Stack>
  )
}

export default CirclesPicker;
