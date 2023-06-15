import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";
import { BASE_URL } from "./DwellClassic";

export const SavePermutation = ({
  permutations,
  insertedId,
  onSavePermutationComplete,
}) => {
  const { status, responseData, postData } = usePostClient();
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    if (responseData == undefined) return;

    if (status == Status.Success) {
      onSavePermutationComplete(responseData?.message);
    }
    
  }, [status, responseData]);

  const savePermutation = (permutation) => {
    const data = {
      selectedPermutation: permutation,
      inserted_id: insertedId,
      command: "savePermutation",
    };
    postData(data, BASE_URL + "/savepermutations/");
  };

  return (
    <>
      {permutations?.map((permutation, index) => {
        return (
          <Button
            variant="contained"
            onClick={() => savePermutation(permutation)}
            key={index}
          >
            {permutation.map((item) => item + ", ")}
          </Button>
        );
      })}
    </>
  );
};
