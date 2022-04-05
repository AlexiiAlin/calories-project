import {Typography} from "@material-ui/core";
import React from "react";

interface GeneralTextRowProps {
  label: string;
  value: string;
  noMarginBottom?: boolean;
}

export const GeneralRow = (props: GeneralTextRowProps) => {
  const {label, value, noMarginBottom} = props;
  return (value &&
    <div className={`general-row ${!noMarginBottom && 'mb-1'}`}>
      <div className="general-label">
        <Typography variant="caption">
          <b>{label}</b>
        </Typography>
      </div>
      <div className="general-value">
        <Typography variant="caption">
          {value}
        </Typography>
      </div>
    </div>
  )
}
