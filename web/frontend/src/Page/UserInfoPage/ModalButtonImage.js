import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal, Figure, Form, Container } from 'react-bootstrap'
import { button_theme_mid, button_theme_long } from '../../Style/theme'
import { header } from '../../config'
import './style.css'

const ModalButtonImage = props => {
  const [show, setShow] = useState(false)
  const [curImage, setcurImage] = useState(props.profile)
  const [uploadFile, setuploadFile] = useState()
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setcurImage(props.profile)
    setShow(true)
  }
  const saveFileImage = e => {
    setcurImage(URL.createObjectURL(e.target.files[0]))
    console.log(URL.createObjectURL(e.target.files[0]))
    console.log(e.target.files[0])
    setuploadFile(e.target.files[0])
  }

  const submit = () => {
    const formData = new FormData()
    formData.append('profile', uploadFile)
    axios.post('/api/user/change-profile', formData, header).then(res => {
      if (res.data.success) {
        props.func(res.data.url)
        handleClose()
      } else {
        alert('실패하였습니다!!')
      }
    })
  }
  return (
    <>
      <Button style={button_theme_long} onClick={handleShow}>
        Change Profile Image
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>프로필 이미지 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ margin: 'Auto' }}>
          <Container>
            <Figure className="image-container">
              <Figure.Image
                className="img"
                src={curImage ? curImage : './profile.png'}
              />
            </Figure>
          </Container>
          <Form.Control type="file" accept="image/*" onChange={saveFileImage} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submit} style={button_theme_mid}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalButtonImage
