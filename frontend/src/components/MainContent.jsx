import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { AllBasket } from "./permutation/AllBasket";
import DataCalculation from "./DataCalculation";
import { QuestionsSelection } from "./QuestionsSelection";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,  
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const MainContent = () => {
  const [selectedOptions, setSelectedOptions] = React.useState();

  React.useEffect(() => {
    console.log("selectedOption", selectedOptions);
  }, [selectedOptions]);

  return (
    <Box sx={{ flexGrow: 1 }} mt={10}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Item>
            <QuestionsSelection
              onSelectionChange={(value) => setSelectedOptions(value)}
            />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>
            
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>
          <DataCalculation selectedOptions={selectedOptions} />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>
          <AllBasket selectedOptions={selectedOptions} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainContent;
