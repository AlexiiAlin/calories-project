import {Typography} from "@material-ui/core";
import React from "react";
import {isNullOrUndefined} from "../../../helpers/utils";

interface GeneralTextRowProps {
  label: string;
  value: string | number;
  noMarginBottom?: boolean;
}

export const GeneralRow = (props: GeneralTextRowProps) => {
  const {label, value, noMarginBottom} = props;
  return (!isNullOrUndefined(value) &&
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
