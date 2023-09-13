import * as React from "react";
import Box from "@mui/material/Box";
import { Checkbox, TextField } from "@mui/material";
import { useState } from "react";

export const CheckedTagsInput = ({ tag, onInputChange }) => {
  const handleChange = (event) => {
    if (event.target.checked) {
      onInputChange("");
    } else onInputChange(null);
  };

  return (
    <>
      <Checkbox checked={tag.value !== null} onChange={handleChange} />
      {tag.tag}
      {tag.value !== null && (
        <TextField
          variant="standard"
          size="small"
          value={tag.value}
          sx={{ paddingLeft: "8px" }}
          onChange={(e) => onInputChange(e.target.value)}
          type="number"
        />
      )}
    </>
  );
};
