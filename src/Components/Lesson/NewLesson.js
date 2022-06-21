import React from "react";
import { Button, Form } from "react-bootstrap";
import { fields } from "../../dummy/data";
import "./Lesson.css";
const NewLesson = (props) => {
  const { lessonFields, setLessonFields, close, save, availableTeachers } =
    props;

  const onChangeFunction = (e) => {
    setLessonFields((lessonFields) => {
      return { ...lessonFields, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="m-5">
      <h1>New Lesson</h1>
      <Form>
        <Form.Group>
          <Form.Label>Lesson Name</Form.Label>
          <Form.Control
            name="name"
            value={lessonFields.name}
            onChange={(e) => onChangeFunction(e)}
            type="text"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Field of Study</Form.Label>
          <Form.Select
            name="field"
            onChange={(e) => onChangeFunction(e)}
            value={lessonFields.field}
          >
            <option value="">Field</option>

            {fields.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Teacher</Form.Label>
          <Form.Select
            name="teacher"
            onChange={(e) => onChangeFunction(e)}
            value={lessonFields.teacher}
          >
            <option value="">Teacher</option>

            {availableTeachers.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name} - {x.surname}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="danger" className="m-3" onClick={close}>
          Cancel
        </Button>

        <Button variant="primary" className="m-3" onClick={save}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default NewLesson;
