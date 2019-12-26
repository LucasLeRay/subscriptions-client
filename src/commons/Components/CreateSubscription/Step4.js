import React from 'react'
import { func, shape, string } from 'prop-types'
import {
  Form,
  ActiveButton,
  Buttons,
  Step4Wrapper,
} from './CreateSubscription.module.css'
import Button from '../Button'
import Service from '../Service'

const classNames = array => array.filter(Boolean).join(' ')

function Step4({
  prevStep,
  handleSubmit,
  fields: { service, price, recurrence, payDay, payMonth },
}) {
  return (
    <div className={classNames([Form, Step4Wrapper])}>
      <h1>Overview</h1>
      <Service
        service={service}
        recurrence={recurrence}
        price={Number(price)}
        payDay={Number(payDay)}
        payMonth={Number(payMonth)}
      />
      <div className={Buttons}>
        <Button onClick={prevStep} className={ActiveButton}>
          Previous
        </Button>
        <Button onClick={handleSubmit} className={ActiveButton}>
          Confirm
        </Button>
      </div>
    </div>
  )
}

Step4.propTypes = {
  prevStep: func.isRequired,
  handleSubmit: func.isRequired,
  fields: shape({
    service: string.isRequired,
    price: string.isRequired,
    recurrence: string.isRequired,
    payDay: string.isRequired,
    payMonth: string.isRequired,
  }).isRequired,
}

export default Step4
