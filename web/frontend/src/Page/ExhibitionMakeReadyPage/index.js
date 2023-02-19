import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import isLogin from '../../utils/isLogin'
import { Navigate } from 'react-router-dom'
import './style.css'

const ExhibitionMakeReadyPage = () => {
  const navigate = useNavigate()

  const makeNew = () => {
    navigate(`/make-exhibition-start`, {
      state: {
        id: null,
      },
    })
  }
  if (!isLogin()) {
    alert('로그인이 필요합니다')
    return (
      <Navigate
        to={{
          pathname: '/sign-in',
          state: {
            from: '/',
          },
        }}
      />
    )
  }
  return (
    <Container className="exhibition_ready-container">
      <Container className="inner">
        <Button onClick={makeNew}>새로 만들기</Button>

        <Button href="/saved-exhibition">불러오기</Button>
      </Container>
    </Container>
  )
}

export default ExhibitionMakeReadyPage
