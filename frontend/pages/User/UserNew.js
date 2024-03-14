import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from '../../components/common/Input';
import CustomButton from '../../components/common/Button';
import { useHistory } from 'react-router-dom';
import { useUsers } from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
}));

const UserNew = ({ setShowNew }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const history = useHistory();
  const { createUser } = useUsers();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser({ name, email, password, role });
      history.push('/users');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <CustomInput label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <CustomInput label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <CustomInput label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <CustomInput label="Role" name="role" value={role} onChange={(e) => setRole(e.target.value)} />
      <CustomButton type="submit" color="primary" variant="contained">
        Create
      </CustomButton>
      <Button onClick={() => setShowNew(false)}>
        Cancel
      </Button>
    </form>
  );
};

UserNew.propTypes = {
  setShowNew: PropTypes.func.isRequired,
};

export default UserNew;
