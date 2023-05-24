import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Dropdown({name, options, onChange, error}: {name: string, options: string[], onChange: (event: SelectChangeEvent) => void, error?: boolean}) {
  const [selection, setSelection] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelection(event.target.value as string);
    onChange(event);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selection}
          label={name}
          name={name}
          onChange={handleChange}
          error={error}
        >
          {
            options.map(option => {
              return <MenuItem value={option}>{option}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}