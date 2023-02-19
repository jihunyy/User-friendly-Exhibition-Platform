import React from 'react'
import { Container, Figure, Row, Col, FormLabel, Badge } from 'react-bootstrap'
import './style.css'
import { useNavigate, Link } from 'react-router-dom'
import { testColor } from '../../Style/theme'
import axios from 'axios'
import './style.css'

const OfflineExhibition = ({ id, title, poaster, description }) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/offline-exhibition/${id}`) // { state: title }
  }
  return (
    <Container className="offline-exhibition-container" onClick={onClick}>
      <Row>
        <Col className="row1-col2" xs={4}>
          <Figure className="img-container1">
            <Figure.Image className="img" src={poaster} />
          </Figure>
        </Col>
        <Col className="row1-col2" xs={8}>
          <Container className="title-label-container">{title}</Container>

          <Container className="description-label-container">
            <FormLabel
              style={{
                fontSize: '20px',
                color: 'black',
                float: 'left',
                textAlign: 'justify',
              }}
            >
              {description.length > 200
                ? description.slice(0, 200) + '...'
                : description}
            </FormLabel>
          </Container>

          <Container>
            <FormLabel
              style={{
                fontSize: '30px',
                color: 'pink',
                float: 'left',
                fontWeight: 'bold',
              }}
            ></FormLabel>
            <FormLabel
              style={{ fontSize: '30px', color: 'black', float: 'right' }}
            ></FormLabel>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default OfflineExhibition
