import React, { useState, useEffect } from 'react'
import { Container, Tab, Col, Button, ListGroup, Row } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import isLogin from '../../utils/isLogin'
import { Navigate } from 'react-router-dom'

const ExhibitionMakeBGMPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentBGM, setCurrentBGM] = useState(null)
  const [id, setID] = useState(location.state.id)
  const [step, setStep] = useState(3)
  const cuteBGM = [
    {
      id: 1,
      name: 'Jay Jay - Kevin MacLeod',
      src: 'http://docs.google.com/uc?export=open&id=1PyIHSBI2juBwoub3P6m9j65fjP02OhhV',
    },
    {
      id: 2,
      name: 'Jigsaw Puzzle - The Green Orbs',
      src: 'http://docs.google.com/uc?export=open&id=1offo2TGHUXksn3ok6cVDrQPKhoKH8ahz',
    },
    {
      id: 3,
      name: 'Lovable Clown Sit Com - Sir Cubworth',
      src: 'http://docs.google.com/uc?export=open&id=1OpZSwINyehkj5Sqg0is2XVYusLwAz2mL',
    },
    {
      id: 4,
      name: 'Springtime Family Band - The Green Orbs',
      src: 'http://docs.google.com/uc?export=open&id=14OobcKwHB27HTUKAyrGlceGgfVNmsd1k',
    },
  ]
  const calmBGM = [
    {
      id: 1,
      name: 'Arms of Heaven - Aakash Gandhi',
      src: 'http://docs.google.com/uc?export=open&id=10bWZZmjaWL9BN5MCpmYzIHUuP0r69ubd',
    },
    {
      id: 2,
      name: 'Beseeched - Asher Fulero',
      src: 'http://docs.google.com/uc?export=open&id=1DEjWLrY3ZZfjy8ADRHc9jQoMXG4vz-jd',
    },
    {
      id: 3,
      name: 'Kiss the Sky - Aakash Gandhi',
      src: 'http://docs.google.com/uc?export=open&id=1H4byx9DXMjeQg0X6dvh7R0oC1QOePcPS',
    },
    {
      id: 4,
      name: 'One Step Closer - Aakash Gandhi',
      src: 'http://docs.google.com/uc?export=open&id=1lRtla5YKHDrvTQITu3LNE5WOhIz2gPnL',
    },
  ]
  const excitingBGM = [
    {
      id: 1,
      name: 'Alternate - Vibe Tracks',
      src: 'http://docs.google.com/uc?export=open&id=1TpxtKMk9O-l4j3lu2a48TiUhgnr5A7NU',
    },
    {
      id: 2,
      name: 'Beat Your Competition - Vibe Tracks',
      src: 'http://docs.google.com/uc?export=open&id=1-m6M-5Ep2V_B90ljaXQB19ZB4RD9rBQH',
    },
    {
      id: 3,
      name: 'Classique - Francis Preve',
      src: 'http://docs.google.com/uc?export=open&id=1fNCsN6smff1u0aPm1LRivlljHAtKSiYk',
    },
    {
      id: 4,
      name: 'Down with Paradise - Norma Rockwell.',
      src: 'http://docs.google.com/uc?export=open&id=1GCTJ0wiJ9oBgFR8hAHhUYNqgq6CjABgZ',
    },
  ]
  const brightBGM = [
    {
      id: 1,
      name: 'Bike Rides - The Green Orbs',
      src: 'http://docs.google.com/uc?export=open&id=12GbzjUB0f99yZy7JJhWHdPXLwaKUq8Ra',
    },
    {
      id: 2,
      name: 'Cha Cappella - Jimmy Fontanez_Media Right Productions',
      src: 'http://docs.google.com/uc?export=open&id=1ke-cmTZRGpEtDwjOQv1pfh8CKbNhqzLY',
    },
    {
      id: 3,
      name: 'If I Had a Chicken - Kevin MacLeod',
      src: 'http://docs.google.com/uc?export=open&id=1AZofsqr9BHZbMIXAz2-vNaWWeazF1YNd',
    },
    {
      id: 4,
      name: 'Payday - Jason Farnham',
      src: 'http://docs.google.com/uc?export=open&id=1Vmm672LVzoRFaShOwt1WGujDh0_87Kp0',
    },
  ]

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')
    axios.get(`/api/user/make-exhibition-step3?id=${id}`).then(res => {
      setStep(res.data.step)
      setCurrentBGM(res.data.src)
    })
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
  const changeCuteBGM = e => {
    let findId = e.target.id
    let obj = cuteBGM.find(bgm => bgm.id == findId)
    document.getElementById('myAudio').volume = 0.1
    setCurrentBGM(obj.src)
  }
  const changeCalmBGM = e => {
    let findId = e.target.id
    let obj = calmBGM.find(bgm => bgm.id == findId)
    document.getElementById('myAudio').volume = 0.1
    setCurrentBGM(obj.src)
  }
  const changeExcitingBGM = e => {
    let findId = e.target.id
    let obj = excitingBGM.find(bgm => bgm.id == findId)
    document.getElementById('myAudio').volume = 0.1
    setCurrentBGM(obj.src)
  }
  const changeBrightBGM = e => {
    let findId = e.target.id
    let obj = brightBGM.find(bgm => bgm.id == findId)
    document.getElementById('myAudio').volume = 0.1
    setCurrentBGM(obj.src)
  }

  const save = () => {
    console.log(step)
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')
    const body = {
      step: 3,
      src: currentBGM,
    }
    axios.post(`/api/user/make-exhibition-step3?id=${id}`, body).then(res => {
      alert('저장되었습니다')
    })
  }

  const next = () => {
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')

    const body = {
      step: 4,
      src: currentBGM,
    }
    axios.post(`/api/user/make-exhibition-step3?id=${id}`, body).then(res => {
      alert('저장되었습니다')
      navigate('/make-exhibition-4step', {
        state: { id: id },
      })
    })
  }

  const previous = () => {
    console.log(id, currentBGM)
    axios.defaults.headers.common['Authorization'] =
      window.localStorage.getItem('token')
    const body = {
      step: 2,
      src: currentBGM,
    }
    axios.post(`/api/user/make-exhibition-step3?id=${id}`, body).then(res => {
      navigate(`/make-exhibition-2step`, {
        state: {
          id: id,
        },
      })
    })
  }

  return (
    <Container className="exhibition_make-container">
      <Container className="inner">
        <Container id="elem1">
          <Col>
            <ListGroup horizontal>
              <ListGroup.Item>Step1</ListGroup.Item>
              <ListGroup.Item>Step2</ListGroup.Item>
              <ListGroup.Item active>Step3</ListGroup.Item>
              <ListGroup.Item>Step4</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <div className="title">bgm 설정하기</div>
          </Col>
          <Col></Col>
        </Container>
        <Container id="elem2">
          <audio
            id="myAudio"
            controls
            volume={0.5}
            loop
            src={currentBGM}
            autoPlay={true}
          ></audio>
        </Container>
        <Container id="elem5">
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col sm={4}>
                <Container className="inner1">
                  <ListGroup>
                    <ListGroup.Item action eventKey="cute">
                      귀여운
                    </ListGroup.Item>
                    <ListGroup.Item action eventKey="calm">
                      잔잔한
                    </ListGroup.Item>
                    <ListGroup.Item action eventKey="exciting">
                      신나는
                    </ListGroup.Item>
                    <ListGroup.Item action eventKey="bright">
                      밝은
                    </ListGroup.Item>
                  </ListGroup>
                </Container>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="cute">
                    <ListGroup>
                      {cuteBGM.map(bgm => (
                        <ListGroup.Item
                          action
                          active={bgm.src === currentBGM}
                          id={bgm.id}
                          onClick={changeCuteBGM}
                        >
                          {bgm.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab.Pane>
                  <Tab.Pane eventKey="calm">
                    {' '}
                    <ListGroup>
                      {calmBGM.map(bgm => (
                        <ListGroup.Item
                          action
                          active={bgm.src === currentBGM}
                          id={bgm.id}
                          onClick={changeCalmBGM}
                        >
                          {bgm.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab.Pane>
                  <Tab.Pane eventKey="exciting">
                    {' '}
                    <ListGroup>
                      {excitingBGM.map(bgm => (
                        <ListGroup.Item
                          action
                          active={bgm.src === currentBGM}
                          id={bgm.id}
                          onClick={changeExcitingBGM}
                        >
                          {bgm.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab.Pane>
                  <Tab.Pane eventKey="bright">
                    {' '}
                    <ListGroup>
                      {brightBGM.map(bgm => (
                        <ListGroup.Item
                          action
                          active={bgm.src === currentBGM}
                          id={bgm.id}
                          onClick={changeBrightBGM}
                        >
                          {bgm.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
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

export default ExhibitionMakeBGMPage
