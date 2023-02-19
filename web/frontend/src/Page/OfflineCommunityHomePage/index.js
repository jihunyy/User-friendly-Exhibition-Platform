import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  FormControl,
  Row,
  Col,
  FormLabel,
  Dropdown,
} from 'react-bootstrap'
import axios from 'axios'
import NavDropdown from 'react-bootstrap/NavDropdown'
import InputGroup from 'react-bootstrap/InputGroup'
import Post from './Post'
import './style.css'
import PageBar from '../../Component/PageBar'
const OfflineCommunityHomePage = () => {
  const [offlineExhibition, setOfflineExhibition] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/get-offline-all')
      console.log(res.data)
      setOfflineExhibition(res.data)
    }
    fetchData()
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(5)
  const totalPage = offlineExhibition.length / postPerPage
  const indexOfLastPost = currentPage * postPerPage //1*10 = 10번 포스트
  const indexOfFirstPost = indexOfLastPost - postPerPage //10-10 = 0번 포스트
  const currentPosts = offlineExhibition.slice(
    indexOfFirstPost,
    indexOfLastPost
  ) //0~10번까지 포스트

  const changeCurrentPage = num => {
    setCurrentPage(num)
  }

  return (
    <>
      <Container className="communityPage">
        <Container className="community-main">
          <Post posts={currentPosts}></Post>
          <PageBar
            lastIndex={totalPage}
            activePage={currentPage}
            changePage={changeCurrentPage}
          ></PageBar>
        </Container>
      </Container>
    </>
  )
}

export default OfflineCommunityHomePage
