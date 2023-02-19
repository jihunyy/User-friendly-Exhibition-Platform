import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { header } from '../../config'
import isLogin from '../../utils/isLogin'

const testPage = () => {
  const onClick = () => {
    axios.post('api/user/test', {}, header).then(res => {
      console.log(res.data)
    })
  }

  if (!isLogin()) {
    return <div>로그인 안됐습니다!!! 돌아가세요!</div>
  }
  return <button onClick={onClick}>testbutton</button>
}

export default testPage
