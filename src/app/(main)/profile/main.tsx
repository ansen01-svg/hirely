"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { expertiseOptions } from "@/app/utils/selectOptions";
import { ExpertiseOptionArrayTypes } from "@/app/types";
import { UserDataType } from "@/app/types";

type MainPropType = {
  user: UserDataType;
};

// format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day}${month}, ${year}`;
}

export default function Main({ user }: MainPropType) {
  const [expertise, setExpertise] = useState<string>(user.expertise || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [disabled, setIsDisabled] = useState<boolean>(true);

  const handleExpertiseChange = (event: SelectChangeEvent<string>) => {
    setExpertise(event.target.value);
  };

  const updateUser = async (expertise: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/users/updateUser`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer userId=${user.id}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ expertise }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating user");
      }

      const data = await response.json();
      setExpertise(data.data.expertise);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const cancelChange = () => {
    setExpertise((prevState) => prevState);
    setIsEditing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!expertise) return;

    updateUser(expertise);
    setIsDisabled(true);
    setIsEditing(false);
  };

  useEffect(() => {
    if (expertise) {
      setIsDisabled(false);
    }
  }, [expertise]);

  return (
    <main className="w-full min-h-[calc(90vh-73px)]">
      <div className="w-full px-8 md:px-24 lg:px-72">
        <div className="w-full py-8 px-6 mt-10 flex items-start justify-center gap-7 border-solid border-[1px] border-slate-300 rounded shadow">
          <div className="w-16 h-16 md:w-28 md:h-28 flex items-center justify-center">
            <div className="w-full h-full relative border-solid border-[1px] border-slate-300 rounded-full">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={"avatar"}
                  fill
                  priority
                  sizes={"64px"}
                  style={{ objectFit: "contain" }}
                  className="rounded-full"
                />
              ) : (
                <AccountCircleIcon
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    color: "#94a3b8",
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-start justify-center gap-5">
            <div className="flex flex-col items-start justify-center">
              {user && (
                <p className="text-[22px] text-primaryLight font-medium">
                  {user.name}
                </p>
              )}
              {user && (
                <p className="text-[14px] text-slate-500">
                  Profile last updated -{" "}
                  <span className="text-[15px] text-slate-600">
                    {formatDate(user.updatedAt)}
                  </span>
                </p>
              )}
            </div>

            <hr className="w-full h-[1px] bg-slate-300" />

            <div>
              {isEditing ? (
                <form
                  className="flex flex-col items-center justify-center gap-2"
                  onSubmit={handleSubmit}
                >
                  <div className="w-[250px]">
                    <SelectInput
                      label="Select preffered job role*"
                      labelFor="expertise"
                      placeholder={"Select job role"}
                      value={expertise}
                      handleChange={handleExpertiseChange}
                      options={expertiseOptions}
                    />
                  </div>
                  <div className="w-full text-[14px] font-medium flex items-center justify-center gap-2">
                    <button
                      onClick={cancelChange}
                      className="w-[50%] h-[33px] rounded border-solid border-[1px] border-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={disabled}
                      type="submit"
                      className="w-[50%] h-[33px] rounded text-white bg-slate-500 disabled:bg-slate-300"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-[14px] text-slate-500">
                  <div className="flex items-center justify-center gap-2">
                    {expertise ? (
                      <p>Preferred job role: {expertise}</p>
                    ) : (
                      <p>Add a preferred job role</p>
                    )}
                    <button className="mb-1" onClick={() => setIsEditing(true)}>
                      <EditOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type SelectInputPropType = {
  label: string;
  labelFor: string;
  placeholder: string;
  value: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
  options: ExpertiseOptionArrayTypes;
};

function SelectInput({
  label,
  labelFor,
  placeholder,
  value,
  handleChange,
  options,
}: SelectInputPropType) {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <label htmlFor={labelFor} className="text-[14px] text-primaryLight">
        {label}
      </label>
      <FormControl
        sx={{
          ".MuiInputBase-root": {
            fontSize: "14px",
          },
        }}
        fullWidth
        variant="outlined"
      >
        <Select
          displayEmpty
          placeholder={placeholder}
          name={labelFor}
          id={labelFor}
          value={value}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span style={{ color: "#9ca3af" }}>{placeholder}</span>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            ".MuiButtonBase-root": {
              fontSize: "14px",
            },
            ".MuiSelect-select": {
              padding: "8px",
            },
          }}
        >
          <MenuItem disabled value="" sx={{ fontSize: "15px" }}>
            <span>{placeholder}</span>
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.title}
              sx={{ fontSize: "14px" }}
            >
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
