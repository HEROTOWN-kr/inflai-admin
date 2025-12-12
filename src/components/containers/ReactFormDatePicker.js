import React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ReactFormDatePicker(props) {
  const { control, name, ...datePickerProps } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            onChange={(value) => field.onChange(value)}
            disableFuture={datePickerProps.disableFuture}
            disablePast={datePickerProps.disablePast}
            inputFormat={datePickerProps.format || "yyyy/MM/dd"}
            renderInput={(params) => <input style={{ display: "none" }} {...params.inputProps} />}
            {...datePickerProps}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default ReactFormDatePicker;
