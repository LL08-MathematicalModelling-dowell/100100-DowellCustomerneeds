import React, { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { Button, CircularProgress } from "@mui/material";
// table
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

export default function DataCalculation() {
  const [q1Data, setQ1Data] = useState([]);
  const [q2Data, setQ2Data] = useState([]);
  const [q3Data, setQ3Data] = useState([]);
  const [spreadData, setSpreadData] = useState([]);
  const [selectedQ1Data, setSelectedQ1Data] = useState(null);
  const [selectedQ2Data, setSelectedQ2Data] = useState(null);
  const [selectedQ3Data, setSelectedQ3Data] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingSpread, setLoadingSpread] = useState(false);
  const isSubmitDisabled =
    !selectedQ1Data || !selectedQ2Data || !selectedQ3Data;

  useEffect(() => {
    setLoading(true); // set loading to true when the fetch request is initiated
    setTimeout(() => {
      // add a 2s delay before fetching the data
      fetch("http://127.0.0.1:8000/q1/")
        .then((response) => response.json())
        .then((data) => {
          setQ1Data(data);
          setLoading(false); // set loading to false when the data is fetched
        })
        .catch((error) => {
          console.error("Error fetching q1 data:", error);
          setLoading(false); // set loading to false when an error occurs
        });

      fetch("http://127.0.0.1:8000/q2/")
        .then((response) => response.json())
        .then((data) => {
          setQ2Data(data);
          setLoading(false); // set loading to false when the data is fetched
        })
        .catch((error) => {
          console.error("Error fetching q2 data:", error);
          setLoading(false); // set loading to false when an error occurs
        });

      fetch("http://127.0.0.1:8000/q3/")
        .then((response) => response.json())
        .then((data) => {
          setQ3Data(data);
          setLoading(false); // set loading to false when the data is fetched
        })
        .catch((error) => {
          console.error("Error fetching q3 data:", error);
          setLoading(false); // set loading to false when an error occurs
        });
    }, 2000);
  }, []);

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
          <Autocomplete
            disablePortal
            id="q1"
            options={loading ? [] : q1Data}
            value={selectedQ1Data}
            onChange={(e, v) => setSelectedQ1Data(v)}
            sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
            getOptionLabel={(q1Data) => q1Data.Item || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  loading ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "I am from"
                  )
                }
                size="small"
              />
            )}
          />
          <Autocomplete
            disablePortal
            id="q2"
            options={loading ? [] : q2Data}
            value={selectedQ2Data}
            onChange={(e, v) => setSelectedQ2Data(v)}
            sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
            getOptionLabel={(q2Data) => q2Data.Item || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  loading ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "How to"
                  )
                }
                size="small"
              />
            )}
          />
          <Autocomplete
            disablePortal
            id="q3"
            options={loading ? [] : q3Data}
            value={selectedQ3Data}
            onChange={(e, v) => setSelectedQ3Data(v)}
            sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
            getOptionLabel={(q3Data) => q3Data.Item || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  loading ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "For"
                  )
                }
                size="small"
              />
            )}
          />

          <LoadingButton
            loading={loadingSpread}
            variant="contained"
            color="info"
            onClick={(event) => {
              callSheetData();
              handleFormSubmit(event);
            }}
            disabled={isSubmitDisabled}
            sx={{ width: "100%", maxWidth: 250 }}
          >
            {loading ? (
              <CircularProgress size={24} color="primary" />
            ) : (
              "Calculate"
            )}
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
