import React, { useState, useEffect, createContext } from 'react'
import { Auth } from 'aws-amplify'
import Nav from './Nav'
import Header from './commons/Components/Header'

export const Context = createContext()

function App() {
  const [user, setUser] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  async function onLoad() {
    try {
      const { signInUserSession } = await Auth.currentAuthenticatedUser()
      const admin = signInUserSession.accessToken.payload['cognito:groups']
      setUser({ admin })
    } catch (err) {
      if (err !== 'No current user') {
        console.error(err)
      }
    }

    setIsAuthenticating(false)
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <>
      <Context.Provider value={{ user, setUser }}>
        <Header />
        {!isAuthenticating && <Nav />}
      </Context.Provider>
    </>
  )
}

export default App
