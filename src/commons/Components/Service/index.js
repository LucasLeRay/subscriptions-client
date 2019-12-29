import React, { useState } from 'react'
import { number, string, bool, shape } from 'prop-types'
import Modal from '../Modal'
import UpdateSubscription from '../UpdateSubscription'
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

function Service({ clickable, subscription }) {
  const [update, setUpdate] = useState(false)

  return (
    <>
      {clickable && update && (
        <Modal onClickOutSide={() => setUpdate(false)}>
          <UpdateSubscription
            subscription={subscription}
            onUpdate={() => window.location.reload()}
            onDelete={() => window.location.reload()}
          />
        </Modal>
      )}
      <div
        onClick={() => setUpdate(true)}
        className={classNames([Container, clickable ? Hoverable : ''])}
      >
        <div className={LeftPart}>
          <div className={ImageWrapper}>
            <object
              data={`https://logo.clearbit.com/${toSlug(
                subscription.service,
              )}.com?size=80`}
              type="image/png"
            >
              <img
                src="https://logo.clearbit.com/netflix.com?size=80"
                alt={subscription.service}
              />
            </object>
          </div>
          <div className={ServiceWrapper}>
            <h3>{subscription.service}</h3>
            <span className={Recurrence}>
              {`each ${subscription.recurrence}`}
            </span>
          </div>
        </div>
        <div className={RightPart}>
          <h3>{`$${subscription.cost.toFixed(2)}`}</h3>
          <div className={NextPayment}>
            <span>in</span>
            <h4>{`${subscription.dayLeft} d`}</h4>
          </div>
        </div>
      </div>
    </>
  )
}

Service.propTypes = {
  clickable: bool,
  subscription: shape({
    service: string.isRequired,
    recurrence: string.isRequired,
    cost: number.isRequired,
    dayLeft: number.isRequired,
  }).isRequired,
}

Service.defaultProps = {
  clickable: false,
}

export default Service
