import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { fields, newUser } from "../../dummy/data";
import NewUser from "./NewUser";
import User from "./User";

import "./User.css";

const UserList = (props) => {
  const { users, setUsers, students, lessons, setLessons } = props;

  const [userFields, setUserFields] = useState({
    id: Math.random(),
    name: "",
    surname: "",
    number: "",
    password: "",
    role: "STUDENT",
    field: undefined,
  });

  const [createNew, setCreateNew] = useState(false);

  const createUser = () => {
    if (
      userFields.name != "" &&
      userFields.surname != "" &&
      userFields.number != "" &&
      userFields.field != undefined &&
      userFields.field != ""
    ) {
      let newUser = { ...userFields };
      const field = fields.find((x) => x.id == userFields.field);
      console.log("field:", field);
      newUser.field = field;
      const newUsers = [...users, newUser];

      setUsers(newUsers);
      createUserClose();
    } else {
      alert("fill the blanks");
    }
  };

  // alanları sıfırla
  const createUserClose = () => {
    setCreateNew(false);
    setUserFields({
      id: Math.random(),
      name: "",
      surname: "",
      number: "",
      password: "",
      role: "STUDENT",
      field: undefined,
    });
  };

  const onDeleteClick = (user) => {
    //öğrenciyi sildik
    const newUsers = users.filter((x) => x.id != user.id);
    setUsers(newUsers);

    console.log(user.name, newUsers);

    //öğrenciyi derslerden çıkart
    let tmpLessons = lessons.map((x) => {
      x.students = x.students.filter((y) => y.id != user.id);
      return x;
    });

    setLessons(tmpLessons);
  };

  return (
    <div className="users">
      <h1>User List</h1>
      {createNew ? (
        <NewUser
          userFields={userFields}
          setUserFields={setUserFields}
          save={createUser}
          close={createUserClose}
        />
      ) : (
        <Button
          variant="primary"
          className="m-3"
          onClick={() => setCreateNew(true)}
        >
          Create New User
        </Button>
      )}
<div className="userlist">
   {students.map((x) => (
        <User key={x.id} user={x} onDeleteClick={() => onDeleteClick(x)} />
      ))}
</div>
     
    </div>
  );
};

export default UserList;
