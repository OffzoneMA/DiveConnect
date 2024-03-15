import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import UserCard from './UserCard';
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

const UserList = ({ users }) => {
  const classes = useStyles();

  return (
    <CustomLayout>
      <h1>Users</h1>
      <div className={classes.root}>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </CustomLayout>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default UserList;
