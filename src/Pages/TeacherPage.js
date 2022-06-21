import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  ListGroup,
  ListGroupItem,
  Table,
} from "react-bootstrap";
import { toDateInputValue } from "../utils/dateConverter";
import { generateRandomString } from "../utils/generateRandomString";

const TeacherPage = (props) => {
  const { login, users, setLogin, lessons, attendances, setAttendances } =
    props;

  const [attendance, setAttendance] = useState();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const getAttendance = () => {
    //  const today = new Date().toLocaleDateString();
    const date = new Date(selectedDate).toLocaleDateString();
    return attendances.find(
      (x) => x.date.toLocaleDateString() == date && x.teacher == login
    );
  };

  //Öğretmen giriş yaptığında eğer o gün için ders yoklaması alınmamış ise otomatik oluştur
  useEffect(() => {
    const attendance = getAttendance();
    if (attendance != undefined) {
      setAttendance(attendance);
    } else if (
      new Date(selectedDate).toLocaleDateString() ==
      new Date().toLocaleDateString()
    ) {
      const teacher = login;
      const lesson = lessons.find((x) => x.teacher.id == login.id);
      console.log("lesson", lesson);

      const newAttendance = {
        id: Math.random(),
        lessonCode: generateRandomString(),
        date: new Date(),
        lesson: lesson,
        teacher: teacher,
        presentStudents: [],
      };

      setAttendance(newAttendance);

      const newAttendances = [...attendances, newAttendance];
      console.log("newAttendances", newAttendances);
      setAttendances(newAttendances);
    } else {
      setAttendance(undefined);
    }
  }, [selectedDate]);

  const exitClick = () => {
    setLogin(undefined);
  };

  return (
    <div>
      <h1>
        TeacherPage - {attendance?.teacher.name} {attendance?.teacher.surname}
      </h1>
      <Button onClick={exitClick} className="m-3">
        Logout
      </Button>

      <Form.Group className="m-3">
        <Form.Label>Lesson Date</Form.Label>
        <Form.Control
          name="date"
          value={toDateInputValue(selectedDate)}
          onChange={(e) => setSelectedDate(e.target.value)}
          type="date"
        />
      </Form.Group>

      {attendance ? (
        <Card className="m-3">
          <Card.Body>
            <Card.Title>
              {attendance.lessonCode} - {attendance.lesson.field.name}
            </Card.Title>
            <Card.Text>{attendance.lesson.name}</Card.Text>
            <Card.Text>{attendance.date.toLocaleDateString()}</Card.Text>
            <hr />
            <Card.Text>
              Present Students ({attendance.presentStudents.length}):{" "}
            </Card.Text>
            <ListGroup>
              <Table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Number</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.presentStudents.map((x) => (
                    <tr key={x.id}>
                      <td>{x.number}</td>
                      <td>{x.name}</td>
                      <td>{x.surname}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        <h4 style={{ color: "red" }}>Attendance Not Found!</h4>
      )}
    </div>
  );
};

export default TeacherPage;
