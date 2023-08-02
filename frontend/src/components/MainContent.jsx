import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { Classification } from "./classification/Classification";
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
    <Box sx={{ flexGrow: 1 }} margin={2}>
      <Box>
        <QuestionsSelection
          onSelectionChange={(value) => setSelectedOptions(value)}
        />
      </Box>
      <Box height={"400px"}>
        <Classification selectedOptions={selectedOptions} />
      </Box>
      <Box>
        <DataCalculation selectedOptions={selectedOptions} />
      </Box>
    </Box>
  );
};

export default MainContent;
