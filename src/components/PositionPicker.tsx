import React from 'react';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Position } from '../types';

interface PositionPickerProps {
  position: Position;
  setPosition: (pos: Position) => void;
}

const hourToPosition = (hour: number): Position => {
  switch (hour) {
    case 9:  return 0;
    case 11: return 1;
    case 1:  return 2;
    case 3:  return 3;
    case 5:  return 4;
    case 7:  return 5;
    default: throw new Error('Invalid hour');
  }
}

const positionToHour = (pos: Position): number => {
  switch (pos) {
    case 0:  return 9;
    case 1: return 11;
    case 2:  return 1;
    case 3:  return 3;
    case 4:  return 5;
    case 5:  return 7;
  }
}

const PositionPicker: React.FC<PositionPickerProps> = ({ position, setPosition }) => {
  const [date, setDate] = React.useState<Date | null>(null);
  React.useEffect(() => {
    setDate(new Date(0, 0, 0, positionToHour(position)));
  }, [position])

  const onChange = (value: Date | null) => {
    if (value == null) return;

    // Convert the hour to degrees
    // 9 o'clock is 0 and increases clockwise
    setPosition(hourToPosition(value.getHours()));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        shouldDisableTime={value => value.getHours() % 2 === 0}
        value={date}
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
