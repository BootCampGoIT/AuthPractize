import React from "react";
const UsersListItem = ({ id, email, localId, deleteUser }) => {
  return (
    <li>
      <h3>{email}</h3>
      <span>{localId}</span>
      <button id={id} type='button' onClick={deleteUser}>
        Delete
      </button>
    </li>
  );
};

export default UsersListItem;
