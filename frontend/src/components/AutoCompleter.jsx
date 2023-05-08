import * as React from "react";
import Card from "@mui/material/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

export default function AutoCompleter() {
  
  const baseURL = "http://127.0.0.1:8000/api/services";
  const [rows, setRows] = useState([]);
  const [rowdata, setRowdata] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setRows(response.data);
    });
  }, []);

  
  useEffect(() => {
    if (rowdata) {
      setRows([rowdata]);
    } else {
      axios.get(baseURL).then((response) => {
        setRows(response.data);
        console.log(response.data);
      });
    }
  }, [rowdata]);


  return (
    <>
      {rows ? (
        <Card sx={{ minWidth: 1200, m: 8 }} elevation={11}>
          <Box
            component="span"
            m={1}
            pr={1}
            p={4}
            display="flex"
            justifyContent="center"
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              onChange={(e, v) => setRowdata(v)}
              sx={{ width: 400 }}
              getOptionLabel={(rows) => rows.category || ""}
              renderInput={(params) => (
                <TextField {...params} label="Search Category" size="small" />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              onChange={(e, v) => setRowdata(v)}
              sx={{ width: 400 }}
              getOptionLabel={(rows) => rows.location || ""}
              renderInput={(params) => (
                <TextField {...params} label="Search Location" size="small" />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              onChange={(e, v) => setRowdata(v)}
              sx={{ width: 400 }}
              getOptionLabel={(rows) => rows.product || ""}
              renderInput={(params) => (
                <TextField {...params} label="Search product" size="small" />
              )}
            />
          </Box>
        </Card>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}