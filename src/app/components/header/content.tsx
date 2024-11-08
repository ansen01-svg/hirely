"use client";

import Image from "next/image";
import Link from "next/link";
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
import logo from "@/app/assets/JobGregate_second.png";

type ContentPropType = {
  image: string;
  user: string;
};

export default function Conent({ user, image }: ContentPropType) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="w-full px-4 py-3 flex items-center justify-between md:justify-between md:px-8 lg:px-24">
      <div className="h-[48px] flex items-center justify-center">
        <Link href={"/"} className="w-40 h-16 relative">
          <Image
            src={logo}
            alt={"logo"}
            fill
            priority
            sizes="112px"
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>

      {user && (
        <>
          <div className="flex items-center justify-center gap-5">
            <button
              className="w-7 h-7 bg-secondary text-white flex items-center justify-center relative rounded-full"
              onClick={handleOpen}
            >
              {image ? (
                <Image
                  src={image}
                  alt={"user_passport"}
                  fill
                  priority
                  sizes="28px"
                  style={{ objectFit: "contain" }}
                  className="rounded-full"
                />
              ) : (
                <p>{user}</p>
              )}
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
    localStorage.clear();
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
