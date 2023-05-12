import React from 'react';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const PositionPicker: React.FC = () => {
  const [position, setPosition] = React.useState<number>(0);

  const onChange = (value: Date | null) => {
    if (value == null) return;

    // Convert the hour to degrees
    // 9 o'clock is 0 and increases clockwise
    switch (value.getHours()) {
      case 9:  setPosition(0); break;
      case 11: setPosition(60); break;
      case 1:  setPosition(120); break;
      case 3:  setPosition(180); break;
      case 5:  setPosition(240); break;
      case 7:  setPosition(300); break;
      default: throw new Error('Invalid hour');
    }
  }

  console.log(position);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        shouldDisableTime={value => (value as Date).getHours() % 2 === 0}
        defaultValue={new Date(0, 0, 0, 9)}
        views={['hours']}
        slotProps={{
          actionBar: { style: { display: 'none' } },
          toolbar: { hidden: true }
        }}
        onChange={onChange}
      />
    </LocalizationProvider>
  )
}

export default PositionPicker;
