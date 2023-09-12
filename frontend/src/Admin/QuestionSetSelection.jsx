import * as React from "react";
import { Tab, Tabs } from "@mui/material";

export function QuestionSetSelection(props) {
  return (
    <Tabs
      value={props.selectedQuestionSet}
      sx={{
        marginBottom: "16px",
      }}
      onChange={(_, newValue) => {
        props.setSelectedQuestionSet(newValue);
        props.setSelectedQuestionOption(null);
      }}
    >
      <Tab label="Question 1" value={"question_1_weight"} />
      <Tab label="Question 2" value={"question_2_weight"} />
      <Tab label="Question 3" value={"question_3_weight"} />
    </Tabs>
  );
}
