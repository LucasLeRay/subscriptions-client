import React from 'react'
import { Link } from 'react-router-dom'
import MovingWave from '@bit/lucasleray.landing-stuff.moving-wave'
import {
  Container,
  Body,
  StartButton,
  ButtonWrapper,
  Wave,
  Text,
  ScreenWrapper,
} from './Landing.module.css'
import Button from '../../commons/Components/Button'
import screen from './screen.png'

function Landing() {
  return (
    <div className={Container}>
      <div className={Body}>
        <div className={Text}>
          <h1>All your subscriptions in one place</h1>
          <p>
          SubFollow is the ultimate subscription management tool. You can track all
          your subscriptions simply and for free. No more forgotten payments or
          hidden fees!
          </p>
          <div className={ButtonWrapper}>
            <Link to="/signup">
              <Button
                backgroundColor="#fff"
                textColor="#f14d38"
                className={StartButton}
              >
            Get Started
              </Button>
            </Link>
            <span>(It&#39;s Free!)</span>
          </div>
        </div>
        <div className={ScreenWrapper}>
          <img src={screen} alt="screen" />
        </div>
      </div>
      <MovingWave className={Wave} />
    </div>
  )
}

export default Landing
