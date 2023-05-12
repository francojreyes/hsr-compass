import React from 'react';
import { Card, Divider, Typography } from '@mui/joy';
import DirectionPicker from './DirectionPicker';
import PositionPicker from './PositionPicker';
import CirclesPicker from './CirclesPicker';
import capitalise from '../utils/capitalise';
import { CircleKey, Circles, Direction, DirKey, Input, Position, PosKey } from '../types';

interface RingCardProps {
  ring: string;
  input: Input;
  setInput: React.Dispatch<React.SetStateAction<Input>>;
}

const RingCard: React.FC<RingCardProps> = ({ ring, input, setInput }) => {
  const posKey = ring + 'Pos' as PosKey;
  const setPos = (pos: Position) => {
    setInput({ ...input, [posKey]: pos });
  }

  const circleKey = ring + 'Circles' as CircleKey;
  const setCircles = (circles: Circles) => {
    setInput({ ...input, [circleKey]: circles });
  }

  const dirKey = ring + 'Dir' as DirKey;
  const setDir = (dir: Direction) => {
    setInput({ ...input, [dirKey]: dir });
  }

  return (
    <Card sx={{ width: 325, display: 'flex', alignItems: 'center' }} variant='outlined'>
      <Typography fontWeight='bold' level='h5'>{capitalise(ring)} Ring</Typography>
      <Divider sx={{ my: 2 }}/>
      <Typography fontWeight='bold'>Initial Position</Typography>
      <PositionPicker position={input[posKey]} setPosition={setPos}/>
      <Divider sx={{ mb: 2 }}/>
      <Typography gutterBottom fontWeight='bold'>How many circles?</Typography>
      <CirclesPicker circles={input[circleKey]} setCircles={setCircles}/>
      <Divider sx={{ my: 2 }}/>
      <Typography gutterBottom fontWeight='bold'>Rotation Direction</Typography>
      <DirectionPicker direction={input[dirKey]} setDirection={setDir}/>
    </Card>
  )
}

export default RingCard;