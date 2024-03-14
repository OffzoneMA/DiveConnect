import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DivingAssociationCard from '../../components/divingAssociation/DivingAssociationCard';
import CustomLayout from '../../components/common/Layout';
import { useDivingAssociations } from '../../contexts/DivingAssociationContext';

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

const DivingAssociationList = () => {
  const classes = useStyles();
  const { divingAssociations } = useDivingAssociations();

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

export default DivingAssociationList;
