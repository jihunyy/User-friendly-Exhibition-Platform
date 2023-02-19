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
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import ExhibitionPosting from '../../Component/ExhibitionPosting'
import PostList from './PostList'
import './style.css'
import { DragDropContext } from 'react-beautiful-dnd'
import isLogin from '../../utils/isLogin'
import { Navigate } from 'react-router-dom'

const ExhibitionMake2stepPage = ({ id }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [ID, setID] = useState(location.state.id)
  //console.log(ID)

  const [postList, setPostList] = useState([])

  const [IDList, setIDList] = useState([])
  const [fileList, setFileList] = useState([])
  const [descriptionList, setDescriptionList] = useState([])
  const [deleteList, setDeleteList] = useState([])

  const formData = new FormData()
  formData.append('id', 0)
  formData.append('link', './logo192.png')
  formData.append('description', '')
  formData.append('contentType', '0')

  const getPostList = (newPostList, list1, list2, list3) => {
    setPostList(newPostList)
    setIDList(list1)
    setFileList(list2)
    setDescriptionList(list3)
  }
  const getDeletePostList = deleteList => {
    setDeleteList(deleteList)
  }
  const save = () => {
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')

    var formData = new FormData()

    for (let i = 0; i < fileList.length; i++) {
      if (typeof fileList[i] === 'object') {
        //formData.append('IDList', IDList[i])
        console.log(i)
        formData.append('fileList', fileList[i])
        formData.append('imageChangeList', IDList[i])
        //formData.append('descriptionList', descriptionList[i])
      }

      formData.append('IDList', IDList[i])
      formData.append('descriptionList', descriptionList[i])
    }
    formData.append('ID', ID)
    formData.append('step', 2)
    axios.post('/api/user/make-exhibition-step2/file', formData).then(res => {
      console.log(res)
    })
  }

  const next = () => {
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')

    var formData = new FormData()

    for (let i = 0; i < fileList.length; i++) {
      if (typeof fileList[i] === 'object') {
        //formData.append('IDList', IDList[i])
        console.log(i)
        formData.append('fileList', fileList[i])
        formData.append('imageChangeList', IDList[i])
        //formData.append('descriptionList', descriptionList[i])
      }

      formData.append('IDList', IDList[i])
      formData.append('descriptionList', descriptionList[i])
    }
    formData.append('ID', ID)
    formData.append('step', 3)
    axios.post('/api/user/make-exhibition-step2/file', formData).then(res => {
      console.log(res)
      const body = {
        deleteList: deleteList,
        onlineExhibitionId: res.data.id,
      }
      axios
        .post('api/user/make-exhibition-step2/delete-contents', body)
        .then(res => {
          console.log(res)
        })
    })

    navigate(`/make-exhibition-bgm`, {
      state: {
        id: ID,
      },
    })
  }

  const previous = () => {
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')

    navigate('/make-exhibition-start', { state: { id: ID } })
    axios.post(`/api/user/step-change?=${ID}`, { step: 1 }).then(res => {})
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
    <Container className="exhibition_make-container2">
      <Container className="inner">
        <Container id="elem1">
          <Col>
            <ListGroup horizontal>
              <ListGroup.Item>Step1</ListGroup.Item>
              <ListGroup.Item active>Step2</ListGroup.Item>
              <ListGroup.Item>Step3</ListGroup.Item>
              <ListGroup.Item>Step4</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <div className="title">게시물 올리기</div>
          </Col>
          <Col></Col>
        </Container>

        <Container id="elem3">
          <ExhibitionPosting
            postList={postList}
            func={getPostList}
            delete_func={getDeletePostList}
            id={ID}
          ></ExhibitionPosting>
        </Container>
        <Container id="elem4">
          <Button onClick={previous} style={{ float: 'left' }}>
            Previous
          </Button>

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

export default ExhibitionMake2stepPage
