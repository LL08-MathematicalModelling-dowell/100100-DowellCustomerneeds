import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { usePostClient} from "../../client/postClient"
import { Status } from "../../client/status";
import { BASE_URL } from "./AllBasket";

export const DisplayClassificationResult = (results) => {
    const { status, responseData, postData } = usePostClient();
    console.log(results);
    
    return (
      <Box>
        {results.map((value, index) => (
          <LoadingButton loading={status==Status.Pending}
           key={index}>
            {value[0]} - {value[1]}
          </LoadingButton>
        ))}
      </Box>
    );
  };