import React from 'react'
import { number, string } from 'prop-types'
import {
  Container,
  LeftPart,
  ImageWrapper,
  ServiceWrapper,
  Recurrence,
  RightPart,
  Price,
  NextPayment,
} from './Service.module.css'
import calcDayLeft from '../../../helpers/calcDayLeft'

function Service({ service, image, recurrence, price, payDay, payMonth }) {
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
        <h3 className={Price}>{`$${price}`}</h3>
        <div className={NextPayment}>
          <span>in</span>
          <h4>{`${calcDayLeft(payDay, payMonth)} d`}</h4>
        </div>
      </div>
    </div>
  )
}

Service.propTypes = {
  service: string.isRequired,
  image: string,
  recurrence: string.isRequired,
  price: number.isRequired,
  payDay: number.isRequired,
  payMonth: number,
}

Service.defaultProps = {
  image: '',
  payMonth: 0,
}

export default Service
