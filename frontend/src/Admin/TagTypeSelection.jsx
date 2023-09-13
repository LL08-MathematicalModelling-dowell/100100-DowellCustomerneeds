import * as React from "react";
import { Tab, Tabs } from "@mui/material";

export function TagTypeSelection(props) {
  return (
    <Tabs
      sx={{
        marginBottom: "16px",
      }}
      value={props.tagTypeValue}
      onChange={(e, newValue) => {
        props.setTagTypeValue(newValue);
        props.setSelectedQuestionOption(null);
      }}
    >
      <Tab label="Regression" value="regressions" />
      <Tab label="weights" value="weights" />
    </Tabs>
  );
}
