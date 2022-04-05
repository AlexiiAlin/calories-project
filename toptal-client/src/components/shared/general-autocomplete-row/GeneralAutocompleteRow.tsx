import {TextField, Typography} from "@material-ui/core";
import React from "react";
import {Autocomplete} from "@material-ui/lab";

interface GeneralTextRowProps {
  label: string;
  state: [any, (newValue: any) => void];
  noMarginBottom?: boolean;
  flexColumn?: boolean
  options: Array<any>;
  getOptionLabel?: (option) => string;
  renderInput?: (params) => any;
}

export const GeneralAutocompleteRow = (props: GeneralTextRowProps) => {
  const [value, setValue] = props.state;
  const {label, noMarginBottom, flexColumn, options, getOptionLabel, renderInput} = props;
  const computedGetOptionLabel = getOptionLabel || (
    (option) => option.name
  );
  const computedRenderInput = renderInput || (
    (params) => <TextField {...params} variant="outlined" />
  );

  return (
    <div className={`${flexColumn ? 'general-column' : 'general-row'} ${!noMarginBottom && 'mb-6'}`}>
      <div className="general-label">
        <Typography variant="body1">
          {label}
        </Typography>
      </div>
      <div className="general-value">
        <Autocomplete
          // id="choose-specialisation"
          options={options}
          value={value}
          onChange={((_, val) => {
            setValue(val);
          })}
          getOptionLabel={computedGetOptionLabel}
          renderInput={computedRenderInput}
        />
      </div>
    </div>
  )
}
