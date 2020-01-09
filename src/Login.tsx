import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from 'App'

type SetFromEvent = (changeFn: (v: string) => void) => (ev: React.ChangeEvent<HTMLInputElement>) => void
const setFromEvent: SetFromEvent = changeFn => ev => changeFn(ev.target.value)

const request = (email: string, password: string): Promise<Response> => {
  const url = `${process.env.API_HOST}/api/v1/oauth/token`
  const formData = new URLSearchParams()
  formData.append('username', email)
  formData.append('password', password)
  formData.append('grant_type', 'password')
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const history = useHistory()

  const attemptLogin = (setToken?: (token: string) => void) => () => {
    if (!setToken) {
      return
    }

    setErrors('')
    request(email, password).then(response => {
      if (response.status !== 200) {
        return setErrors('Invalid email or password')
      }
      response.json().then(body => {
        setToken(body.access_token)
        localStorage.setItem('musicbox-token', body.access_token)
        history.push('/home')
      })
    })
  }

  return (
    <AuthContext.Consumer>
      {({ setToken }) => {
        return (
          <>
            <input type="text" value={email} onChange={setFromEvent(setEmail)} />
            <input type="text" value={password} onChange={setFromEvent(setPassword)} />
            <button onClick={attemptLogin(setToken)}>Click</button>
            <p>{errors}</p>
          </>
        )
      }}
    </AuthContext.Consumer>
  )
}
export default Login