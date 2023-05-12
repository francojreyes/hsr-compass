import React from 'react';
import { CssBaseline, Grid, styled } from '@mui/joy';
import RingCard from './components/RingCard';
import CombinationCard from './components/CombinationCard';
import SolutionCard from './components/SolutionCard';
import { Input } from './types';

const StyledGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  rowGap: 20
});

const initialValues: Input = {
  innerPos: 0, middlePos: 0, outerPos: 0,
  innerCircles: 1, middleCircles: 1, outerCircles: 1,
  innerDir: 1, middleDir: 1, outerDir: 1,
  combo1: { inner: true, middle: true, outer: false },
  combo2: { inner: false, middle: true, outer: true },
  combo3: { inner: true, middle: false, outer: true },
}

function App() {
  const [input, setInput] = React.useState<Input>(initialValues);
  const resetInput = () => setInput(initialValues);

  return (
    <CssBaseline>
      <Grid container spacing={2} my={3} sx={{ flexGrow: 1, height: '100%' }}>
        <StyledGrid xs={12} sm={6} lg={3}>
          <SolutionCard input={input} resetInput={resetInput}/>
          <CombinationCard input={input} setInput={setInput}/>
        </StyledGrid>
        {['inner', 'middle', 'outer'].map(ring => (
          <StyledGrid key={ring} xs={12} sm={6} lg={3}>
            <RingCard ring={ring} input={input} setInput={setInput}/>
          </StyledGrid>
        ))}
      </Grid>
    </CssBaseline>
  );
}

export default App;
