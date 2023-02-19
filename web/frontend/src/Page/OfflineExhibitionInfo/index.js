import axios from 'axios'
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
import { useParams } from 'react-router-dom'

import './style.css'
const OfflineExhibitionInfo = () => {
  const { id } = useParams()
  console.log(id)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [poster, setPoster] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/get-offline-info?id=${id}`)
      console.log(res.data)
      setTitle(res.data.title)
      setDescription(res.data.descript)
      setLink(res.data.link)
      setPoster(res.data.poster)
    }

    fetchData()
  }, [])

  return (
    <Container className="offline-exhibitionInfo-container">
      <Container className="title">{title}</Container>
      <Container className="body">
        <Container className="poaster">
          <img src={poster} className="img"></img>
        </Container>
        <Container className="descript">{description}</Container>
      </Container>
      <Container className="link">
        <Button
          style={{
            backgroundColor: '#daa520',
            borderColor: '#daa520',
            fontWeight: 'bold',
            width: '90%',
          }}
          onClick={() => window.open(link, '_blank')}
        >
          바로가기
        </Button>
      </Container>
    </Container>
  )
}

export default OfflineExhibitionInfo
