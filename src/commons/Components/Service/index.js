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
const toSlug = str => str.replace(/^\s+|\s+$/g, '').toLowerCase()

function Service({ clickable, service, recurrence, cost, dayLeft }) {
  return (
    <div className={classNames([Container, clickable ? Hoverable : ''])}>
      <div className={LeftPart}>
        <div className={ImageWrapper}>
          <object
            data={`https://logo.clearbit.com/${toSlug(service)}.com?size=80`}
            type="image/png"
          >
            <img
              src="https://logo.clearbit.com/netflix.com?size=80"
              alt={service}
            />
          </object>
        </div>
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
  recurrence: string.isRequired,
  cost: number.isRequired,
  dayLeft: number.isRequired,
}

Service.defaultProps = {
  clickable: false,
}

export default Service
