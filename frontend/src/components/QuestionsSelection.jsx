import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CircularProgress } from "@mui/material";

export const QuestionsSelection = ({ onSelectionChange }) => {
  const [q1Data, setQ1Data] = useState([]);
  const [q2Data, setQ2Data] = useState([]);
  const [q3Data, setQ3Data] = useState([]);
  const [selectedQ1Data, setSelectedQ1Data] = useState(null);
  const [selectedQ2Data, setSelectedQ2Data] = useState(null);
  const [selectedQ3Data, setSelectedQ3Data] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      
      fetch("http://127.0.0.1:8000/q1/")
        .then((response) => response.json())
        .then((data) => {
          setQ1Data(data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching q1 data:", error);
          setLoading(false); 
        });

      fetch("http://127.0.0.1:8000/q2/")
        .then((response) => response.json())
        .then((data) => {
          setQ2Data(data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching q2 data:", error);
          setLoading(false); 
        });

      fetch("http://127.0.0.1:8000/q3/")
        .then((response) => response.json())
        .then((data) => {
          setQ3Data(data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching q3 data:", error);
          setLoading(false); 
        });
    }, 2000);
  }, []);

  useEffect(() => {
    onSelectionChange({ selectedQ1Data, selectedQ2Data, selectedQ3Data });
  }, [selectedQ1Data, selectedQ2Data, selectedQ3Data]);

  return (
    <>
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
              loading ? <CircularProgress size={24} color="primary" /> : "For"
            }
            size="small"
          />
        )}
      />
    </>
  );
};
