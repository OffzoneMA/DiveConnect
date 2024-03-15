import React from 'react';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  label: {
    marginRight: theme.spacing(1),
  },
}));

const EquipmentCheckbox = ({ equipment }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {equipment.map((item) => (
        <FormControlLabel key={item} control={<Checkbox />} label={item} className={classes.label} />
      ))}
    </div>
  );
};

export default EquipmentCheckbox;
