import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { fields } from "../../dummy/data";
import Lesson from "./Lesson";
import "./Lesson.css";
import NewLesson from "./NewLesson";
const LessonList = (props) => {
  const { lessons, setLessons, users, setUsers, students } = props;

  const [createNew, setCreateNew] = useState(false);

  const [lessonFields, setLessonFields] = useState({
    id: Math.random(),
    name: "",
    field: undefined,
    teacher: undefined,
    students: [],
  });

  //olusturmadan once alanları kotrol et
  const createLesson = () => {
    if (
      lessonFields.name != "" &&
      lessonFields.number != "" &&
      lessonFields.field != undefined &&
      lessonFields.field != "" &&
      lessonFields.teacher != undefined &&
      lessonFields.teacher != ""
    ) {
      let newLesson = { ...lessonFields };

      const field = fields.find((x) => x.id == lessonFields.field);
      const teacher = users.find((x) => x.id == lessonFields.teacher);

      newLesson.field = field;
      newLesson.teacher = teacher;

      const newLessons = [...lessons, newLesson];
      setLessons(newLessons);

      createLessonClose();
    } else {
      alert("fill the blanks");
    }
  };


  // ekleme formunu kapat ve verileri sıfırla
  const createLessonClose = () => {
    setCreateNew(false);
    setLessonFields({
      id: Math.random(),
      name: "",
      field: undefined,
      teacher: undefined,
      students: [],
    });
  };

  //bir oğretmen bir derse sahip olabilir
  const getAvailableTeachers = () => {
    const busyTeachers = getBusyTeachers();
    let teacherList = users.filter((x) => x.role == "TEACHER");

    teacherList = teacherList.filter((x) => !busyTeachers.includes(x));
    return teacherList;
  };

  //derslerin icindeki ogretmenleri al, bu ogretmenler tekrar kullanIlamaz
  const getBusyTeachers = () => {
    return lessons.map((x) => x.teacher);
  };

  return (
    <div className="lessons">
      <h1>LessonList</h1>
      {createNew ? (
        <NewLesson
          users={users}
          lessonFields={lessonFields}
          setLessonFields={setLessonFields}
          save={createLesson}
          close={createLessonClose}
          availableTeachers={getAvailableTeachers()}
        />
      ) : (
        <Button
          variant="primary"
          className="m-3"
          onClick={() => setCreateNew(true)}
        >
          Create New Lesson
        </Button>
      )}

      <div className="lesson_list">
      {lessons.map((x) => (
        <Lesson
          key={x.id + "lesson"}
          lesson={x}
          setLessons={setLessons}
          lessons={lessons}
          students={students}
        />
      ))}
      </div>
    </div>
  );
};

export default LessonList;
