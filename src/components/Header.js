import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import tokenHandle from "../utils/token";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token);
    // const onStorageChange = () => {
    //   const newToken = localStorage.getItem("token");
    //   console.log(newToken);
    //   setIsLoggedIn(newToken);
    // };
    // window.addEventListener("storage", onStorageChange);

    // return () => {
    //   window.removeEventListener("storage", onStorageChange);
    // };
  }, []);
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate("/login");
  };
  const handleClickLogout = () => {
    tokenHandle(null, null);

    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to={"/"}
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            Home
          </Typography>
          {isLoggedIn ? (
            <Button onClick={handleClickLogout} color="inherit">
              LogOut
            </Button>
          ) : (
            // <Button>Logout</Button>
            <Button onClick={handleClickLogin} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
