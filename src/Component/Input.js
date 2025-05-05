import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const Input = ({ name, label, control, rules = {}, type = 'text', ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          {...props}
        />
      )}
    />
  );
};

export default Input;