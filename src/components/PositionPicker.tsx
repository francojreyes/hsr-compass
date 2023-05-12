import React from 'react';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const PositionPicker: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        shouldDisableTime={value => (value as Date).getHours() % 2 === 0}
        views={['hours']}
      />
    </LocalizationProvider>
  )
}

export default PositionPicker;
