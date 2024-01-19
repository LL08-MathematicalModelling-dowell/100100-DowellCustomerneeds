import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button, CircularProgress } from "@mui/material";
import calculateFinalScore from "../utils/calculateFinalScore";

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

export default function DataCalculation({ selectedOptions }) {
  const isSubmitDisabled =
    !selectedOptions?.selectedQuestionOneData ||
    !selectedOptions?.selectedQuestionTwoData ||
    !selectedOptions?.selectedQuestionThreeData;

  const [finalRegressions, setFinalRegressions] = useState(["-", "-", "-", "-"]);

  const calculateREgression = () => {
    const FinalScores = calculateFinalScore(selectedOptions)
    setFinalRegressions(FinalScores);
  };

  return (
    <>
      <Card sx={{ minWidth: 250, maxWidth: 1200, marginTop: "30px" }}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Button
            variant="contained"
            color="info"
            onClick={calculateREgression}
            disabled={isSubmitDisabled}
            sx={{ width: "100%", maxWidth: 250, marginBottom: "8px" }}
          >
            Regression
          </Button>
        </Box>

        <Box>
          <Button
            variant="contained"
            color="info"
            onClick={calculateREgression}
            disabled={isSubmitDisabled}
            sx={{ width: "100%", maxWidth: 250, marginBottom: "8px" }}
          >
            Generate
          </Button>
        </Box>
        
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
                <TableRow key={1}>
                  <TableCell component="th" scope="row">
                    Question 1
                  </TableCell>
                  <TableCell align="right">{finalRegressions[0]}</TableCell>
                </TableRow>

                <TableRow key={2}>
                  <TableCell component="th" scope="row">
                    Question 2
                  </TableCell>
                  <TableCell align="right">{finalRegressions[1]}</TableCell>
                </TableRow>

                <TableRow key={3}>
                  <TableCell component="th" scope="row">
                    Question 3
                  </TableCell>
                  <TableCell align="right">{finalRegressions[2]}</TableCell>
                </TableRow>

                <TableRow key={3}>
                  <TableCell component="th" scope="row">
                    Final score
                  </TableCell>
                  <TableCell align="right">{finalRegressions[3]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </>
  );
}
