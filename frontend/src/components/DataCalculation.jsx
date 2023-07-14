import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button, CircularProgress } from "@mui/material";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DataCalculation({
  selectedQ1Data,
  selectedQ2Data,
  selectedQ3Data,
}) {
  const [loadingSpread, setLoadingSpread] = useState(false);

  const isSubmitDisabled =
    !selectedQ1Data || !selectedQ2Data || !selectedQ3Data;
  const [spreadData, setSpreadData] = useState([]);

  const callSheetData = () => {
    setLoadingSpread(true);
    fetch("http://127.0.0.1:8000/api/spreadsheet/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Q1Regression: selectedQ1Data.Item,
        Q2Regression: selectedQ2Data.Item,
        Q3Regression: selectedQ3Data.Item,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSpreadData(data);
        setLoadingSpread(false);
      })
      .catch((error) => {
        alert(
          "Error fetching spreadsheet data : No data found for the selected questions"
        );
        setLoadingSpread(false);
      });
  };

  return (
    <>
      <Card sx={{ minWidth: 250, maxWidth: 1200 }}>
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
          <LoadingButton
            loading={loadingSpread}
            variant="contained"
            color="info"
            onClick={(event) => {
              callSheetData();
            }}
            disabled={isSubmitDisabled}
            sx={{ width: "100%", maxWidth: 250 }}
          >
            Calculate
          </LoadingButton>
        </Box>

        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 400, maxWidth: 1200 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Value</StyledTableCell>
                  <StyledTableCell align="right">Result</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingSpread ? (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <CircularProgress size={24} color="primary" />
                    </TableCell>
                    <TableCell align="right">
                      <CircularProgress size={24} color="primary" />
                    </TableCell>
                  </TableRow>
                ) : (
                  spreadData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.category}
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </>
  );
}
