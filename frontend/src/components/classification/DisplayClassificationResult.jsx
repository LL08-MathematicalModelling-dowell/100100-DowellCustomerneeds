import React, { useState } from "react";
import Box from "@mui/material/Box";

import { Button, Divider, TextField } from "@mui/material";

export const DisplayClassificationResult = ({ results }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleRowClick = (row) => {
    setSelectedTags(row);
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
        noValidate
        autoComplete="off"
      >
        {selectedTags.map((val, ind) => (
          <TextField
            marginTop={10}
            key={ind}
            variant="outlined"
            value={val}
            fullWidth
            label={`tags ${ind + 1}`}
            margin="normal"
          />
        ))}
      </Box>
    </Box>
  );
};
