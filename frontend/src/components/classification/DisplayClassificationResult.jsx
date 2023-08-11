import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

export const DisplayClassificationResult = ({ results, userInputData }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setInputValues({});
  };

  const handleChange = (e, originalValue) => {
    const { value } = e.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [originalValue]: Number(value),
    }));
  };

  useEffect(() => {
    userInputData(inputValues);
  }, [inputValues]);

  return (
    <Box>
      {results.map((value, index) => (
        <Box key={index} display="flex" flexDirection="row" marginTop="8px">
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

      {selectedRow.map((originalValue, index) => (
        <TextField
          key={index}
          variant="outlined"
          value={inputValues[originalValue] || ''}
          fullWidth
          label={originalValue}
          placeholder={`Enter value for ${originalValue}`}
          onChange={(e) => handleChange(e, originalValue)}
          margin="normal"
        />
      ))}
    </Box>
  );
};
