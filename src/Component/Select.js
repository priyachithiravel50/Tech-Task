import React from 'react';
import { MenuItem, Select as MUISelect, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

const Select = ({ name, label, control, options = [], rules = {}, ...props }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Controller name={name}control={control}rules={rules}render={({ field, fieldState }) => (
          <MUISelect {...field}label={label}error={!!fieldState.error}{...props}>
            {options.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
          </MUISelect>
        )}/>
      <FormHelperText error>{control?._formState?.errors?.[name]?.message}</FormHelperText>
    </FormControl>
  );
};
export default Select;
