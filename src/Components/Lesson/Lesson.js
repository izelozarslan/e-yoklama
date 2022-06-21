import React from "react";
import "./Lesson.css";

const Lesson = (props) => {
  const { lesson, students, setLessons, lessons } = props;

  //öğrenciyi derslerden kaldır
  const onClickRemove = (student) => {
    let newLesson = lesson;

    //seçilen öğrencinin id sini kullanarak filtrele ve diğerlerini sil
    newLesson.students = lesson.students.filter((x) => x.id != student.id);

    //tüm öğrencileri güncelle
    const newLessons = lessons.map((x) => {
      if (x.id == newLesson.id) {
        return newLesson;
      }
      return x;
    });

    setLessons(newLessons);
  };

  //öğrenciyi derse ekle
  const onClickAdd = (student) => {
    let newLesson = lesson;
    newLesson.students.push(student);

    const newLessons = lessons.map((x) => {
      if (x.id == newLesson.id) {
        return newLesson;
      }
      return x;
    });

    setLessons(newLessons);
  };

  return (
    <div className="lessonItem">
      <h2>{lesson.name}</h2>
      <h4>
        Teacher: {lesson.teacher.name} {lesson.teacher.surname}
      </h4>
      <h6>{lesson.field.name}</h6>
      <h6>Number: {lesson.teacher.number}</h6>
      <div className="studentList">
        <div>
          <h5>Joined</h5>
          {lesson?.students?.map((x) => (
            <h6
              className="joinedStudents"
              onClick={() => onClickRemove(x)}
              key={x.id + "joined"}
            >
              - {x.number}
            </h6>
          ))}
        </div>
        <div>
          <h5>Others</h5>
          {students
            .filter(
              (item) =>
                !lesson.students.includes(item) && item.field == lesson.field
            )
            .map((x) => (
              <h6
                className="otherStudents"
                onClick={() => onClickAdd(x)}
                key={x.id + "others"}
              >
                + {x.number}
              </h6>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Lesson;
