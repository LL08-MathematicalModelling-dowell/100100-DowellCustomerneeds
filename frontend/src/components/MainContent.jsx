import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AllBasket } from "./permutation/AllBasket";
import DataCalculation from "./DataCalculation";
import { QuestionsSelection } from "./QuestionsSelection";
import { Divider } from "@mui/material";

export const MainContent = () => {
  const [selectedOptions, setSelectedOptions] = React.useState();

  React.useEffect(() => {
    console.log("selectedOption", selectedOptions);
  }, [selectedOptions]);

  return (
    <Container sx={{ minWidth: 250, maxWidth: 1200, m: 8 }}>
      <QuestionsSelection
        onSelectionChange={(value) => setSelectedOptions(value)}
      />

      <Box>
        <DataCalculation selectedOptions={selectedOptions} />

        <AllBasket selectedOptions={selectedOptions} />
      </Box>
    </Container>
  );
};

export default MainContent;
