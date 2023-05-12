import React from 'react';
import { Button, Card, Stack, Typography } from '@mui/joy';
import { Solution } from '../types';

const SolutionCard: React.FC = () => {
  const [solution, setSolution] = React.useState<Solution | null>([0, 0, 4]);
  return (
    <Card sx={{ width: 325, display: 'flex', alignItems: 'center', rowGap: 2 }} variant='outlined'>
      <Stack direction='row' spacing={3}>
        <Button>Solve</Button>
        <Button color='neutral' variant='soft'>Help</Button>
        <Button color='neutral' variant='soft'>Reset</Button>
      </Stack>
      {solution && (
        <>
          <Typography fontWeight='bold' level='h5'>Solution</Typography>
          {solution.map((rotations, i) => (
            <Typography>Combination {i + 1}: Rotate <Typography fontWeight='bold'>{rotations}</Typography> time(s)</Typography>
          ))}
        </>
      )}
    </Card>
  )
}

export default SolutionCard;
