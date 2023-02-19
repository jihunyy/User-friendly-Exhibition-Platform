import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { button_theme_mid, button_theme_small_right } from '../../Style/theme'
import { useNavigate } from 'react-router-dom'
import { header } from '../../config'

const ModalButton = props => {
  const [show, setShow] = useState(false)
  const [curNick, setCurNick] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const navigate = useNavigate()

  const nicknameChange = e => {
    setCurNick(e.target.value.trim())
  }

  const submitNickname = () => {
    const body = {
      nickname: curNick,
    }

    axios.post('/api/user/user-info', body, header).then(res => {
      console.log(res.data)
      if (res.data.success) {
        props.func(curNick)
        handleClose()
      } else {
        alert('이미 존재하는 닉네임 입니다')
      }
    })
  }

  const buttonCondition = curNick.trim() === '' ? true : false

  return (
    <>
      <Button style={button_theme_small_right} onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>닉네임 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            onChange={nicknameChange}
            placeholder="새로운 닉네임을 입력하세요"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={button_theme_mid}
            onClick={submitNickname}
            disabled={buttonCondition}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalButton
