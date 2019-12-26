import React from 'react'
import { number, string } from 'prop-types'
import {
  Container,
  LeftPart,
  ImageWrapper,
  ServiceWrapper,
  Recurrence,
  RightPart,
  NextPayment,
} from './Service.module.css'

function Service({ service, image, recurrence, cost, dayLeft }) {
  return (
    <div className={Container}>
      <div className={LeftPart}>
        <div className={ImageWrapper} />
        <div className={ServiceWrapper}>
          <h3>{service}</h3>
          <span className={Recurrence}>{`each ${recurrence}`}</span>
        </div>
      </div>
      <div className={RightPart}>
        <h3>{`$${cost.toFixed(2)}`}</h3>
        <div className={NextPayment}>
          <span>in</span>
          <h4>{`${dayLeft} d`}</h4>
        </div>
      </div>
    </div>
  )
}

Service.propTypes = {
  service: string.isRequired,
  image: string,
  recurrence: string.isRequired,
  cost: number.isRequired,
  dayLeft: number.isRequired,
}

Service.defaultProps = {
  image: '',
}

export default Service
