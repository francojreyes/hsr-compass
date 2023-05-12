import React from 'react';
import { CssBaseline, Grid, styled } from '@mui/joy';
import RingCard from './components/RingCard';
import CombinationCard from './components/CombinationCard';
import SolutionCard from './components/SolutionCard';

const StyledGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  rowGap: 20
});

function App() {
  return (
    <CssBaseline>
      <Grid container spacing={2} my={3} sx={{ flexGrow: 1, height: '100%' }}>
        <StyledGrid xs={12} sm={6} lg={3}>
          <SolutionCard/>
          <CombinationCard/>
        </StyledGrid>
        <StyledGrid xs={12} sm={6} lg={3}>
          <RingCard ring='inner'/>
        </StyledGrid>
        <StyledGrid xs={12} sm={6} lg={3} >
          <RingCard ring='middle'/>
        </StyledGrid>
        <StyledGrid xs={12} sm={6} lg={3}>
          <RingCard ring='outer'/>
        </StyledGrid>
      </Grid>
    </CssBaseline>
  );
}

export default App;
