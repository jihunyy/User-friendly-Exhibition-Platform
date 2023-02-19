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
const CommunityHomePage = () => {
  const [onlineExhibition, setOnlineExhibition] = useState([])
  const [change, setChange] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/online-exhibition')

      setOnlineExhibition(res.data)
      const _change = !change
      setChange(_change)
    }

    fetchData()
  }, [])
  useEffect(() => {
    if (localStorage.getItem('filter') === '좋아요 순') {
      sortByLike()
    } else {
      sortByDatetime()
    }
  }, [change])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(5)
  const [sortMethod, setSortMethod] = useState('최신순')
  const totalPage = onlineExhibition.length / postPerPage
  const indexOfLastPost = currentPage * postPerPage //1*10 = 10번 포스트
  const indexOfFirstPost = indexOfLastPost - postPerPage //10-10 = 0번 포스트
  const currentPosts = onlineExhibition.slice(indexOfFirstPost, indexOfLastPost) //0~10번까지 포스트

  const sortByLike = () => {
    const _onlineExhibition = [...onlineExhibition]
    _onlineExhibition.sort((a, b) => (a.like_count <= b.like_count ? 1 : -1))
    setSortMethod('좋아요 순')
    setOnlineExhibition(_onlineExhibition)
    setCurrentPage(1)
    localStorage.setItem('filter', '좋아요 순')
  }
  const sortByDatetime = () => {
    const _onlineExhibition = [...onlineExhibition]

    _onlineExhibition.sort((a, b) => (a.startDate <= b.startDate ? 1 : -1))
    setSortMethod('최신순')
    setOnlineExhibition(_onlineExhibition)
    setCurrentPage(1)
    localStorage.setItem('filter', '최신순')
  }
  const changeCurrentPage = num => {
    setCurrentPage(num)
  }
  const [sortBy, setSortBy] = useState(
    localStorage.getItem('filter') ? localStorage.getItem('filter') : '최신순'
  )
  //localStorage.setItem('filter', sortBy)

  if (sortBy === '인기순') {
    onlineExhibition.sort(function (a, b) {
      return b.like_count - a.like_count
    })
  }

  const keyInput = selectedKey => {
    if (selectedKey === '최신순') {
      onlineExhibition.sort(function (a, b) {
        return a.startDate < b.startDate
      })

      localStorage.setItem('filter', '최신순')
      setSortBy('최신순')
    }
    if (selectedKey === '인기순') {
      onlineExhibition.sort(function (a, b) {
        return b.like_count - a.like_count
      })

      localStorage.setItem('filter', '인기순')
      setSortBy('인기순')
    }
  }
  return (
    <>
      <Container className="communityPage">
        <Container className="community-main">

          <Container>

            <Row>
              <Col></Col>
              <Col>
                <Dropdown
                  style={{
                    float: 'right',
                    marginTop: '10px',
                  }}
                >
                  <Dropdown.Toggle id="dropdown-basic">
                    {sortMethod}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={sortByDatetime} value="최신순">
                      최신순
                    </Dropdown.Item>
                    <Dropdown.Item onClick={sortByLike} value="좋아요 순">
                      좋아요 순
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
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

export default CommunityHomePage
