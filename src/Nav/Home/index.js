import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import {
  Container,
  LoadingWrapper,
  NoSubscription,
  SubscriptionsWrapper,
  DateTitle,
} from './Home.module.css'
import Button from '../../commons/Components/Button'
import CreateSubscription from '../../commons/Components/CreateSubscription'
import Modal from '../../commons/Components/Modal'
import Service from '../../commons/Components/Service'
import Loading from '../../commons/Components/Loading'
import calcDayLeft from '../../helpers/calcDayLeft'

function Home() {
  const [createSubscription, setCreateSubscription] = useState(false)
  const [loading, setLoading] = useState(true)
  const [subscriptionsNextWeek, setSubscriptionsNextWeek] = useState([])
  const [subscriptionsNextMonth, setSubscriptionsNextMonth] = useState([])
  const [subscriptionsNextYear, setSubscriptionsNextYear] = useState([])

  function compareDayLeft(a, b) {
    return a.dayLeft - b.dayLeft
  }

  function loadSubscriptions() {
    return API.get('subscriptions', '/subscriptions')
  }

  useEffect(() => {
    async function onLoad() {
      try {
        const loaded = (await loadSubscriptions()).map(l => ({
          ...l,
          dayLeft: calcDayLeft(l.payDay, l.payMonth),
        }))
        setSubscriptionsNextWeek(loaded.filter(l => l.dayLeft <= 7))
        setSubscriptionsNextMonth(
          loaded.filter(l => l.dayLeft > 7 && l.dayLeft <= 30),
        )
        setSubscriptionsNextYear(loaded.filter(l => l.dayLeft > 30))
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    onLoad()
  }, [])

  return (
    <div className={Container}>
      {createSubscription && (
        <Modal onClickOutSide={() => setCreateSubscription(false)}>
          <CreateSubscription onDone={() => setCreateSubscription(false)} />
        </Modal>
      )}
      {loading && (
        <div className={LoadingWrapper}>
          <Loading />
        </div>
      )}
      {!loading &&
        !subscriptionsNextWeek.length &&
        !subscriptionsNextMonth.length &&
        !subscriptionsNextYear.length && (
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
          // eslint-disable-next-line indent
        )}
      {!loading && (
        <div className={SubscriptionsWrapper}>
          {subscriptionsNextWeek.length ? (
            <span className={DateTitle}>7 next days</span>
          ) : (
            ''
          )}
          {subscriptionsNextWeek.sort(compareDayLeft).map(s => (
            <Service
              key={s.subscriptionId}
              service={s.service}
              image={s.image}
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
              key={s.subscriptionId}
              service={s.service}
              image={s.image}
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
              key={s.subscriptionId}
              service={s.service}
              image={s.image}
              recurrence={s.recurrence}
              cost={s.cost}
              dayLeft={s.dayLeft}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
