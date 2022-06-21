import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { fields } from "../../dummy/data";
const NewUser = (props) => {
  const { userFields, setUserFields, close, save } = props;

  const onChangeFunction = (e) => {
    setUserFields((userFields) => {
      return { ...userFields, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="m-5">
      <h1>New Student</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={userFields.name}
                onChange={(e) => onChangeFunction(e)}
                type="text"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                value={userFields.surname}
                name="surname"
                onChange={(e) => onChangeFunction(e)}
                type="text"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Number</Form.Label>
          <Form.Control
            value={userFields.number}
            onChange={(e) => onChangeFunction(e)}
            name="number"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Field of Study</Form.Label>
          <Form.Select
            name="field"
            onChange={(e) => onChangeFunction(e)}
            value={userFields.field}
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={userFields.password}
            name="password"
            type="text"
            onChange={(e) => onChangeFunction(e)}
          />
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

export default NewUser;
