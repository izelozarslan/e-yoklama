import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AttendancePage = (props) => {
  const { setLogin, login, attendances, setAttendances, lessons } = props;

  const [lessonCode, setLessonCode] = useState("");

  const exitClick = () => {
    setLogin(undefined);
  };

  //derse katılım yap
  const join = () => {
    const attendance = attendances.find((x) => x.lessonCode == lessonCode);
    //eger dersi bulduysan ve tarihi bugune esit ise
    if (
      attendance != undefined &&
      attendance.date.toLocaleDateString() == new Date().toLocaleDateString()
    ) {
      if (userHasLesson(attendance) == true) {
        if (!attendance.presentStudents.includes(login)) {
          attendance.presentStudents.push(login);
          //guncelle
          const newAttendances = attendances.map((x) => {
            if (x.id == attendance.id) {
              return attendance;
            }
            return x;
          });
          setAttendances(newAttendances);
          exitClick();

          alert("You've successfully joined to lesson");
        } else {
          alert("You've already joined to lesson!");
        }
      } else {
        alert(
          "Contact with admin for joining to " +
            attendance.lesson.name +
            " class"
        );
      }
    } else {
      alert("lesson not found!");
    }
  };

  //Öğrenci o dersi alıyor mu diye kontrol et
  const userHasLesson = (attendance) => {
    const tmpLesson = lessons.find((x) => x.id == attendance.lesson.id);
    if (tmpLesson.students.includes(login)) {
      return true;
    }
    return false;
  };

  return (
    <div className="m-3">
      <Button className="mb-3" onClick={exitClick}>
        Logout
      </Button>
      <h1>
        {login.number} - {login.name} {login.surname}
      </h1>
      <Form.Group>
        <Form.Label>Lesson Code</Form.Label>
        <Form.Control
          value={lessonCode}
          name="lessonCode"
          onChange={(e) => setLessonCode(e.target.value)}
          type="text"
        />
      </Form.Group>
      <Button className="mt-3" variant="success" onClick={join}>
        Join
      </Button>
    </div>
  );
};

export default AttendancePage;
