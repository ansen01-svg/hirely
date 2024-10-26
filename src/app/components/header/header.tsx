"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { googleLogoutAction } from "@/app/actions/google_logout";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { data } = useSession();

  const getFirstLetter = () => {
    return data?.user?.name?.at(0)?.toLocaleUpperCase();
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="w-[100vw] px-8 py-3 border-[1px] border-slate-200 flex items-center justify-between lg:px-24">
      <div>
        <h1 className="text-[26px] text-secondary font-medium">hirely</h1>
      </div>
      {data && (
        <>
          <div>
            <button
              className="w-7 h-7 bg-secondary text-white flex items-center justify-center rounded-full"
              onClick={handleOpen}
            >
              <p>{getFirstLetter()}</p>
            </button>
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
