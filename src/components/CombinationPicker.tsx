import React from 'react';
import { Radio, Stack } from '@mui/joy';
import capitalise from '../utils/capitalise';
import { Combination } from '../types';

const CombinationPicker: React.FC = () => {
  const [value, setValue] = React.useState<Combination>({
    inner: false,
    middle: false,
    outer: false
  });
  console.log(value);

  const handleClick = (ring: keyof Combination) => () => {
    setValue(oldValue => ({...oldValue, [ring]: !oldValue[ring] }));
  }

  const rings: (keyof Combination)[] = ['inner', 'middle', 'outer'];
  return (
    <Stack direction='row' spacing={3}>
      {rings.map((ring) => (
        <Radio
          key={ring}
          aria-label={`Rotates ${capitalise(ring)} Ring`}
          variant="solid"
          size='md'
          checked={value[ring]}
          slotProps={{ root: { onClick: handleClick(ring) } }}
        />
      ))}
    </Stack>
  )
}

export default CombinationPicker;
