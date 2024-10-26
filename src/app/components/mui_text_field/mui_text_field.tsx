import TextField from "@mui/material/TextField";
import React from "react";

type MuiTextFieldPropType = {
  label: string;
  type: string;
  name: string;
  icon?: React.ReactNode;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function MuiTextField(props: MuiTextFieldPropType) {
  const { label, type, name, icon, handleClick } = props;

  return (
    <div className="w-full h-[52px] px-4 flex items-center justify-items-center border-[1px] border-slate-200 rounded">
      <TextField
        id={name}
        variant="standard"
        size="small"
        fullWidth
        label={label}
        type={type}
        name={name}
        slotProps={{
          input: {
            disableUnderline: true,
            style: {
              fontSize: "15px",
            },
          },
        }}
        sx={{
          ".MuiFormLabel-root": {
            fontSize: "15px",
            color: "#666",
          },
          "& label": {
            "&.Mui-focused": {
              color: "#666",
            },
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset",
          },
        }}
      />
      {icon && (
        <button
          className="px-1 py-1 flex items-center justify-center text-gray2 rounded-full hover:bg-primary hover:text-primary"
          type="button"
          onClick={handleClick}
        >
          {icon}
        </button>
      )}
    </div>
  );
}
