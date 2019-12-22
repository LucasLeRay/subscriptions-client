import React from 'react'
import { ReactComponent as Wave } from '../../svgs/wave.svg'
import { Container, WaveContainer, Bottom } from './WaveBackground.module.css'

function WaveBackground() {
  return (
    <div className={Container}>
      <div className={WaveContainer}>
        <Wave />
      </div>
      <div className={Bottom} />
    </div>
  )
}

export default WaveBackground
