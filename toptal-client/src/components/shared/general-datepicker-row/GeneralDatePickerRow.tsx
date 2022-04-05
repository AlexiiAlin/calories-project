import {Typography} from "@material-ui/core";
import React from "react";
import {DatePicker, DateTimePicker} from "@material-ui/pickers";

interface GeneralDatePickerProps {
  label: string;
  state: [any, (newValue: any) => void];
  noMarginBottom?: boolean;
  flexColumn?: boolean
  useTimePicker?: boolean;
}

export const GeneralDatePickerRow = (props: GeneralDatePickerProps) => {
  const [value, setValue] = props.state;
  const {label, noMarginBottom, flexColumn, useTimePicker} = props;

  return (
    <div className={`${flexColumn ? 'general-column' : 'general-row'} ${!noMarginBottom && 'mb-6'}`}>
      <div className="general-label">
        <Typography variant="body1">
          {label}
        </Typography>
      </div>
      <div className="general-value">
        {
          useTimePicker
            ? <DateTimePicker
                variant="inline"
                value={value}
                onChange={(date) => setValue(date)}
              />
            : <DatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                value={value}
                onChange={(date) => setValue(date)}
                views={["year"]}
              />
        }
      </div>
    </div>
  )
}
