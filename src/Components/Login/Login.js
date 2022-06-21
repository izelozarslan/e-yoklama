import React, { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";

import "./Login.css";

const Login = (props) => {
  const { setLogin, users, lessons } = props;

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const loginClick = () => {
    if (number != "" && password != "") {
      // kullanıcı var mı yok mu kontrol et
      const user = users.find(
        (i) => i.number == number && i.password == password
      );

      if (user != undefined) {
        //eğer öğretmen ise ve herhangi bir derse sahip ise veye öğretmen değilse login state ini giriş yapan kişiye ata
        if (
          (user.role == "TEACHER" && checkTeacher(user) == true) ||
          user.role != "TEACHER"
        ) {
          setPassword("");
          setNumber("");
          setLogin(user);
        } else {
          alert("Not authorized!");
        }
      } else {
        alert("user not found!");
      }
    } else {
      alert("Fill the blanks!");
    }
  };

  // giriş yapan öğretmen bir derse sahip mi diye kontrol et
  const checkTeacher = (user) => {
    let hasLesson = false;

    lessons.forEach((x) => {
      if (x.teacher.id == user.id) {
        hasLesson = true;
      }
    });
    return hasLesson;
  };

  return (
    <div className="login">
      <Image src={"https://www.trakya.edu.tr/images/logo.png"} />
      <br/>
      <h2>E Yoklama</h2>
      <Form.Group className="login-input">
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter number"
        />
      </Form.Group>

      <Form.Group className="login-input">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>

      <br />
      <Button onClick={loginClick} variant="success">
        Login
      </Button>
    </div>
  );
};

export default Login;
