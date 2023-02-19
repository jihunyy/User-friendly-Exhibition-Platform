import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Container, Figure, Form } from 'react-bootstrap'
import { button_theme_long } from '../../Style/theme'

const ModalButtonPosting = props => {
  const [show, setShow] = useState(false)
  const [curImage, setcurImage] = useState(props.poster)
  const [uploadFile, setuploadFile] = useState()
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setcurImage(props.poster)
    setShow(true)
  }

  const saveFileImage = e => {
    setcurImage(URL.createObjectURL(e.target.files[0]))
    setuploadFile(e.target.files[0])
  }

  const submit = () => {
    props.func(uploadFile, curImage)
    handleClose()
  }

  return (
    <>
      <Button style={button_theme_long} onClick={handleShow}>
        Post upload
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>게시물 업로드</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ margin: 'Auto' }}>
          <Container>
            <Figure className="image-container">
              <Figure.Image
                className="img"
                src={curImage ? curImage : './no_image.png'}
              />
            </Figure>
          </Container>
          <Form.Control type="file" accept="image/*" onChange={saveFileImage} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={submit}
            style={{ backgroundColor: '#daa520', borderColor: '#daa520' }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalButtonPosting
