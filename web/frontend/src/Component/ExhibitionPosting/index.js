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
  Collapse,
} from 'react-bootstrap'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { button_theme_mid, button_theme_small_right } from '../../Style/theme'

import './style.css'
import ModalButtonPosting from './ModalButtonPosting'
import Post from './Post'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const ExhibitionPosting = ({ postList, func, id, delete_func }) => {
  const [post, setPost] = useState(null)
  const [newPostList, setPostList] = useState(postList)
  const [description, setDescription] = useState()
  const [tempList, setTempList] = useState([])
  //console.log(newPostList)
  const [IDList, setIDList] = useState([])
  const [fileList, setFileList] = useState([null])
  const [descriptionList, setDescriptionList] = useState([''])
  const [deleteList, setDeleteList] = useState([])
  const [addId, setAddId] = useState(0)
  const addPost = () => {
    console.log(addId)
    setPostList([
      ...newPostList,
      { id: addId + 1, link: './no_image.png', description: '' },
    ])
    setIDList([...IDList, addId + 1])
    setFileList([...fileList, undefined])
    setDescription([...descriptionList, ''])
    setAddId(addId + 1)
  }

  const getPost = (id, picture, description, uploadFile) => {
    const findIndex = newPostList.findIndex(element => element.id == id)
    let arr = [...newPostList]
    arr[findIndex] = { id: id, link: picture, description: description }
    setPostList(arr)

    let arr1 = [...IDList]
    arr1[findIndex] = id
    setIDList(arr1)

    let arr2 = [...fileList]
    arr2[findIndex] = uploadFile
    setFileList(arr2)

    let arr3 = [...descriptionList]
    arr3[findIndex] = description
    setDescriptionList(arr3)
  }

  const getDeletePost = id => {
    const index = newPostList.findIndex(function (item) {
      return item.id === id
    })
    console.log(index)
    let arr = [...newPostList]
    if (index > -1) arr.splice(index, 1)
    setPostList(arr)

    let arr1 = [...IDList]
    if (index > -1) arr1.splice(index, 1)
    setIDList(arr1)

    let arr2 = [...fileList]
    if (index > -1) arr2.splice(index, 1)
    setFileList(arr2)

    let arr3 = [...descriptionList]
    if (index > -1) arr3.splice(index, 1)
    setDescriptionList(arr3)
    delete_func([...deleteList, index])

    setDeleteList([...deleteList, index])
  }

  const handleChange = result => {
    if (!result.destination) return
    const arr = [...newPostList]
    const [reorderedItem] = arr.splice(result.source.index, 1)
    arr.splice(result.destination.index, 0, reorderedItem)
    setPostList(arr)

    const arr1 = [...IDList]
    const [reorderedItem1] = arr1.splice(result.source.index, 1)
    arr1.splice(result.destination.index, 0, reorderedItem1)
    setIDList(arr1)

    const arr2 = [...fileList]
    const [reorderedItem2] = arr2.splice(result.source.index, 1)
    arr2.splice(result.destination.index, 0, reorderedItem2)
    setFileList(arr2)

    const arr3 = [...descriptionList]
    const [reorderedItem3] = arr3.splice(result.source.index, 1)
    arr3.splice(result.destination.index, 0, reorderedItem3)
    setDescriptionList(arr3)
  }
  //console.log("IDList: " + IDList)
  //console.log("fileList: " + fileList)
  //console.log("descriptionList: " + descriptionList)

  useEffect(() => {
    func(newPostList, IDList, fileList, descriptionList)
  }, [newPostList, IDList, fileList, descriptionList])

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')
    axios
      .get(`/api/user/make-exhibition-step2?id=${id}`) //, { params: { id: ID } }
      .then(({ data }) => {
        setPostList(data.contentDtoList)
        setIDList(data.idlist)
        setFileList(data.fileList)
        setDescriptionList(data.descriptionList)
        if (data.idlist.length != 0) {
          setAddId(Math.max(...data.idlist))
        }

        //setData(data.contentDtoList)
        //console.log(postList)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    <Container>
      <Row>
        <Col></Col>
        <Button
          style={{
            width: '10vw',
            marginBottom: '50px',
            button_theme_mid,
            background: '#daa520',
            borderColor: '#daa520',
          }}
          onClick={addPost}
        >
          추가하기
        </Button>
      </Row>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="posts">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {newPostList.map(e => (
                <Draggable
                  key={e.id}
                  draggableId={'draggable' + e.id}
                  index={e.id}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <Post
                        id={e.id}
                        post={e.link}
                        des={e.description}
                        func={getPost}
                        deleteFun={getDeletePost}
                      ></Post>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  )
}

export default ExhibitionPosting
