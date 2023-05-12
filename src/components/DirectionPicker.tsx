import React from 'react';
import { Radio, RadioGroup } from '@mui/joy';

const DirectionPicker: React.FC = () => {
  const [value, setValue] = React.useState(1);
  return (
    <RadioGroup
      size='md'
      value={value}
      onChange={e => setValue(parseInt(e.target.value))}
    >
      <Radio value='1' label='Clockwise' variant='solid'/>
      <Radio value='-1' label='Counter Clockwise' variant='solid'/>
    </RadioGroup>
  )
}

export default DirectionPicker;
