import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import Landing from './Landing'
import Login from './Login'
import Signup from './Signup'
import { Context } from '../App'

export default function Nav() {
  const { user } = useContext(Context)
  return (
    <Switch>
      <Route path="/" exact component={user ? Home : Landing} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Redirect to="/" />
    </Switch>
  )
}
