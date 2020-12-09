import React from "react";
import UsersListItem from "./usersListItem/UsersListItem";

const UsersList = ({ usersList, deleteUser }) => {
  return (
    <ul>
      {usersList.map((user) => (
        <UsersListItem {...user} key={user.id} deleteUser={deleteUser} />
      ))}
    </ul>
  );
};

export default UsersList;
