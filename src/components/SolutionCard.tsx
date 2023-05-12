import React from 'react';
import { Button, Card, Stack, Typography } from '@mui/joy';
import { Input, Solution } from '../types';
import calculateSolution from '../utils/calculateSolution';

interface SolutionCardProps {
  input: Input;
  resetInput: () => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ input, resetInput }) => {
  const [solution, setSolution] = React.useState<Solution | null>(null);
  const onSubmit = () => {
    setSolution(calculateSolution(input));
  }

  return (
    <Card sx={{ width: 325, display: 'flex', alignItems: 'center', rowGap: 2 }} variant='outlined'>
      <Stack direction='row' spacing={3}>
        <Button onClick={onSubmit}>Solve</Button>
        <Button color='neutral' variant='soft'>Help</Button>
        <Button color='neutral' variant='soft' onClick={resetInput}>Reset</Button>
      </Stack>
      {solution && (
        <>
          <Typography fontWeight='bold' level='h5'>Solution</Typography>
          {solution.map((rotations, i) => (
            <Typography key={i}>
              Combination {i + 1}: Rotate <Typography fontWeight='bold'>{rotations}</Typography> time(s)
            </Typography>
          ))}
        </>
      )}
    </Card>
  )
}

export default SolutionCard;
