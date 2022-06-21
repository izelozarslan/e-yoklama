import React from "react";
import { Button } from "react-bootstrap";
import LessonList from "../Components/Lesson/LessonList";
import UserList from "../Components/Users/UserList";

const AdminPage = (props) => {
  const { setLogin, users, setUsers, setLessons, lessons } = props;


  const exitClick = () => {
    setLogin(undefined);
  };

  return (
    <div className="m-5">
      <h1> AdminPage </h1>
      <Button onClick={exitClick}>Logout</Button>
      
      <LessonList
        users={users}
        lessons={lessons}
        setLessons={setLessons}
        students={users.filter((x) => x.role == "STUDENT")}
      />

      <UserList
        lessons={lessons}
        setLessons={setLessons}
        users={users}
        students={users.filter((x) => x.role == "STUDENT")}
        setUsers={setUsers}
      />
    </div>
  );
};

export default AdminPage;
