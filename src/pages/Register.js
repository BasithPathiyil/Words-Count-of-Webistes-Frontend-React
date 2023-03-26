import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const handleChangeFullName = (e) => {
    setValidationError(false);
    setEmptyError(false);
    setFullName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setValidationError(false);

    setEmptyError(false);
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setValidationError(false);
    setEmptyError(false);

    setPassword(e.target.value);
  };
  const onClickSignUp = async () => {
    if (!email || !password) {
      setEmptyError(true);
      return;
    }
    try {
      const data = {
        fullName,
        email,
        password,
      };
      const response = await api.post("/users/register", data);
      navigate("/login");
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response.data.errors.length > 0) {
        setValidationError(true);
      }
    }
  };
  return (
    <Grid container marginTop={20}>
      <Grid item xs={12} md={4} sm={4}></Grid>
      <Grid item xs={12} md={4} sm={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sm={12}>
            <TextField
              placeholder="Full Name"
              onChange={(e) => handleChangeFullName(e)}
            />
          </Grid>
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
            <Button variant="contained" onClick={onClickSignUp}>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            {emptyError ? (
              <Typography sx={{ color: "red" }}>Fill the form</Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            {validationError ? (
              <Typography sx={{ color: "red" }}>
                Provide Valid details : 1.Should be in email format. 2. Password
                should be minimum 6 characters
              </Typography>
            ) : (
              ""
            )}
          </Grid>

          <Grid item xs={12} md={12} sm={12}>
            <Typography component={Link} to={"/login"}>
              Log In here.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} sm={4}></Grid>
    </Grid>
  );
}

export default Register;
