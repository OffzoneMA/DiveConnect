import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const DivingTypeAutocomplete = ({ onSubmit }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleSelect = (event, value) => {
    setSelectedTypes(value);
  };

  const handleSubmit = () => {
    onSubmit(selectedTypes);
  };

  return (
    <div>
      <Autocomplete
        multiple
        id="diving-type-autocomplete"
        options={[] /* Add your diving trip types options here */}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField {...params} label="Select Diving Trip Types" variant="outlined" />
        )}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default DivingTypeAutocomplete;