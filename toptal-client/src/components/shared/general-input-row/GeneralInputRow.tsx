import {Input, TextField, Typography} from "@material-ui/core";
import React from "react";

interface GeneralTextRowProps {
  label: string;
  state: [any, (newValue: any) => void];
  noMarginBottom?: boolean;
  flexColumn?: boolean
  useTextarea?: boolean;
  type?: string;
}

export const GeneralInputRow = (props: GeneralTextRowProps) => {
  const [value, setValue] = props.state;
  const {label, noMarginBottom, flexColumn, useTextarea, type} = props;

  return (
    <div className={`${flexColumn ? 'general-column' : 'general-row'} ${!noMarginBottom && 'mb-6'}`}>
      <div className="general-label">
        <Typography variant="body1">
          {label}
        </Typography>
      </div>
      <div className="general-value">
        {
          useTextarea
            ? <TextField
                className="w-full"
                multiline
                rows={6}
                variant="outlined"
                value={value}
                onChange={((ev) => {
                  setValue(ev.target.value);
                })}
              />
            : <Input
                type={type || 'text'}
                value={value}
                onChange={((ev) => {
                  setValue(ev.target.value);
                })}
              />
        }
      </div>
    </div>
  )
}
