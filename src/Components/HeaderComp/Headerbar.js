import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./Headerbar.css";
import logo from "../ImageCom/logo.png";
import Locationbar from "../HeaderComp/Locationbar";
import { Link } from "@mui/material";
import Slider from "../SliderComp/Slider";
import Bar from "../Bar";
import Footer from '../FooterComp/Footer';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCog,
  faTachometerAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const pages = ["HOME", "ORDER ONLINE", "MENU", "CATERING", "LOCATION"];
const settings = [
  { name: "Profile", icon: faUser },
  { name: "Account", icon: faCog },
  { name: "Dashboard", icon: faTachometerAlt },
  { name: "Logout", icon: faSignOutAlt },
];

const storedId = localStorage.getItem("userId");

function Headerbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    localStorage.clear("items");
    navigate("/login");
  };

  const UserProfile = () => {
    navigate("/userProfile");
  };

  useEffect(() => {
    axios
      .get(`https://localhost:44341/api/Users/${storedId}`)
      .then((response) => {
        setUserData(response.data);
      });
  }, []);

  return (
    <div>
      {/* <Locationbar /> */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "black",
          position: "sticky",
          top: "0",
          zIndex: "999",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: "40px", width: "auto" }}
              />
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: "40px", width: "auto" }}
              />
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontSize: "14px",
                    lineHeight: "50px",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": {
                      color: "#b99272",
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Link
              to=""
              target=""
              rel="noopener noreferrer"
              className="btn-epic"
              style={{ width: "10%" }}
            >
              <div>
                <span>ORDER NOW</span>
                <span>ORDER NOW</span>
              </div>
            </Link>
            <Box sx={{ flexGrow: 0, ml: "20px" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {userData && (
                    <Typography sx={{ color: "white", marginRight: 1 }}>
                      {userData.firstName}
                    </Typography>
                  )}
                  <Avatar alt={userData ? userData.firstName : ""} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "68px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting.name === "Logout") {
                        logOut();
                      }
                      if (setting.name === "Profile") {
                        UserProfile();
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={setting.icon}
                      style={{ marginRight: "10px" }}
                    />
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <UserProfilePage/> */}
      <Slider />
      <Bar />
      <Footer />
    </div>
  );
}

export default Headerbar;
