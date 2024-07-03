import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import UserCard from "../../components/user/UserCard";
import CustomLayout from "../../components/common/Layout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const UserList = () => {
  const classes = useStyles();
  const users = [];

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

export default UserList;
