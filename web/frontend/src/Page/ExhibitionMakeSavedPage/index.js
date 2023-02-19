import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import Post from './Post'
import { useEffect } from 'react'
import axios from 'axios'
import './style.css'
import isLogin from '../../utils/isLogin'
import { Navigate } from 'react-router-dom'
const ExhibitionMakeSavedPage = () => {
  const [onlineExhibition, setOnlineExhibition] = useState([])
  const [change, setChange] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common['Authorization'] =
        window.localStorage.getItem('token')
      const res = await axios.get('/api/user/get-saved-exhibition')
      setOnlineExhibition(res.data)
      const _change = !change
      setChange(_change)
    }

    fetchData()
  }, [])
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
    <Container className="saved-container">
      <Container className="inner">
        <Post posts={onlineExhibition}></Post>
      </Container>
    </Container>
  )
}

export default ExhibitionMakeSavedPage
