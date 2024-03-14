import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from '../../components/common/Input';
import CustomButton from '../../components/common/Button';
import { useHistory } from 'react-router-dom';
import { useDivingAssociations } from '../../contexts/DivingAssociationContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
}));

const DivingAssociationNew = ({ setShowNew }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();
  const { createDivingAssociation } = useDivingAssociations();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createDivingAssociation({ name, address, phoneNumber });
      history.push('/diving-associations');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <CustomInput label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <CustomInput label="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <CustomInput label="Phone Number" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <CustomButton type="submit" color="primary" variant="contained">
        Create
      </CustomButton>
      <Button onClick={() => setShowNew(false)}>
        Cancel
      </Button>
    </form>
  );
};

DivingAssociationNew.propTypes = {
  setShowNew: PropTypes.func.isRequired,
};

export default DivingAssociationNew;
