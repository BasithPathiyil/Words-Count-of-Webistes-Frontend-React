import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../utils/api";
import PreviousInsights from "./PreviousInsights";

function Home() {
  const [islOggedIn, setIsLoggedIn] = useState(localStorage.getItem("emailId"));
  const [count, setCount] = useState(1);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState(false);
  const [wordsLength, setWordsLength] = useState(null);
  const [wordsArray, setWordsArray] = useState([]);
  useEffect(() => {
    const emailId = localStorage.getItem("emailId");
    setIsLoggedIn(emailId);
  }, []);

  const handleChangeUrl = (e) => {
    setUrlError(false);
    setUrl(e.target.value);
  };
  const handleClickCount = async () => {
    if (!url) {
      setUrlError(true);
      return;
    }

    try {
      var response;
      const userId = localStorage.getItem("emailId");
      if (userId) {
        const dataBody = {
          userId,
          url,
        };
        response = await api.post(`/insights/addInsight`, dataBody);
        setCount(count + 1);
      } else {
        const dataBody = {
          url,
        };
        response = await api.post(`/insights/addInsight`, dataBody);
      }

      console.log(response);
      setWordsLength(response.data.data.wordsArrayLength);
      setWordsArray(response.data.data.keywordArray);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(wordsLength);
  console.log(wordsArray);
  return (
    <>
      <Header />
      <Grid container marginTop={20}>
        <Grid item md={3} xs={0} sm={2}></Grid>
        <Grid item md={6} xs={12} sm={8}>
          <Grid container>
            <Grid item xs={12} md={9} sm={9}>
              <TextField
                size="small"
                placeholder="Enter ur URL here.."
                onChange={(e) => handleChangeUrl(e)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={3}>
              <Button onClick={handleClickCount} variant="contained">
                Count
              </Button>
            </Grid>
            {urlError ? (
              <Grid>
                <Typography sx={{ color: "red" }}>Url is required</Typography>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Grid item md={3} xs={0} sm={2}></Grid>
        <Grid item xs={12} md={12} sm={12}>
          {wordsLength ? (
            <Alert
              icon={false}
              severity="success"
              sx={{ textAlign: "center", justifyContent: "center" }}
            >
              We found {wordsLength} words on {url}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <Grid container>
        {islOggedIn ? (
          <PreviousInsights
            refresh={count}
            setRefresh={setCount}
            emailId={islOggedIn}
          />
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}

export default Home;
