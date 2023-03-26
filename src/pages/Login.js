import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import api from "../utils/api";
import { Link } from "react-router-dom";
import tokenHandle from "../utils/token";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyError, setEmptyError] = useState(false);

  const handleChangeEmail = (e) => {
    setEmptyError(false);
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setEmptyError(false);

    setPassword(e.target.value);
  };
  const onClickLogIn = async () => {
    if (!email || !password) {
      setEmptyError(true);
      return;
    }
    const data = {
      email,
      password,
    };
    const response = await api.post("/users/login", data);
    tokenHandle(response.data.token, response.data.userData.email);
    console.log(response);
    navigate("/");
  };
  return (
    <Grid container marginTop={20}>
      <Grid item xs={12} md={4} sm={4}></Grid>
      <Grid item xs={12} md={4} sm={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              placeholder="Email"
              onChange={(e) => handleChangeEmail(e)}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              placeholder="Password"
              onChange={(e) => handleChangePassword(e)}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <Button variant="contained" onClick={onClickLogIn}>
              Log In
            </Button>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            {emptyError ? (
              <Typography sx={{ color: "red" }}>
                Provide email and password
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <Typography component={Link} to={"/signup"}>
              Sign Up here.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} sm={4}></Grid>
    </Grid>
  );
}

export default Login;
