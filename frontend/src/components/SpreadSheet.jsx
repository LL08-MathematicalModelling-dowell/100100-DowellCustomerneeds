import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

export const SpreadSheet = () => {
    const [spreaddata, setSpreadData] = useState([]);
    
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/spreadsheet/")
        .then((response) => response.json()) 
        .then((data) => setSpreadData(data))
        .catch((error) => console.log(error));
    }, []);
    
    return (
        <>
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
                    <table>
                        <thead>
                            <tr>
                                <th>column 1</th>
                                <th>column 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spreaddata.map((spreaddata) => (
                                <tr>
                                    <td>{spreaddata[0]}</td>
                                    <td>{spreaddata[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            </Card>
        </>
    );
};