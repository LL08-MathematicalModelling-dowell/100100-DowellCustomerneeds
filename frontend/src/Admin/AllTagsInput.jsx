import * as React from "react";
import Box from "@mui/material/Box";
import { CheckedTagsInput } from "./CheckedTagsInput";

export function AllTagsInput({
  tagValues,
  onTagValuesChange,
  selectedQuestionId,
}) {
  return (
    <Box display={"flex"} flexWrap={"wrap"}>
      {tagValues.map((value, index) => {
        return (
          <Box key={`${selectedQuestionId}${index}`} flexBasis={"33.333333%"}>
            <CheckedTagsInput
              tag={value}
              onInputChange={(newVal) => onTagValuesChange(newVal, index)}
            />
          </Box>
        );
      })}
    </Box>
  );
}
