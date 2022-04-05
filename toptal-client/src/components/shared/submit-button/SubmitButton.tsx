import {Button, CircularProgress} from "@material-ui/core";
import React from "react";

interface SubmitButtonProps {
  loading?: boolean;
  children: any;
  onClick?: any;
  disabled?: boolean;
  color?: any;
  type?: any;
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const {loading, color, ...otherProps} = props;

  return (
    <div className="general-row mb-8">
      { loading && <CircularProgress style={{margin: '0 12px'}}/> }
      <Button
        variant="contained"
        color={color || 'primary'}
        className="general-button"
        {...otherProps}
      />
    </div>
  )
}
