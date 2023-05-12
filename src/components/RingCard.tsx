import React from 'react';
import { Card, Divider, Typography } from '@mui/joy';
import DirectionPicker from './DirectionPicker';
import PositionPicker from './PositionPicker';
import CirclesPicker from './CirclesPicker';
import capitalise from '../utils/capitalise';

interface RingCardProps {
  ring: string;
}

const RingCard: React.FC<RingCardProps> = ({ ring }) => {
  return (
    <Card sx={{ width: 325, display: 'flex', alignItems: 'center' }} variant='outlined'>
      <Typography fontWeight='bold' level='h5'>{capitalise(ring)} Ring</Typography>
      <Divider sx={{ my: 2 }}/>
      <Typography fontWeight='bold'>Initial Position</Typography>
      <PositionPicker/>
      <Divider sx={{ mb: 2 }}/>
      <Typography gutterBottom fontWeight='bold'>How many circles?</Typography>
      <CirclesPicker/>
      <Divider sx={{ my: 2 }}/>
      <Typography gutterBottom fontWeight='bold'>Rotation Direction</Typography>
      <DirectionPicker/>
    </Card>
  )
}

export default RingCard;