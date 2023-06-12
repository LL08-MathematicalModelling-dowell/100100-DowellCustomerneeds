import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";
import { BASE_URL } from "./DwellClassic";

export const SaveFinalBasketOrder = ({ dbInsertedId, onComplete }) => {
  const { status, responseData, postData } = usePostClient();

  useEffect(() => {
    if (status === Status.Success && responseData !== undefined) {
      onComplete(responseData);
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
                selectedBasket: "BasketOrder",
                insertedId: dbInsertedId,
                baskets: ["BasketOrder"],
              },
              BASE_URL + "/basket/"
            );
          }}
        >
          Continue
        </Button>
      </Box>
    </>
  );
};
