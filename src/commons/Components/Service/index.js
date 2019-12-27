import React from 'react'
import { number, string, bool } from 'prop-types'
import {
  Container,
  LeftPart,
  ImageWrapper,
  ServiceWrapper,
  Recurrence,
  RightPart,
  NextPayment,
  Hoverable,
} from './Service.module.css'

const classNames = array => array.filter(Boolean).join(' ')

function Service({ clickable, service, image, recurrence, cost, dayLeft }) {
  return (
    <div className={classNames([Container, clickable ? Hoverable : ''])}>
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
  clickable: bool,
  service: string.isRequired,
  image: string,
  recurrence: string.isRequired,
  cost: number.isRequired,
  dayLeft: number.isRequired,
}

Service.defaultProps = {
  clickable: false,
  image: '',
}

export default Service
