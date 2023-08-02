import React, { useState } from "react";
import Box from "@mui/material/Box";

import { Button, TextField } from "@mui/material";

export const DisplayClassificationResult = ({ results }) => {
  const [selectedRow, setSelectedRow] = useState([]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleChange = (e, index) => {
    const updatedRow = [...selectedRow];
    updatedRow[index] = e.target.value;
    setSelectedRow(updatedRow);
  };

  return (
    <Box>
      {results.map((value, index) => (
        <Box key={index} display="flex" flexDirection={"row"} marginTop={"8px"}>
          {value.map((val, ind) => {
            return (
              <Button
                variant="contained"
                key={ind}
                onClick={() => handleRowClick(value)}
              >
                {val}
              </Button>
            );
          })}
        </Box>
      ))}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        marginTop={"20px"}
        noValidate
        autoComplete="off"
      >
      {selectedRow.map((val, ind) => (
        <TextField
          key={ind}
          variant="outlined"
          value={val}
          fullWidth
          label={`Tag ${ind + 1}`}
          placeholder={`Enter tag value ${ind + 1}`}
          onChange={(e) => handleChange(e, ind)}
          margin="normal"
        />
      ))}
      </Box>
    </Box>
  );
};
