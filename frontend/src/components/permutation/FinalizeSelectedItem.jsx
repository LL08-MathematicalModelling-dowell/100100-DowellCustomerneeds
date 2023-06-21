import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import LoadingButton from '@mui/lab/LoadingButton';
import { usePostClient} from "../../client/postClient"
import { Status } from "../../client/status";
import { BASE_URL } from "./AllBasket";

export const FinalizeSelectedItem = ({ insertedId, onCompleteItemSelect }) => {
    const { status, responseData, postData } = usePostClient();
  
    useEffect(() => {
      if (status === Status.Success && responseData !== undefined) {
        onCompleteItemSelect(responseData);
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
                  selectedItem: "",
                  basket: "",
                  insertedId: insertedId,
                  status: false,
                },
                BASE_URL + "/item/"
              );
            }}
          >
            Finalize
          </LoadingButton>
        </Box>
      </>
    );
  };