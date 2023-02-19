import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import isLogin from '../../utils/isLogin'
import { header } from '../../config'
import Exhibition from '../../Component/Exhibition'
import {
  Col,
  Container,
  Figure,
  Row,
  Carousel,
  FormLabel,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import './style.css'
import ModalButton from './ModalButton'
import ModalButtonImage from './ModalButtonImage'
const UserInfoPage = () => {
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [profile, setProfile] = useState(null)
  const [onlineExhibition, setOnlineExhibition] = useState([])
  useEffect(() => {
    if (isLogin()) {
      //로컬 storage를 이용한 방법
      axios.defaults.headers.common['Authorization'] =
        window.localStorage.getItem('token')
      axios.get('/api/user/user-info').then(res => {
        setUsername(res.data.username)
        setNickname(res.data.nickname)
        setProfile(res.data.profile)
        console.log(res.data.id)
        setOnlineExhibition(res.data.onlineExhibition)
      })
    }
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
  const changeNickname = newNickname => {
    setNickname(newNickname)
  }
  const changeProfile = newProfile => {
    setProfile(newProfile)
  }

  return (
    <Container className="mt-5 UserInfo">
      <div style={{ fontSize: '50px', color: '#F3CA4D' }}>User Info</div>
      <Container className="inner1">
        <Row className="row">
          <Col className="col1">
            <Figure className="image-container">
              <Figure.Image
                className="img"
                src={profile ? profile : './profile.png'}
              />
            </Figure>
            <ModalButtonImage
              profile={profile}
              func={changeProfile}
            ></ModalButtonImage>
          </Col>
          <Col className="my-3 col2">
            <FormLabel
              className="mt-2"
              style={{ fontSize: '30px', color: '#F3CA4D' }}
            >
              email
            </FormLabel>
            <InputGroup size="lg" className="mb-5 mt-2">
              <FormControl
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                placeholder={username}
                disabled={true}
              />
            </InputGroup>
            <FormLabel
              className="mt-2"
              style={{ fontSize: '30px', color: '#F3CA4D' }}
            >
              nickname
            </FormLabel>
            <InputGroup size="lg" className="mb-1 mt-2">
              <FormControl
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                placeholder={nickname}
                disabled={true}
              />
            </InputGroup>
            <div>
              <ModalButton func={changeNickname}></ModalButton>
            </div>
          </Col>
        </Row>
        <div style={{ fontSize: '50px', opacity: '1', color: '#F3CA4D' }}>
          My Gallery
        </div>
      </Container>
      <Container className="inner2">
        <Carousel>
          {onlineExhibition.map(data => (
            <Carousel.Item>
              <Exhibition
                id={data.id}
                title={data.title}
                date={data.startDate}
                keyword={[data.tag1, data.tag2, data.tag3]}
                poaster={data.poster}
                author={nickname}
                likes={data.like_count}
                description={data.description}
              ></Exhibition>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </Container>
  )
}

export default UserInfoPage
