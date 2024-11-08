import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import FormGroup from "@mui/material/FormGroup";
import { OptionArrayTypes } from "@/app/types";
import { JobSearchType } from "./home_page_main";
import {
  datePostedOptions,
  jobRequirementsOptions,
  employmentTypeOptions,
  companyTypeOptions,
} from "@/app/utils/selectOptions";

type FormSectionPropType = {
  jobSearch: JobSearchType;
  handleJobSearchInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  clearJobSearchTitleValue: () => void;
  clearJobSearchLocationValue: () => void;
  datePosted: string;
  employmentType: string;
  jobRequirements: string;
  companyType: string;
  isRemote: boolean;
  handleIsRemoteChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDatePostedChange: (event: SelectChangeEvent<string>) => void;
  handleEmploymentTypeChange: (event: SelectChangeEvent<string>) => void;
  handleJobRequirementsChange: (event: SelectChangeEvent<string>) => void;
  handleCompanyTypeChange: (event: SelectChangeEvent<string>) => void;
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#177ddc",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255,255,255,.35)",
    }),
  },
}));

const description = "Filter jobs by your preferences";

export default function FormSection(props: FormSectionPropType) {
  const {
    jobSearch,
    handleJobSearchInputChange,
    clearJobSearchLocationValue,
    clearJobSearchTitleValue,
    datePosted,
    employmentType,
    jobRequirements,
    companyType,
    isRemote,
    handleIsRemoteChange,
    handleDatePostedChange,
    handleEmploymentTypeChange,
    handleJobRequirementsChange,
    handleCompanyTypeChange,
  } = props;

  return (
    <div className="w-full px-4 md:px-24 lg:px-44">
      <div className="w-full border-solid border-[1px] border-slate-300 shadow">
        <div className="w-full py-5 px-5 md:px-6 md:py-4 lg:px-8 lg:py-4">
          <div className="w-full flex flex-col items-center justify-center gap-5 lg:flex-row lg:gap-0">
            <div className="w-full h-full flex flex-col items-start justify-start lg:w-[50%]">
              <h1 className="text-[24px] text-primaryLight font-bold">
                {description}
              </h1>
            </div>

            <div className="w-full lg:w-[50%] lg:ml-8">
              <div className="w-full">
                <Paper
                  sx={{
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    width: "100%",
                    height: "100%",
                    boxShadow: "0",
                  }}
                >
                  <InputBase
                    sx={{
                      flex: 1,
                      fontSize: "15px",
                      border: "1px solid #cbd5e1",
                      ".MuiInputBase-input": { height: "42px", padding: 0 },
                      ".MuiInputAdornment-root": {
                        marginRight: "6px",
                        marginLeft: "6px",
                      },
                      "&:focus-within": {
                        border: "1px solid #10a37f",
                      },
                    }}
                    id="input-with-icon-adornment"
                    placeholder="Search by title"
                    inputProps={{ "aria-label": "Search by title" }}
                    name="title"
                    aria-label="title"
                    value={jobSearch.title}
                    onChange={handleJobSearchInputChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    }
                    endAdornment={
                      jobSearch.title && (
                        <InputAdornment position="start">
                          <button onClick={clearJobSearchTitleValue}>
                            <ClearOutlinedIcon fontSize="small" />
                          </button>
                        </InputAdornment>
                      )
                    }
                  />

                  <InputBase
                    sx={{
                      width: "40%",
                      fontSize: "15px",
                      border: "1px solid #cbd5e1",
                      ".MuiInputBase-input": { height: "42px", padding: 0 },
                      ".MuiInputAdornment-root": {
                        marginRight: "6px",
                        marginLeft: "6px",
                      },
                      "&:focus-within": {
                        border: "1px solid #10a37f",
                      },
                    }}
                    id="input-with-icon-adornment"
                    placeholder="Location"
                    inputProps={{ "aria-label": "Location" }}
                    name="location"
                    aria-label="location"
                    value={jobSearch.location}
                    onChange={handleJobSearchInputChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <LocationOnOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    }
                    endAdornment={
                      jobSearch.location && (
                        <InputAdornment position="start">
                          <button onClick={clearJobSearchLocationValue}>
                            <ClearOutlinedIcon fontSize="small" />
                          </button>
                        </InputAdornment>
                      )
                    }
                  />
                </Paper>
              </div>
            </div>
          </div>

          <div className="w-full py-5 flex flex-col items-center justify-center gap-5 lg:flex-row lg:gap-8">
            <div className="w-full flex flex-col items-start justify-center gap-2 lg:w-[50%]">
              <SelectInput
                label="Employment type"
                labelFor="employment-type"
                placeholder={"Select employment type"}
                value={employmentType}
                handleChange={handleEmploymentTypeChange}
                options={employmentTypeOptions}
              />
            </div>

            <div className="w-full flex flex-col items-start justify-center gap-2 lg:w-[50%]">
              <SelectInput
                label="Job requirements"
                labelFor="job-requirements"
                placeholder={"Select experience"}
                value={jobRequirements}
                handleChange={handleJobRequirementsChange}
                options={jobRequirementsOptions}
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-5 lg:flex-row lg:gap-8">
            <div className="w-full flex flex-col items-start justify-center gap-2 lg:w-[50%]">
              <SelectInput
                label="Company type"
                labelFor="company-type"
                placeholder={"Select company type"}
                value={companyType}
                handleChange={handleCompanyTypeChange}
                options={companyTypeOptions}
              />
            </div>

            <div className="w-full flex flex-col items-start justify-center gap-2 lg:w-[50%]">
              <SelectInput
                label="Date posted"
                labelFor="date-posted"
                placeholder={"Select date posted"}
                value={datePosted}
                handleChange={handleDatePostedChange}
                options={datePostedOptions}
              />
            </div>
          </div>

          <div className="w-full mt-5 flex items-center justify-start gap-3">
            <FormGroup>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <AntSwitch
                  checked={isRemote}
                  onChange={handleIsRemoteChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography
                  sx={{ fontSize: "14px", color: "#2d333a", fontWeight: 500 }}
                >
                  Remote jobs only
                </Typography>
              </Stack>
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
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
  options: OptionArrayTypes;
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
      <label
        htmlFor={labelFor}
        className="text-[15px] text-primaryLight font-medium"
      >
        {label}
      </label>
      <FormControl
        sx={{
          ".MuiInputBase-root": {
            fontSize: "15px",
          },
          // Customize the underline color for standard variant
          ".MuiInput-underline:before": {
            borderBottom: "2px solid #10a37f", // Initial underline color
          },
          ".MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid #10a37f", // Underline color on hover
          },
          ".MuiInput-underline:after": {
            borderBottom: "2px solid #10a37f", // Underline color on focus
          },
        }}
        fullWidth
        variant="standard"
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
              fontSize: "15px",
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
              sx={{ fontSize: "15px" }}
            >
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
