import React from 'react';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { Combination, ComboKey, Input } from '../types';
import CombinationPicker from './CombinationPicker';

interface CombinationCardProps {
  input: Input;
  setInput: React.Dispatch<React.SetStateAction<Input>>;
}

const CombinationCard: React.FC<CombinationCardProps> = ({ input, setInput }) => {

  const setCombo = (key: ComboKey, combo: Combination) => {
    setInput(oldInput => ({ ...oldInput, [key]: combo }))
  }

  return (
    <Card sx={{ width: 325, display: 'flex', alignItems: 'center', rowGap: 2 }} variant='outlined'>
      <Typography fontWeight='bold' level='h5'>Ring Combinations</Typography>
      {[1, 2, 3].map(i => {
        const key = ('combo' + i) as ComboKey;
        return (
          <Stack key={key} direction='row' spacing={2}>
            <Typography>Combination {i}</Typography>
            <CombinationPicker
              combo={input[key]}
              setCombo={(combo: Combination) => setCombo(key, combo)}
            />
          </Stack>
        )
      })}
    </Card>
  )
}

export default CombinationCard;