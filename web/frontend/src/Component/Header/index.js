import { Button, Row, Col, Container } from 'react-bootstrap'
import React from 'react'
import { removeToken } from '../../utils/cookies'
import isLogin from '../../utils/isLogin'
import { useNavigate } from 'react-router-dom'
import { header_theme, button_theme } from '../../Style/theme'
import './style.css'
const Header = () => {
  const navigate = useNavigate()
  const logout = () => {
    window.localStorage.setItem('isLogin', false)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    removeToken()
    navigate('/')
  }

  const goToMain = () => {
    navigate('/')
  }

  return (
    <div style={header_theme}>
      <Row>
        <Col />
        <Col>
          <Container onClick={goToMain} className="header-font">
            Atelier
          </Container>
        </Col>
        <Col>
          <div style={{ display: 'inline-block', float: 'right' }}>
            {isLogin() ? (
              <>
                <Button href="/user-info" variant="lg" style={button_theme}>
                  User Info
                </Button>
                <Button onClick={logout} variant="lg" style={button_theme}>
                  logout
                </Button>
              </>
            ) : (
              <>
                <Button href="/sign-up" variant="lg" style={button_theme}>
                  Sign-up
                </Button>
                <Button href="/sign-in" variant="lg" style={button_theme}>
                  Sign-in
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Header
