import React from 'react';
import { Radio, RadioGroup } from '@mui/joy';
import { Direction } from '../types';

interface DirectionPickerProps {
  direction: Direction;
  setDirection: (dir: Direction) => void;
}

const DirectionPicker: React.FC<DirectionPickerProps> = ({ direction, setDirection }) => {
  return (
    <RadioGroup
      size='md'
      value={direction}
      onChange={e => setDirection(parseInt(e.target.value) as Direction)}
    >
      <Radio value='1' label='Clockwise' variant='solid'/>
      <Radio value='-1' label='Counter Clockwise' variant='solid'/>
    </RadioGroup>
  )
}

export default DirectionPicker;
