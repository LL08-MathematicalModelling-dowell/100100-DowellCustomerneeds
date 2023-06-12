import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";
import { BASE_URL } from "./DwellClassic";

// eslint-disable-next-line react/prop-types
export const SelectBasket2 = ({
  basketName, previousResponse, dbInsertedId, onBasket1SelectComplete,
}) => {
  const { status, responseData, postData } = usePostClient();

  useEffect(() => {
    if (status === Status.Success && responseData !== undefined) {
      onBasket1SelectComplete(responseData);
    }
  }, [status, responseData]);

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", maxWidth: 250 }}
          onClick={() => {
            postData(
              {
                selectedBasket: basketName,
                insertedId: dbInsertedId,
                baskets: previousResponse?.baskets,
              },
              BASE_URL + "/basket/"
            );
          }}
        >
          {basketName}
        </Button>
      </Box>
    </>
  );
};
