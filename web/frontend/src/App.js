import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Page/LandingPage'
import LoginPage from './Page/LoginPage'
import UserInfoPage from './Page/UserInfoPage'
import RegisterPage from './Page/RegisterPage'
import EmailSend from './Page/EmailSend'
import EmailOk from './Page/EmailOk'
import ExhibitionMakeStartPage from './Page/ExhibitionMakeStartPage'
import ExhibitionMakeBGMPage from './Page/ExhibitionMakeBGMPage'
import Header from './Component/Header'
import Navigation from './Component/Navigation'

import TestPage from './Page/Test/TestPage'
import background from './images/background.jpg'
import background2 from './images/background2.jpg'
import background3 from './images/background3.jpg'
import { Container } from 'react-bootstrap'
import CommunityHomePage from './Page/CommunityHomePage'
import ExhibitionInfo from './Page/ExhibitionInfo'
import ExhibitionMake2stepPage from './Page/ExhibitionMake2stepPage'
import ExhibitionMakeReadyPage from './Page/ExhibitionMakeReadyPage'
import ExhibitionMakeSavedPage from './Page/ExhibitionMakeSavedPage'
import ExhibitionMake4stepPage from './Page/ExhibitionMake4stepPage'
import ExhibitionPage from './Page/ExhibitionPage'
import OfflineCommunityHomePage from './Page/OfflineCommunityHomePage'
import OfflineExhibitionInfo from './Page/OfflineExhibitionInfo'
function App() {
  useEffect(() => {
    if (window.localStorage.getItem('isLogin')) {
      if (JSON.parse(window.localStorage.getItem('isLogin'))) {
        axios.defaults.headers.common['Authorization'] =
          window.localStorage.getItem('token')
      }
    }
  }, [])
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // width: '100vw',
        height: '3000px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Header></Header>
      <Navigation></Navigation>
      <Container className="main-container">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/email-send" element={<EmailSend />} />
          <Route path="/welcome" element={<EmailOk />} />
          <Route exact path="/user-info" element={<UserInfoPage />} />
          <Route path="/test" element={<TestPage></TestPage>}></Route>
          <Route
            path="/make-exhibition-ready"
            element={<ExhibitionMakeReadyPage></ExhibitionMakeReadyPage>}
          ></Route>
          <Route
            path="/make-exhibition-start"
            element={<ExhibitionMakeStartPage></ExhibitionMakeStartPage>}
          ></Route>
          <Route
            path="/saved-exhibition"
            element={<ExhibitionMakeSavedPage></ExhibitionMakeSavedPage>}
          ></Route>
          <Route
            path="/make-exhibition-2step"
            element={<ExhibitionMake2stepPage></ExhibitionMake2stepPage>}
          ></Route>
          <Route
            path="/make-exhibition-bgm"
            element={<ExhibitionMakeBGMPage></ExhibitionMakeBGMPage>}
          ></Route>
          <Route
            path="/community-home"
            element={<CommunityHomePage></CommunityHomePage>}
          />
          <Route
            path="/offline-community-home"
            element={<OfflineCommunityHomePage></OfflineCommunityHomePage>}
          />
          <Route
            path="/exhibition/:key"
            element={<ExhibitionInfo></ExhibitionInfo>}
          ></Route>
          <Route
            path="/offline-exhibition/:id"
            element={<OfflineExhibitionInfo></OfflineExhibitionInfo>}
          ></Route>
          <Route
            path="/make-exhibition-4step"
            element={<ExhibitionMake4stepPage></ExhibitionMake4stepPage>}
          ></Route>
          <Route
            path="/show-exhibition/"
            element={<ExhibitionPage></ExhibitionPage>}
          ></Route>
        </Routes>
      </Container>
    </div>
  )
}

export default App
