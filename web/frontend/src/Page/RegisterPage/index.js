import axios from 'axios'
import React, { useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

import './style.css'
const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const navigate = useNavigate()
  const register = () => {
    var body = {
      username: username,
      nickname: nickname,
      password1: password1,
      password2: password2,
    }
    axios
      .post('/api/sign-up', body)

      .then(res => {
        if (res.data.success) {
          navigate('/email-send')
        } else {
          alert(res.data.message)
        }
      })
  }
  const usernameChange = e => {
    setUsername(e.target.value)
  }

  const nicknameChange = e => {
    setNickname(e.target.value)
  }

  const passwordChange1 = e => {
    setPassword1(e.target.value)
  }
  const passwordChange2 = e => {
    setPassword2(e.target.value)
  }

  const autoPress = e => {
    if (!buttonCondition) {
      if (e.key === 'Enter') {
        register()
      }
    }
  }

  const buttonCondition =
    username === '' || nickname === '' || password1 === '' || password2 === ''
      ? true
      : false

  return (
    <Container className="RegisterContainer">
      <Form.Label>Sign-up</Form.Label>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            onKeyPress={autoPress}
            onChange={usernameChange}
            placeholder="Email Address"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            type="text"
            onKeyPress={autoPress}
            onChange={nicknameChange}
            placeholder="Nick Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Control
            onChange={passwordChange1}
            onKeyPress={autoPress}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Control
            onChange={passwordChange2}
            onKeyPress={autoPress}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
      </Form>
      <Button onClick={register} disabled={buttonCondition}>
        Sign Up
      </Button>
      <Link to="/sign-in">이미 계정이 있으신가요?</Link>
    </Container>
  )
}

export default LoginPage
