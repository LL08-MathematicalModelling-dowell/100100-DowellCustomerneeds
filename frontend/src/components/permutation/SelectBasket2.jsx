import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import LoadingButton from '@mui/lab/LoadingButton';
import { usePostClient} from "../../client/postClient"
import { Status } from "../../client/status";
import { BASE_URL } from "./AllBasket";

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
        <LoadingButton
          loading={status==Status.Pending}
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
        </LoadingButton>
      </Box>
    </>
  );
};
