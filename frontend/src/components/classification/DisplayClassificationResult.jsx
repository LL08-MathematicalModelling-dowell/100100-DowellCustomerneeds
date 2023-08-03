import React, { useState} from "react";
import Box from "@mui/material/Box";

import { Button, TextField } from "@mui/material";
import { usePostClient } from "../../client/postClient";

export const DisplayClassificationResult = ({ results }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const {postData } = usePostClient();

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsSubmitDisabled(false);
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    setSelectedRow((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = value;
      return updatedRows;
    });
  };

  const handleSubmit = async () => {
    const data = {
      rowValues: selectedRow,
    };
    postData(data, "/api/classicData/");
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
          fullWidth
          label={val}
          placeholder={`Enter tag value ${ind + 1}`}
          onChange={(e) => handleChange(e, ind)}
          margin="normal"
        />
      ))}
      
      </Box>
      <Button variant="contained" onClick={handleSubmit} disabled={isSubmitDisabled}>
        Submit Data
      </Button>
    </Box>
  );
};
