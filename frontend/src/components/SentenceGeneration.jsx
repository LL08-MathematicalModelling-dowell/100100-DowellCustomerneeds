import React, { useState, useEffect } from "react";
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
import useSentenceGeneration from "../question-hooks/useSentenceGeneration";

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

export default function SentenceGeneration({ selectedOptions }) {
  const isSubmitDisabled =
    !selectedOptions?.selectedQuestionOneData ||
    !selectedOptions?.selectedQuestionTwoData ||
    !selectedOptions?.selectedQuestionThreeData;

  const { generateSentences, responseData} = useSentenceGeneration();
  const [sentences, setSentences] = useState([])

  useEffect(() => {
    setSentences(responseData?.closest_sentences??[])
  }, [responseData])

  const handleGenerate = async () => {
    const [,,,finalScore] = calculateFinalScore(selectedOptions);
    await generateSentences(finalScore);
  };

  return (
    <>
      <Card sx={{ minWidth: 250, maxWidth: 1200, marginTop: "30px" }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Button
              variant="contained"
              color="info"
              onClick={handleGenerate}
              disabled={isSubmitDisabled}
              sx={{ width: "100%", maxWidth: 250, marginBottom: "8px" }}
            >
              Generate
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>

          <TableContainer>
            <Table sx={{ minWidth: 400, maxWidth: 1200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sentence</StyledTableCell>
                  <StyledTableCell align="right">Score</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sentences.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item.sentence}
                    </TableCell>
                    <TableCell align="right">{item.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </>
  );
}
