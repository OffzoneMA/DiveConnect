import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import DivingAssociationCard from './DivingAssociationCard';
import CustomLayout from '../common/Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const DivingAssociationList = ({ divingAssociations }) => {
  const classes = useStyles();

  return (
    <CustomLayout>
      <h1>Diving Associations</h1>
      <div className={classes.root}>
        {divingAssociations.map((divingAssociation) => (
          <DivingAssociationCard key={divingAssociation._id} divingAssociation={divingAssociation} />
        ))}
      </div>
    </CustomLayout>
  );
};

DivingAssociationList.propTypes = {
  divingAssociations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default DivingAssociationList;
