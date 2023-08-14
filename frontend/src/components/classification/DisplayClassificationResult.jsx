import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

export const DisplayClassificationResult = ({ results, userInputData }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setInputValues(Array(row.length).fill(""));
  };

  const handleChange = (e, index) => {
    const { value } = e.target;

    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  useEffect(() => {
    const mergedData = selectedRow.map((originalValue, index) => ({
      key: originalValue,
      value: inputValues[index] === "" ? 0 : parseFloat(inputValues[index]), // Convert to number
    }));

    userInputData(mergedData);
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
          value={inputValues[index]}
          fullWidth
          label={originalValue}
          placeholder={`Enter value for ${originalValue}`}
          onChange={(e) => handleChange(e, index)}
          margin="normal"
        />
      ))}
    </Box>
  );
};
