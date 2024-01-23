import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import DataCalculation from "./DataCalculation";
import { QuestionsSelection } from "./QuestionsSelection";
import SentenceGeneration from "./SentenceGeneration";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const UserContent = () => {
  const [selectedOptions, setSelectedOptions] = React.useState();

  return (
    <Box sx={{ flexGrow: 1 }} margin={2}>
      <Box>
        <QuestionsSelection
          onSelectionChange={(value) => setSelectedOptions(value)}
        />
      </Box>

      <Box>
        <DataCalculation selectedOptions={selectedOptions} />
      </Box>

      <Box>
        <SentenceGeneration selectedOptions={selectedOptions} />
      </Box>
    </Box>
  );
};

export default UserContent;
