import React from "react";
import { Button, Card } from "react-bootstrap";

import "./User.css";

const User = (props) => {
  const { user, onDeleteClick } = props;

  return (
    <div className="useritem">
      <div className="userHeader">
        <span>
          {user.name} {user.surname}
        </span>
        <Button variant="danger" onClick={onDeleteClick}>
          X
        </Button>
      </div>
      <span>{user.number}</span>
      <span>{user.field.name}</span>
      <span>{user.password}</span>
    </div>
  );
};

export default User;
