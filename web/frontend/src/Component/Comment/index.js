import axios from 'axios'
import React from 'react'
import { Container, Row, Col, Figure, CloseButton } from 'react-bootstrap'
import './style.css'
const Comment = ({ comment, deleteFunc }) => {
  const isMyComment = comment.username === localStorage.getItem('username')

  const deleteComment = () => {
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')
    axios.delete(`/api/user/delete-comment/${comment.id}`).then(res => {
      console.log(res.data)
      if (res.data) {
        deleteFunc(comment)
      }
    })
    deleteFunc(comment)
  }
  // #daa520 #f3ca4d
  return (
    <Container
      style={{
        width: '80%',
        marginTop: '0px',
        marginBottom: '0px',
        borderBottom: '3px #daa520 solid',
        borderRadius: '0px',
        padding: '5px',
      }}
    >
      <Row>
        <Col style={{ display: 'flex' }}>
          <Col xs={1} style={{ marginLeft: '10px', marginRight: '10px' }}>
            <Row>
              <Container
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Figure className="comment-img-container">
                  <Figure.Image className="img" src={comment.profile} />
                </Figure>
              </Container>
            </Row>
          </Col>
          <Col xs={10} style={{ textAlign: 'left', marginLeft: '10px' }}>
            <Container>
              <Row style={{ fontStyle: 'oblique', fontWeight: 'bold' }}>
                {comment.nickname}
              </Row>
              <Row>{comment.description}</Row>
            </Container>
          </Col>
          <Container>
            {isMyComment ? <CloseButton onClick={deleteComment} /> : <></>}
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default Comment
