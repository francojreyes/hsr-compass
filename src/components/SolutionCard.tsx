import React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { Input, Solution } from '../types';
import calculateSolution from '../utils/calculateSolution';
import HelpModal from './HelpModal';

interface SolutionCardProps {
  input: Input;
  resetInput: () => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ input, resetInput }) => {
  const [showHelp, setShowHelp] = React.useState<boolean>(false);
  const [solution, setSolution] = React.useState<Solution | null>(null);

  const handleSolve = () => setSolution(calculateSolution(input));
  const handleHelp = () => setShowHelp(true);
  const handleReset = () => {
    resetInput();
    setSolution(null);
  }

  return (
    <>
      <Card sx={{ width: 325, display: 'flex', alignItems: 'center', rowGap: 2 }} variant='outlined'>
        <Stack direction='row' spacing={3}>
          <Button onClick={handleSolve}>Solve</Button>
          <Button color='neutral' variant='soft' onClick={handleHelp}>Help</Button>
          <Button color='neutral' variant='soft' onClick={handleReset}>Reset</Button>
        </Stack>
        {solution && (
          <>
            <Typography fontWeight='bold' level='h5'>Solution</Typography>
            {solution[0] !== -1
              ? solution.map((rotations, i) => (
                <Typography key={i}>
                  Combination {i + 1}: Rotate <Typography fontWeight='bold'>{rotations}</Typography> time(s)
                </Typography>
              ))
              : <Typography>No solution found. You may have input incorrect information.</Typography>
            }
          </>
        )}
      </Card>
      <HelpModal open={showHelp} setOpen={setShowHelp}/>
    </>
  )
}

export default SolutionCard;
