import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { Button, CircularProgress, Typography } from "@mui/material";
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";
import { SaveFinalBasketOrder } from "./SaveFinalBasketOrder";
import { SavePermutation } from "./SavePermutation";
import { SelectBasket2 } from "./SelectBasket2";
import LoadingButton from '@mui/lab/LoadingButton';

export default function AutoCompleter() {
  const [q1Data, setQ1Data] = useState([]);
  const [q2Data, setQ2Data] = useState([]);
  const [q3Data, setQ3Data] = useState([]);
  const [selectedQ1Data, setSelectedQ1Data] = useState(null);
  const [selectedQ2Data, setSelectedQ2Data] = useState(null);
  const [selectedQ3Data, setSelectedQ3Data] = useState(null);

  const [loading, setLoading] = useState(false);
  const isSubmitDisabled =
    !selectedQ1Data || !selectedQ2Data || !selectedQ3Data;

  const [submitBtnClicked, setSubmitBtnClicked] = useState(false);

  useEffect(() => {
    setLoading(true); // set loading to true when the fetch request is initiated
    setTimeout(() => {
      // add a 2s delay before fetching the data
      fetch("http://127.0.0.1:8000/q1/")
        .then((response) => response.json())
        .then((data) => {
          setQ1Data(data);
          setLoading(false); // set loading to false when the data is fetched
        })
        .catch((error) => {
          console.error("Error fetching q1 data:", error);
          setLoading(false); // set loading to false when an error occurs
        });

      fetch("http://127.0.0.1:8000/q2/")
        .then((response) => response.json())
        .then((data) => {
          setQ2Data(data);
          setLoading(false); // set loading to false when the data is fetched
        })
        .catch((error) => {
          console.error("Error fetching q2 data:", error);
          setLoading(false); // set loading to false when an error occurs
        });

      fetch("http://127.0.0.1:8000/q3/")
        .then((response) => response.json())
        .then((data) => {
          setQ3Data(data);
          setLoading(false); // set loading to false when the data is fetched
        })
        .catch((error) => {
          console.error("Error fetching q3 data:", error);
          setLoading(false); // set loading to false when an error occurs
        });
    }, 2000);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitBtnClicked(true);

    const payload = {
      q1: selectedQ1Data?.Item || "",
      q2: selectedQ2Data?.Item || "",
      q3: selectedQ3Data?.Item || "",
    };

    setLoading(true); // set loading to true when API request is initiated
    fetch("http://127.0.0.1:8000/api/services/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data posted successfully:", data);
        setLoading(false); // set loading back to false when data is posted
        alert("Data saved successfully!");
        setSelectedQ1Data(null);
        setSelectedQ2Data(null);
        setSelectedQ3Data(null);
      })
      .catch((error) => {
        setLoading(false); // set loading back to false when an error occurs
        console.error("Error posting data:", error);
      })
      .finally(() => {
        setSubmitBtnClicked(false);
      });
  };

  return (
    <>
      <Card sx={{ minWidth: 400, maxWidth: 1200, m: 8 }}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
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
                  loading ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "For"
                  )
                }
                size="small"
              />
            )}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            disabled={isSubmitDisabled}
            sx={{ width: "100%", maxWidth: 250 }}
          >
            {loading ? (
              <CircularProgress size={24} color="primary" />
            ) : (
              "Submit"
            )}
          </Button>
          <AllBasket submitBtnClicked={submitBtnClicked} />
        </Box>
      </Card>
    </>
  );
}

const classificationData = {
  country: [
    {
      item: "India",
      itemLink: "Asia",
    },
    {
      item: "USA",
      itemLink: "North America",
    },
    {
      item: "Germany",
      itemLink: "Europe",
    },
  ],
  state: [
    {
      item: "Uttar Pradesh",
      itemLink: "India",
    },
    {
      item: "Maharashtra",
      itemLink: "India",
    },
    {
      item: "Georgia",
      itemLink: "USA",
    },
    {
      item: "Nevada",
      itemLink: "USA",
    },
    {
      item: "Bavaria",
      itemLink: "Germany",
    },
    {
      item: "Brandenburg",
      itemLink: "Germany",
    },
  ],
  city: [
    {
      item: "Agra",
      itemLink: "Uttar Pradesh",
    },
    {
      item: "Noida",
      itemLink: "Uttar Pradesh",
    },
    {
      item: "Pune",
      itemLink: "Maharashtra",
    },
    {
      item: "Mumbai",
      itemLink: "Maharashtra",
    },
    {
      item: "Atlanta",
      itemLink: "Georgia",
    },
    {
      item: "Carson City",
      itemLink: "Nevada",
    },
    {
      item: "Munich",
      itemLink: "Bavaria",
    },
    {
      item: "Potsdam",
      itemLink: "Brandenburg",
    },
  ],
};

export const BASE_URL = "http://100061.pythonanywhere.com";

