import React from 'react';
import { Radio, Stack } from '@mui/joy';
import capitalise from '../utils/capitalise';
import { Combination } from '../types';

interface CombinationPickerProps {
  combo: Combination;
  setCombo: (combo: Combination) => void;
}

const CombinationPicker: React.FC<CombinationPickerProps> = ({ combo, setCombo }) => {
  const handleClick = (ring: keyof Combination) => () => {
    // Don't allow deselecting the last one
    const numSelected = Object.values(combo).filter(Boolean).length
    if (numSelected <= 1 && combo[ring]) {
      return;
    }
    setCombo({...combo, [ring]: !combo[ring] });
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
          checked={combo[ring]}
          slotProps={{ root: { onClick: handleClick(ring) } }}
        />
      ))}
    </Stack>
  )
}

export default CombinationPicker;
