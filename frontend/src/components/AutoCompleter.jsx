import * as React from "react";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { Button, CircularProgress } from "@mui/material";

export default function AutoCompleter() {
  const [q1Data, setQ1Data] = useState([]);
  const [q2Data, setQ2Data] = useState([]);
  const [q3Data, setQ3Data] = useState([]);
  const [selectedQ1Data, setSelectedQ1Data] = useState(null);
  const [selectedQ2Data, setSelectedQ2Data] = useState(null);
  const [selectedQ3Data, setSelectedQ3Data] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/q1/")
      .then((response) => response.json())
      .then((data) => {
        setQ1Data(data);
      })
      .catch((error) => {
        console.error("Error fetching q1 data:", error);
      });

    fetch("http://127.0.0.1:8000/q2/")
      .then((response) => response.json())
      .then((data) => {
        setQ2Data(data);
      })
      .catch((error) => {
        console.error("Error fetching q2 data:", error);
      });

    fetch("http://127.0.0.1:8000/q3/")
      .then((response) => response.json())
      .then((data) => {
        setQ3Data(data);
      })
      .catch((error) => {
        console.error("Error fetching q3 data:", error);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const payload = {
      q1: selectedQ1Data?.Item || "",
      q2: selectedQ2Data?.Item || "",
      q3: selectedQ3Data?.Item || "",
    };

    fetch("http://127.0.0.1:8000/api/services/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data posted successfully:", data);
        setLoading(false);
        alert("Data saved successfully!");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error posting data:", error);
      });
  };

  return (
    <>
      <Card sx={{ minWidth: 1200, m: 8 }} elevation={11}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          m={1}
          pr={1}
          p={4}
          display="flex"
          justifyContent="center"
        >
          <Autocomplete
            disablePortal
            id="q1"
            options={loading ? [] : q1Data}
            value={selectedQ1Data}
            onChange={(e, v) => setSelectedQ1Data(v)}
            sx={{ width: 400 }}
            getOptionLabel={(q1Data) => q1Data.Item || ""}
            renderInput={(params) => (
              <TextField {...params} label="I am from" size="small" />
            )}
            renderOption={(props, option) =>
              loading ? (
                <CircularProgress size={20} />
              ) : (
                <li {...props}>{option.Item}</li>
              )
            }
          />
          <Autocomplete
            disablePortal
            id="q2"
            options={loading ? [] : q2Data}
            value={selectedQ2Data}
            onChange={(e, v) => setSelectedQ2Data(v)}
            sx={{ width: 400 }}
            getOptionLabel={(q2Data) => q2Data.Item || ""}
            renderInput={(params) => (
              <TextField {...params} label="How to" size="small" />
            )}
            renderOption={(props, option) =>
              loading ? (
                <CircularProgress size={20} />
              ) : (
                <li {...props}>{option.Item}</li>
              )
            }
          />
          <Autocomplete
            disablePortal
            id="q3"
            options={loading ? [] : q3Data}
            value={selectedQ3Data}
            onChange={(e, v) => setSelectedQ3Data(v)}
            sx={{ width: 400 }}
            getOptionLabel={(q3Data) => q3Data.Item || ""}
            renderInput={(params) => (
              <TextField {...params} label="For" size="small" />
            )}
            renderOption={(props, option) =>
              loading ? (
                <CircularProgress size={20} />
              ) : (
                <li {...props}>{option.Item}</li>
              )
            }
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </Card>
    </>
  );
}
