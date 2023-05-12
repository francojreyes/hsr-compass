import React from 'react';
import { Card, Stack, Typography } from '@mui/joy';
import CombinationPicker from './CombinationPicker';

const CombinationCard: React.FC = () => {
  return (
    <Card sx={{ width: 325, display: 'flex', alignItems: 'center', rowGap: 2 }} variant='outlined'>
      <Typography fontWeight='bold' level='h5'>Ring Combinations</Typography>
      {[1, 2, 3].map(i => (
        <Stack key={i} direction='row' spacing={2}>
          <Typography>Combination {i}</Typography>
          <CombinationPicker/>
        </Stack>
      ))}
    </Card>
  )
}

export default CombinationCard;