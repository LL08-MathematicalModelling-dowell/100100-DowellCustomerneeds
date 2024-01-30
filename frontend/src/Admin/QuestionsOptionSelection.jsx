import * as React from "react";
import Box from "@mui/material/Box";
import { Autocomplete, TextField } from "@mui/material";

export const QuestionsOptionSelection = ({
  onSelectionChange,
  selectedQuestion,
  questions,
  label,
}) => {
  return (
    <Box display={"flex"} justifyContent={"space-between"} width={"50%"}>
      <Autocomplete
        sx={{ width: "100%" }}
        options={questions}
        value={selectedQuestion}
        onChange={(e, v) => {
          onSelectionChange(v);
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} />
        )}
        getOptionLabel={(option) => option.item}
        isOptionEqualToValue={(option, value) => option._id === value._id}
      />
    </Box>
  );
};