const AllBasket = ({ submitBtnClicked }) => {
  const { status, responseData, postData } = usePostClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepData, setCurrentStepData] = useState(undefined);


  const allBasketRequest = () => {
    postData(
      classificationData,
      "http://100061.pythonanywhere.com/allbaskets/"
    );
  };

  const sendTypeRequest = () => {
    const data = {
      numberOfLevels: 3,
      classificationType: "N",
      dbInsertedId: responseData.dbInsertedId,
    };
    postData(data, BASE_URL + "/type/");
  };

  useEffect(() => {
    if (submitBtnClicked) {
      allBasketRequest();
    }
  }, [submitBtnClicked]);

  useEffect(() => {
    if (responseData == undefined) return;

    if (status == Status.Success && responseData !== undefined) {
      setCurrentStepData(responseData);
      setCurrentStep(currentStep + 1);
    }
  }, [status, responseData]);

  return (
    <Box>
      {currentStep == 0 && (
        <LoadingButton 
        loading={status==Status.Pending}
        onClick={allBasketRequest}>
                  
        </LoadingButton>
      )}
      {currentStep == 1 && (
        <Box>
          <Typography> numberOfLevels: 3, classificationType: N</Typography>
          <LoadingButton
          loading={status==Status.Pending}
            variant="contained"
            color="primary"
            onClick={sendTypeRequest}
          >
          Continue with classification type
          </LoadingButton>
        </Box>
      )}

      {currentStep == 2 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          {currentStepData?.baskets?.map((value) => (
            <Box m={2} key={value}>
              <SelectBasket2
                basketName={value}
                previousResponse={currentStepData}
                dbInsertedId={currentStepData?.insertedId}
                onBasket1SelectComplete={(rd) => {
                  setCurrentStepData(rd);
                  setCurrentStep(currentStep + 1);
                }}
              />
            </Box>
          ))}
        </>
      )}

      {currentStep == 3 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          {currentStepData?.baskets?.map((value) => (
            <Box m={2} key={value}>                        
              <SelectBasket2
                basketName={value}
                previousResponse={currentStepData}
                dbInsertedId={currentStepData?.insertedId}
                onBasket1SelectComplete={(rd) => {
                  console.log("rd", rd.permutations, currentStep);
                  setCurrentStepData(rd);
                  setCurrentStep(currentStep + 1);
                }}
              />
            </Box>
          ))}
        </>
      )}

      {currentStep == 4 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <SavePermutation
            insertedId={currentStepData?.insertedId}
            permutations={currentStepData?.permutations}
            onSavePermutationComplete={(message) => {
              setCurrentStep(currentStep + 1);
              alert(message);
            }}
          />
        </>
      )}

      {currentStep == 5 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            Select a basket
          </Typography>

          {currentStepData?.baskets?.map((value) => (
            <Box m={2} key={value}>
              <SelectBasket2
                basketName={value}
                previousResponse={currentStepData}
                dbInsertedId={currentStepData?.insertedId}
                onBasket1SelectComplete={(rd) => {
                  console.log("rd", rd, currentStep);
                  setCurrentStepData(rd);
                  setCurrentStep(currentStep + 1);
                }}
              />
            </Box>
          ))}
        </>
      )}

      {currentStep == 6 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <SavePermutation
            insertedId={currentStepData?.insertedId}
            permutations={currentStepData?.permutations}
            onSavePermutationComplete={(message) => {
              alert(message);
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}

      {currentStep == 7 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            Save Final Basket Order
          </Typography>

          <SaveFinalBasketOrder
            dbInsertedId={currentStepData?.insertedId}
            onComplete={(rd) => {
              setCurrentStepData(rd);
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}

      {currentStep == 8 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <SelectItem
            items={currentStepData?.items}
            basket={currentStepData.basket}
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              setCurrentStepData({
                ...rd,
                insertedId: currentStepData?.insertedId,
              });
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}

      {currentStep == 9 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <Typography>{currentStepData?.currentBasket} items</Typography>
          <SelectItem
            items={currentStepData?.currentBasketItems}
            basket={currentStepData?.currentBasket}
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              setCurrentStepData({
                ...rd,
                insertedId: currentStepData?.insertedId,
              });
              setCurrentStep(currentStep + 1);
            }}
          />

          <Typography>{currentStepData?.nextBasket} basket items</Typography>
          <SelectItem
            items={currentStepData?.nextBasketItems}
            basket={currentStepData?.nextBasket}
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              setCurrentStepData({
                ...rd,
                insertedId: currentStepData?.insertedId,
              });
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}

      {currentStep == 10 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <SavePermutation
            insertedId={currentStepData?.insertedId}
            permutations={currentStepData?.permutations}
            onSavePermutationComplete={(message) => {
              alert(message);
              setCurrentStep(currentStep + 1);
            }}
          />

          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            variant="outlined"
          >
            Next
          </Button>
        </>
      )}

      {currentStep == 11 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <Typography>{currentStepData?.currentBasket} items</Typography>
          <SelectItem
            items={currentStepData?.currentBasketItems}
            basket={currentStepData.currentBasket}
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              setCurrentStepData({
                ...rd,
                insertedId: currentStepData?.insertedId,
              });
              setCurrentStep(currentStep + 1);
            }}
          />

          <Typography>{currentStepData?.nextBasket} items</Typography>
          <SelectItem
            items={currentStepData?.nextBasketItems}
            basket={currentStepData?.nextBasket}
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              setCurrentStepData({
                ...rd,
                insertedId: currentStepData?.insertedId,
              });
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}
    </Box>
  );
};

const SelectItem = ({ items, basket, insertedId, onCompleteItemSelect }) => {
  const { status, responseData, postData } = usePostClient();

  useEffect(() => {
    if (status === Status.Success && responseData !== undefined) {
      onCompleteItemSelect(responseData);
    }
    
  }, [status, responseData]);

  return (
    <>
      <Box>
        {items?.map((item) => (
          <LoadingButton
            loading={status==Status.Pending}
            key={item}
            variant="contained"
            color="primary"
            sx={{ width: "100%", maxWidth: 250 }}
            onClick={() => {
              postData(
                {
                  selectedItem: item,
                  basket: basket,
                  insertedId: insertedId,
                  status: true,
                },
                BASE_URL + "/item/"
              );
            }}
          >
          {item}
            
          </LoadingButton>
        ))}
      </Box>
    </>
  );
};
