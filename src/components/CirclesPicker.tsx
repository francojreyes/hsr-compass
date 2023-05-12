import React from 'react';
import { Radio, Stack } from '@mui/joy';

const CirclesPicker: React.FC = () => {
  const [value, setValue] = React.useState(1);
  console.log(value);
  return (
    <Stack direction='row' spacing={3}>
      {[1, 2, 3, 4].map(i => (
        <Radio
          key={i}
          value={i}
          aria-label={`${i} Circle`}
          variant="solid"
          size='md'
          checked={i <= value}
          slotProps={{ root: { onClick: () => setValue(i) } }}
        />
      ))}
    </Stack>
  )
}

export default CirclesPicker;
