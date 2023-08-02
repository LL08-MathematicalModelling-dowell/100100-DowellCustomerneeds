import Box from "@mui/material/Box";

import { Button, Divider } from "@mui/material";

export const DisplayClassificationResult = ({ results }) => {
  return (
    <Box>
      {results.map((value, index) => (
        <Box key={index} display="flex" flexDirection={"row"} marginTop={"8px"}>
          {value.map((val, ind) => {
            return (
              <Button variant="contained" key={ind}>
                {val}
              </Button>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};
