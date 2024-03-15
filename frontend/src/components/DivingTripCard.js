import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EquipmentCheckbox from './EquipmentCheckbox'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    flexGrow: 1,
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const DivingTripCard = ({ trip }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.card}>
        <Typography variant="h5" className={classes.title}>
          {trip.name}
        </Typography>
        <Typography variant="subtitle1">{trip.location}</Typography>
        <EquipmentCheckbox equipment={trip.equipment} />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" color="primary">
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default DivingTripCard;
