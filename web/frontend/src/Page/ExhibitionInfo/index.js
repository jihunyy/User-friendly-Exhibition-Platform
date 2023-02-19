import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Figure,
  Row,
  Col,
  Badge,
  FormLabel,
} from 'react-bootstrap'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import HeartImg from './heart.png'
import EmptyHeartImg from './heart-2.png'
import Comment from '../../Component/Comment'
import isLogin from '../../utils/isLogin'
import axios from 'axios'
import { header } from '../../config'
import './style.css'
import OfflineExhibition from '../../Component/OfflineExhibition'
const ExhibitionInfo = () => {
  const { id, title, date, keyword, poaster, description, like, author } =
    useLocation().state //state
  const { key } = useParams()
  //const { id, title, date, keyword, poaster, description, like } = useLocation().state //state
  //console.log(title + " " + date + " " + keyword)
  const [favorite, setFavorite] = React.useState(false)
  const [comment, setComment] = React.useState('')
  const [commentList, setCommentList] = useState([])
  const [commentLength, setCommentLength] = useState(0)
  const [likecount, setLikecount] = useState(like)
  const [recommend, setRecommend] = useState(null)
  const navigate = useNavigate()

  const commentChange = e => {
    setComment(e.target.value)
    setCommentLength(e.target.value.length)
  }
  const onHeartClick = () => {
    if (favorite === true) {
      if (likecount - 1 < 0) {
        setLikecount(0)
      } else {
        setLikecount(likecount - 1)
      }
    } else {
      setLikecount(likecount + 1)
    }
    var body = {
      id: id,
      clicked: !favorite,
      likeCount: likecount,
    }
    //console.log(body)

    async function post() {
      axios.post('/api/user/likes', body, header).then(res => {
        setFavorite(!favorite)
      })
    }

    post()
  }

  const addComment = newComment => {
    var _commentList = [...commentList]
    _commentList.push(newComment)
    setCommentList(_commentList)
  }

  //댓글 등록
  const onCommentClick = () => {
    if (comment != '') {
      var body = {
        description: comment,
        online_exhibition_id: id,
      }
      axios.defaults.headers.common['Authorization'] =
        window.localStorage.getItem('token')
      axios.post('/api/user/comment', body).then(res => {
        console.log(res.data)
        addComment(res.data)
      })
      //적었던 댓글 초기화
      document.getElementById('commentArea').value = ''
      setComment('')
      setCommentLength(0)
    }
  }
  const deleteComment = target => {
    var _commentList = [...commentList]
    var idx = _commentList.findIndex(comment => comment.id === target.id)
    _commentList.splice(idx, 1)
    setCommentList(_commentList)
  }

  //상세보기 페이지 이동
  const moveToExhibition = () => {
    navigate('/show-exhibition', {
      state: {
        id: id,
      },
    })
  }

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')
    if (isLogin()) {
      axios.get('/api/user/likes', { params: { id: id } }).then(res => {
        setFavorite(res.data.clicked)
        setLikecount(res.data.likeCount)
      })
    }
    //댓글 가져오기
    axios.get('/api/comment', { params: { id: id } }).then(res => {
      setCommentList(res.data)
    })

    axios.get(`/api/recommend/get-recommend?onlineid=${id}`).then(res => {
      console.log(res.data)
      setRecommend(res.data)
    })
  }, [])

  // useEffect(() => {
  //   axios.defaults.headers.common['Authorization'] =
  //     window.localStorage.getItem('token')
  //   if (isLogin()) {
  //     //console.log(favorite)

  //   }
  // }, [favorite, likecount])

  return (
    //console.log(parms.key)
    <Container>
      <Container
        className="exhibitionInfo-container"
        style={{ padding: '5px', display: 'block' }}
      >
        <Container style={{ width: '80%' }}>
          <Row style={{ marginTop: '20px' }}>
            <Col>
              <Container className="exhibition-img-container">
                <Figure.Image className="img" src={poaster} />
              </Container>
            </Col>
            <Col xs={6}>
              <Container className="title-container">
                <Badge
                  className="title-badge1"
                  bg="None"
                  style={{ margin: 'auto' }}
                >
                  {title}
                </Badge>
              </Container>
              <Container className="author-container">
                {author} 님의 작품
              </Container>

              <Container className="tag-label-container1">
                <Badge className="tag-badge1" bg="None" pill>
                  #{keyword[0]}
                </Badge>
                <Badge className="tag-badge1" bg="None" pill>
                  #{keyword[1]}
                </Badge>
                <Badge className="tag-badge1" bg="None" pill>
                  #{keyword[2]}
                </Badge>
              </Container>
              <Container className="description-container">
                {description}
              </Container>

              <Container className="heart-container">
                <Button
                  style={{
                    width: '70%',
                    justifyContent: 'left',
                    marginRight: '30px',
                    background: '#f3ca4d',
                    border: '#f3ca4d 2px solid',
                    color: 'dimgray',
                  }}
                  onClick={moveToExhibition}
                >
                  전시회 바로 가기
                </Button>
                <img
                  src={favorite ? HeartImg : EmptyHeartImg}
                  style={{ width: '20px', marginRight: '10px' }}
                  onClick={onHeartClick}
                ></img>
                {likecount} likes
              </Container>
              <Container className="date-container">{date}</Container>
            </Col>
          </Row>
        </Container>

        <Row style={{ marginTop: '80px' }}>
          <Container>
            {commentList.map(comment => (
              <Comment comment={comment} deleteFunc={deleteComment}></Comment>
            ))}
            <Row>
              <Container
                style={{
                  width: '80%',
                  marginTop: '100px',
                  marginBottom: '100px',
                }}
              >
                {isLogin() ? (
                  <textarea
                    id="commentArea"
                    maxLength={400}
                    placeholder="댓글을 남겨보세요"
                    style={{ width: '100%', height: '70px' }}
                    onChange={commentChange}
                  ></textarea>
                ) : (
                  <textarea
                    maxLength={400}
                    placeholder="로그인을 해주세요"
                    style={{ width: '100%', height: '70px' }}
                    onChange={commentChange}
                    disabled={true}
                  ></textarea>
                )}
                <Button
                  style={{
                    background: '#daa520',
                    border: '#daa520',
                    width: '10%',
                    height: '70px',
                    float: 'right',
                  }}
                  disabled={!isLogin()}
                  onClick={onCommentClick}
                >
                  게시
                </Button>
              </Container>
            </Row>
          </Container>

          {/* here */}
        </Row>
        <Container className="recommend-container2">
          <FormLabel style={{ fontSize: '25px' }}>추천하는 전시회</FormLabel>
          {recommend ? (
            <OfflineExhibition
              id={recommend.offlineid}
              title={recommend.title}
              poaster={recommend.poster}
              description={recommend.descript}
            ></OfflineExhibition>
          ) : (
            <></>
          )}
        </Container>
      </Container>
    </Container>
  )
}

export default ExhibitionInfo
