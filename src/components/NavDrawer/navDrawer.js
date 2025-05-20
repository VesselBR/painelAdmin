import * as React from "react";

import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

console.log("teste");

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function NavDrawer({ children }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setIsDrawerOpen(false);
  };

  const handleExit = () => {
    //Limpa a autentificação
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("usuario");

    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline className="bg-dark" />
      <AppBar className="bg-dark" position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <img
              src="\assets\img\logo-negative.svg"
              alt="Logo Vessel"
              onClick={() => navigate("/home")}
              width={90}
              style={{ cursor: "pointer" }}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="bg-dark ">
        <DrawerHeader className="bg-dark d-flex justify-content-between align-items-center px-3">
          {/* Avatar e nome alinhados à esquerda */}
          {isDrawerOpen && (
            <div className="d-flex align-items-center">
              <Avatar
                alt="Foto de Perfil"
                src="https://i.pravatar.cc/100"
                className="me-2"
                sx={{ width: 40, height: 40 }}
              />
              <span className="text-light fs-6">Peterson</span>
            </div>
          )}
          {/* Botão de fechar alinhado à direita */}
          <IconButton className="text-light" onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List
          className="bg-dark"
          style={{ height: "100%", marginLeft: "-10px" }}
        >
          <div>
            <button
              className="btn text-light text-start  ps-3"
              onClick={() => navigate("/empresas")}
              style={{ width: "100%" }}
            >
              <img
                alt=""
                src="\assets\img\sidebar\gear.svg"
                width={35}
                height={35}
                className=""
              />
              <span
                className={`ps-3 transition-all duration-300 ${!isDrawerOpen ? "d-none" : ""}`}
              >
                Empresas
              </span>
            </button>
          </div>
          <div>
            <button
              className="btn text-light text-start  ps-3"
              onClick={handleExit}
              style={{ width: "100%" }}
            >
              <img
                alt=""
                src="\assets\img\sidebar\exits.svg"
                width={37}
                height={37}
                className=""
              />
              <span
                className={`ps-3 transition-all duration-300 ${!isDrawerOpen ? "d-none" : ""}`}
              >
                Sair
              </span>
            </button>
          </div>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />{" "}
        {/* Isso serve só pra empurrar o conteúdo pra baixo do AppBar */}
        {children}
      </Box>
    </Box>
  );
}
