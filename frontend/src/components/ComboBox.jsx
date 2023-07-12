import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AllBasket } from './permutation/AllBasket';
import DataCalculation from './DataCalculation';



const ComboBox = () => {
  return (
    <Container sx={{ minWidth: 250, maxWidth: 1200, m: 8 }}>
    <Box display="flex"
    flexDirection={{ xs: "column", md: "row"}}>
      <Grid container spacing={2}  alignItems="center"
      justifyContent="center">
        <Grid item xs={12} sm={6} >
          
            <AllBasket/>
          
        </Grid>
        <Grid item xs={12} sm={6}>          
            <DataCalculation/>
         
        </Grid>
      </Grid>
    </Box>
    </Container>
  )
}

export default ComboBox
