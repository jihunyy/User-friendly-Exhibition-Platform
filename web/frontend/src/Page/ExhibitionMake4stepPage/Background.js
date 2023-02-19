import React, { useState } from 'react'

import { Container, Figure, Image, Modal } from 'react-bootstrap'
import ExhibitionPost from '../../Component/ExhibitionPost'
import background1 from '../../images/exhibitionBackground/background1.jpg'
import background2 from '../../images/exhibitionBackground/background2.jpg'
import background3 from '../../images/exhibitionBackground/background3.jpg'
import background4 from '../../images/exhibitionBackground/background4.jpg'

const Background = ({ backgroundSrc, classNameParm, content }) => {
  const imgSrc = content ? content.link : './example.jpg'
  const [modal, setModal] = useState(false)
  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }
  const getStatus = openState => {
    closeModal()
  }
  const test = () => {
    if (content) {
      openModal()
    }
  }
  return (
    <>

      <Container
        style={{
          backgroundImage: `url(${backgroundSrc})`,
        }}
        className="preview"
      >
        <Container onClick={test} className={classNameParm}>
          <Image className="background-img" src={imgSrc}></Image>
        </Container>
      </Container>
      {content ? <Modal show={modal} onHide={closeModal} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Image src={imgSrc} style={{ width: '100%' }}></Image>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'left' }}>
          {content.description}
        </Modal.Footer>
      </Modal> : <></>}
    </>
  )
}

export default Background
