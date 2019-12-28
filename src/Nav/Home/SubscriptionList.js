import React, { useState, useEffect } from 'react'
import { func, arrayOf, shape, string, number } from 'prop-types'
import {
  NoSubscription,
  SubscriptionsWrapper,
  DateTitle,
} from './Home.module.css'
import Service from '../../commons/Components/Service'
import Button from '../../commons/Components/Button'

function SubscriptionList({ subscriptions, setCreateSubscription }) {
  const [subscriptionsNextWeek, setSubscriptionsNextWeek] = useState([])
  const [subscriptionsNextMonth, setSubscriptionsNextMonth] = useState([])
  const [subscriptionsNextYear, setSubscriptionsNextYear] = useState([])

  useEffect(() => {
    setSubscriptionsNextWeek(subscriptions.filter(l => l.dayLeft <= 7))
    setSubscriptionsNextMonth(
      subscriptions.filter(l => l.dayLeft > 7 && l.dayLeft <= 30),
    )
    setSubscriptionsNextYear(subscriptions.filter(l => l.dayLeft > 30))
  }, [subscriptions])

  function compareDayLeft(a, b) {
    return a.dayLeft - b.dayLeft
  }

  return (
    <>
      {subscriptions.length ? (
        <div className={SubscriptionsWrapper}>
          {subscriptionsNextWeek.length ? (
            <span className={DateTitle}>7 next days</span>
          ) : (
            ''
          )}
          {subscriptionsNextWeek.sort(compareDayLeft).map(s => (
            <Service
              clickable
              key={s.subscriptionId}
              service={s.service}
              recurrence={s.recurrence}
              cost={s.cost}
              dayLeft={s.dayLeft}
            />
          ))}
          {subscriptionsNextMonth.length ? (
            <span className={DateTitle}>30 next days</span>
          ) : (
            ''
          )}
          {subscriptionsNextMonth.sort(compareDayLeft).map(s => (
            <Service
              clickable
              key={s.subscriptionId}
              service={s.service}
              recurrence={s.recurrence}
              cost={s.cost}
              dayLeft={s.dayLeft}
            />
          ))}
          {subscriptionsNextYear.length ? (
            <span className={DateTitle}>365 next days</span>
          ) : (
            ''
          )}
          {subscriptionsNextYear.sort(compareDayLeft).map(s => (
            <Service
              clickable
              key={s.subscriptionId}
              service={s.service}
              recurrence={s.recurrence}
              cost={s.cost}
              dayLeft={s.dayLeft}
            />
          ))}
        </div>
      ) : (
        <div className={NoSubscription}>
          <h1>
            No subscription yet?
            <br />
            Add your first one!
          </h1>
          <Button onClick={() => setCreateSubscription(true)}>
            New subscription
          </Button>
        </div>
      )}
    </>
  )
}

SubscriptionList.propTypes = {
  subscriptions: arrayOf(
    shape({
      subscriptionId: string.isRequired,
      service: string.isRequired,
      recurrence: string.isRequired,
      cost: number.isRequired,
      dayLeft: number.isRequired,
    }),
  ).isRequired,
  setCreateSubscription: func.isRequired,
}

export default SubscriptionList
