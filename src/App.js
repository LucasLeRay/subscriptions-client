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
      await Auth.currentSession()
      setUser(true)
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
