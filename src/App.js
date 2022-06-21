import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Login from "./Components/Login/Login";
import AdminPage from "./Pages/AdminPage";
import AttendancePage from "./Pages/AttendancePage";
import TeacherPage from "./Pages/TeacherPage";
import { attendancesData, lessonsData, usersData } from "./dummy/data";
import NewUser from "./Components/Users/NewUser";
import UserList from "./Components/Users/UserList";

function App() {
  const [login, setLogin] = useState();

  const [lessons, setLessons] = useState(lessonsData);
  const [attendances, setAttendances] = useState(attendancesData);
  const [users, setUsers] = useState(usersData);

  return (
    <div>
      {!login && <Login setLogin={setLogin} lessons={lessons} users={users} />}
      
      {login?.role == "ADMIN" && (
        <AdminPage
          users={users}
          setUsers={setUsers}
          setLogin={setLogin}
          lessons={lessons}
          setLessons={setLessons}
        />
      )}
      {login?.role == "STUDENT" && (
        <AttendancePage
          attendances={attendances}
          setAttendances={setAttendances}
          login={login}
          setLogin={setLogin}
          lessons={lessons}
        />
      )}
      {login?.role == "TEACHER" && (
        <TeacherPage
          attendances={attendances}
          setAttendances={setAttendances}
          users={users}
          login={login}
          setLogin={setLogin}
          lessons={lessons}
        />
      )}
    </div>
  );
}

export default App;
