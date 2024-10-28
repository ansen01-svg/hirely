"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { googleLogoutAction } from "@/app/actions/google_logout";
import Footer from "../footer/footer";

type ContentPropType = {
  user: string;
};

const AntTabs = styled(Tabs)({
  // borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#fff",
  },
});

const AntTab = styled((props: TabProps) => (
  <Tab disableRipple component="div" {...props} />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  ".MuiButtonBase-root": {
    color: "#2d333a",
    fontSize: "15px",
    fontWeight: "normal",
  },
  "&:hover": {
    color: "#10a37f",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#10a37f",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

const title = "JobGregate";

export default function Conent({ user }: ContentPropType) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  // const [openDrawer, setOpenDrawer] = useState(false);
  // const [isDesktop, setIsDesktop] = useState(false);

  // const router = useRouter();
  // const tabScreen = useMediaQuery("(min-width:768px)");

  // const toggleDrawer = (newOpen: boolean) => () => {
  //   setOpenDrawer(newOpen);
  // };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // const handleNavItemClick = (href: string) => {
  //   router.push(href);
  // };

  // useEffect(() => {
  //   if (window.innerWidth >= 768) {
  //     setIsDesktop(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   setIsDesktop(tabScreen);
  // }, [tabScreen]);

  return (
    <div className="w-full px-8 py-3 flex items-center justify-between md:justify-between lg:px-24">
      <div className="h-[48px] flex items-center justify-center">
        <Link href={"/"} className="text-[26px] text-secondary font-medium">
          {title}
        </Link>
      </div>

      {/* {isDesktop && <Navigation />} */}

      {user && (
        <>
          <div className="flex items-center justify-center gap-5">
            <button
              className="w-7 h-7 bg-secondary text-white flex items-center justify-center rounded-full"
              onClick={handleOpen}
            >
              <p>{user}</p>
            </button>
            {/* {!tabScreen && (
              <button
                className="w-10 h-10 hover:bg-[#efefef] rounded-full"
                onClick={toggleDrawer(true)}
              >
                <MenuRoundedIcon sx={{ color: "#2d333a" }} />
              </button>
            )} */}
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              ".MuiPaper-root": {
                border: "1px solid #e2e8f0",
                marginTop: "18px",
                boxShadow: "none",
              },
            }}
          >
            <PopoverContent />
          </Popover>
        </>
      )}

      {/* <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            ".MuiPaper-root": {
              width: "100vw",
              flex: "column",
              alignItems: "center",
              justifyContent: "center",
            },
            ".MuiList-root": {
              flex: 1,
            },
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <div className="w-full px-5 py-3 flex items-center justify-end">
            <button
              className="w-10 h-10 rounded-full hover:bg-[#efefef]"
              onClick={toggleDrawer(false)}
            >
              <CloseRoundedIcon />
            </button>
          </div>

          <List sx={{ flex: 1 }}>
            {["About", "Jobs"].map((text) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ ".MuiTypography-root": { fontSize: "15px" } }}
              >
                <ListItemButton onClick={() => handleNavItemClick(text)}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Footer />
        </Box>
      </Drawer> */}
    </div>
  );
}

function Navigation() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex-1 h-[39px] flex items-center justify-center">
      <Box>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="About" />
          <AntTab label="Jobs" />
        </AntTabs>
      </Box>
    </div>
  );
}

function PopoverContent() {
  const logout = () => {
    googleLogoutAction();
  };

  return (
    <Box sx={{ width: "250px", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="nav-list">
        <List
          sx={{
            marginTop: "1px",
            marginBottom: "1px",
            ".MuiTypography-root": { fontSize: "15px" },
            ".MuiListItemIcon-root": { minWidth: "36px" },
          }}
        >
          <ListItem disablePadding>
            <ListItemButton component="a" href="/profile">
              <ListItemIcon>
                <PersonOutlineOutlinedIcon
                  sx={{ color: "#2d333a", fontSize: "22px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutOutlinedIcon
                  sx={{ color: "#2d333a", fontSize: "22px" }}
                />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
