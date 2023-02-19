import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  InputGroup,
  FormControl,
  Figure,
} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import ModalPosterButton from './ModalButtonPoster'
import './style.css'
import isLogin from '../../utils/isLogin'
import { Navigate } from 'react-router-dom'
const ExhibitionMakePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [tag1, setTag1] = useState('')
  const [tag2, setTag2] = useState('')
  const [tag3, setTag3] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState(location.state.id)
  const [showingPoster, setShowingPoster] = useState(null)
  const [poster, setPoster] = useState(null)
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (id == null) {
      console.log(1)
    } else {
      axios.defaults.headers.common['Authorization'] =
        window.localStorage.getItem('token')
      axios.get(`/api/user/make-exhibition-step1?id=${id}`).then(res => {
        console.log(res.data)
        setTitle(res.data.title)
        setTag1(res.data.tag1)
        setTag2(res.data.tag2)
        setTag3(res.data.tag3)
        setDescription(res.data.description)
        setShowingPoster(res.data.poster)
        setStep(res.data.step)
      })
    }
  }, [])

  const isWider = src => {
    var img = new Image()
    img.src = src
    return img.width > img.height
  }

  const titleChange = e => {
    setTitle(e.target.value)
  }
  const tag1Change = e => {
    setTag1(e.target.value)
  }
  const tag2Change = e => {
    setTag2(e.target.value)
  }
  const tag3Change = e => {
    setTag3(e.target.value)
  }
  const descriptionChange = e => {
    setDescription(e.target.value)
  }
  const posterChange = (file, url) => {
    setPoster(file)
    setShowingPoster(url)
  }
  const next = () => {
    if (title === '') {
      alert('제목을 입력해주세요!')
    } else if (description === '') {
      alert('본문을 입력해주세요!')
    } else if (tag1 === '' || tag2 === '' || tag3 === '') {
      alert('태그를 입력해주세요')
    } else if (poster === '') {
      alert('포스터를 등록해주세요!')
    }

    const formData = new FormData()
    formData.append('step', step + 1)
    formData.append('title', title)
    formData.append('tag1', tag1)
    formData.append('tag2', tag2)
    formData.append('tag3', tag3)
    formData.append('poster', poster)
    formData.append('description', description)
    if (id === null) {
      console.log('hi')
      axios.defaults.headers.common['Authorization'] =
        window.localStorage.getItem('token')
      axios.post('/api/user/make-exhibition', formData).then(res => {
        console.log(res)
        if (res.data.success) {
          setId(res.data.id)
          navigate(`/make-exhibition-2step`, {
            state: {
              id: res.data.id,
            },
          })
        }
      })
    } else {
      axios.defaults.headers.common['Authorization'] =
        window.localStorage.getItem('token')
      axios
        .post(`/api/user/save-exhibition-step1?id=${id}`, formData)
        .then(res => {
          console.log(res.data)
          if (res.data.success) {
            setId(res.data.id)
          }
        })
      navigate(`/make-exhibition-2step`, {
        state: {
          id: id,
        },
      })
    }
  }

  const save = () => {
    const formData = new FormData()
    formData.append('step', step)
    formData.append('title', title)
    formData.append('tag1', tag1)
    formData.append('tag2', tag2)
    formData.append('tag3', tag3)
    formData.append('poster', poster)
    formData.append('description', description)
    if (id === null) {
      axios.defaults.headers.common['Authorization'] =
        window.localStorage.getItem('token')

      axios.post('/api/user/make-exhibition', formData).then(res => {
        if (res.data.success) {
          setId(res.data.id)
          alert('저장되었습니다')
        }
      })
    } else {
      axios.defaults.headers.common['Authorization'] =
        window.localStorage.getItem('token')
      axios
        .post(`/api/user/save-exhibition-step1?id=${id}`, formData)
        .then(res => {
          if (res.data.success) {
            setId(res.data.id)
            alert('저장되었습니다')
          }
        })
    }
  }

  return (
    <Container className="exhibition_make-container">
      <Container className="inner">
        <Container id="elem1">
          <Col>
            <ListGroup horizontal>
              <ListGroup.Item active>Step1</ListGroup.Item>
              <ListGroup.Item>Step2</ListGroup.Item>
              <ListGroup.Item>Step3</ListGroup.Item>
              <ListGroup.Item>Step4</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <div className="title">시작하기</div>
          </Col>
          <Col></Col>
        </Container>
        <Container id="elem2">
          <Row>
            <InputGroup>
              <FormControl
                onChange={titleChange}
                maxLength={20}
                placeholder="title"
                value={title}
              />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup>
              <FormControl
                onChange={tag1Change}
                maxLength={5}
                placeholder="tag1"
                value={tag1}
              />
              <FormControl
                onChange={tag2Change}
                maxLength={5}
                placeholder="tag2"
                value={tag2}
              />
              <FormControl
                onChange={tag3Change}
                maxLength={5}
                placeholder="tag3"
                value={tag3}
              />
            </InputGroup>
          </Row>
        </Container>
        <Container id="elem3">
          <Col>
            <Figure className="image-container">
              {isWider(showingPoster) ? (
                <Figure.Image className="img1" src={showingPoster} />
              ) : (
                <Figure.Image className="img2" src={showingPoster} />
              )}
            </Figure>
            <ModalPosterButton
              func={posterChange}
              poster={showingPoster}
            ></ModalPosterButton>
          </Col>
          <Col>
            <textarea
              onChange={descriptionChange}
              maxLength={255}
              placeholder="Description"
              value={description}
              style={{ width: '80%', height: '80%' }}
            ></textarea>
          </Col>
        </Container>
        <Container id="elem4">
          <Button onClick={next} style={{ float: 'right' }}>
            Next
          </Button>
          <Button onClick={save} style={{ float: 'right' }}>
            Save
          </Button>
        </Container>
      </Container>
    </Container>
  )
}

export default ExhibitionMakePage
