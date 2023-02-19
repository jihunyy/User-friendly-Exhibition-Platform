import { Row, Col, Nav, Navbar } from 'react-bootstrap'
import React from 'react'
import './style.css'
const Navigation = () => {
  return (
    <Row className="nav-container">
      <Navbar
        style={{
          placeContent: 'center',
          // backgroundColor: '#F3CA4D',
          padding: '0px',
          backgroundColor: 'transparent',
        }}
      >
        <Col className="nav-element">
          <Nav>
            <Nav.Link style={{ color: '#f3ca4d' }} href="/community-home">
              Online Exhibition
            </Nav.Link>
          </Nav>
        </Col>
        <Col className="nav-element">
          <Nav>
            <Nav.Link
              style={{ color: '#f3ca4d' }}
              href="/offline-community-home"
            >
              Offline Exhibition
            </Nav.Link>
          </Nav>
        </Col>
        <Col className="nav-element">
          <Nav>
            <Nav.Link
              style={{ color: '#f3ca4d' }}
              href="/make-exhibition-ready"
            >
              Make Exhibition
            </Nav.Link>
          </Nav>
        </Col>
      </Navbar>
    </Row>
  )
}

export default Navigation
