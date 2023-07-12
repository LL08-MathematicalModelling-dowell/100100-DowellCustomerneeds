import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const SpreadSheet = () => {
  const [showBox, setShowBox] = useState(false);
  const [sheetOne, setSheetOne] = useState("");
  const [sheetTwo, setSheetTwo] = useState("");

  const optionsSelectOne = ["Q1Regression", "Q2Regression", "Q3Regression"];
  const optionsSelectTwo = ["Q1Weight", "Q2Weight", "Q3Weight"];

  const callSheetData = () => {
    fetch("http://127.0.0.1:8000/api/spreadsheet/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sheet_name_one: sheetOne,
        sheet_name_two: sheetTwo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSpreadData(data);
        setShowBox(true);
      })
      .catch((error) => {
        console.error("Error fetching spreadsheet data:", error);
      });
  };

  return (
    <Card sx={{ minWidth: 400, maxWidth: 1200, m: 8 }}>
      <Box
        component="form"
        m={1}
        pr={1}
        p={4}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        gap={2}
        flexWrap="wrap"
      >
        <Autocomplete
          id="spreadsheet_id_one"
          options={optionsSelectOne}
          sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="First Sheet" size="small" />
          )}
          value={sheetOne}
          onChange={(event, value) => setSheetOne(value)}
        />
        <Autocomplete
          id="spreadsheet_id_two"
          options={optionsSelectTwo}
          sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="Second Sheet" size="small" />
          )}
          value={sheetTwo}
          onChange={(event, value) => setSheetTwo(value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", maxWidth: 250 }}
          onClick={callSheetData}
        >
          Load Data
        </Button>
      </Box>
      {showBox && (
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            m: 4,
          }}
        >
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {spreadData.columns.map((column, index) => (
                <tr key={column}>
                  <td>{column}</td>
                  <td>{spreadData.result[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </Card>
  );
};