import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AllBasket } from "./permutation/AllBasket";
import DataCalculation from "./DataCalculation";
import { QuestionsSelection } from "./QuestionsSelection";

const ComboBox = () => {
  const [selectedOptions, setSelectedOptions] = React.useState();
  return (
    <Container sx={{ minWidth: 250, maxWidth: 1200, m: 8 }}>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Box>
            <QuestionsSelection
              onSelectionChange={(value) => setSelectedOptions(value)}
            />
          </Box>

          <Grid item xs={12} sm={6}>
            <AllBasket selectedOptions={selectedOptions} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DataCalculation selectedOptions={selectedOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ComboBox;
