import axios from 'axios'
import React, { useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { setCookie } from '../../utils/cookies'
import './style.css'
const LoginPage = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const login = () => {
    var body = {
      username: username,
      password: password,
    }
    axios
      .post('/api/sign-in', body)
      .then(res => {
        if (res.data.success) {
          window.localStorage.setItem('isLogin', 'true')
          window.localStorage.setItem(
            'token',
            `Bearer ${res.headers.auth_token}`
          )
          window.localStorage.setItem('username', res.data.user.username)
          setCookie(`Bearer ${res.headers.auth_token}`)
          navigate('/')
        } else {
          alert(res.data.message)
        }
      })
      .catch(error => console.log(error))
  }
  const usernameChange = e => {
    setUsername(e.target.value)
  }
  const passwordChange = e => {
    setPassword(e.target.value)
  }
  const autoPress = e => {
    if (!buttonCondition) {
      if (e.key === 'Enter') {
        login()
      }
    }
  }
  // console.log(username === "" || password === "" ? "isempty" : "notempty")
  const buttonCondition = username === '' || password === '' ? true : false
  return (
    <Container className="LoginContainer">
      <Form.Label>Sign-In</Form.Label>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            onKeyPress={autoPress}
            onChange={usernameChange}
            placeholder="Email Address"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={passwordChange}
            onKeyPress={autoPress}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
      </Form>
      <Button variant="success" onClick={login} disabled={buttonCondition}>
        Sign In
      </Button>
      <Link to="/sign-up">아직 계정이 없으신가요?</Link>
    </Container>
  )
}

export default LoginPage
