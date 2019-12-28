import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { Container, LoadingWrapper } from './Home.module.css'
import CreateSubscription from '../../commons/Components/CreateSubscription'
import Modal from '../../commons/Components/Modal'
import Loading from '../../commons/Components/Loading'
import calcDayLeft from '../../helpers/calcDayLeft'
import SubscriptionList from './SubscriptionList'

function Home() {
  const [createSubscription, setCreateSubscription] = useState(false)
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)

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
        setSubscriptions(loaded)
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
          <CreateSubscription
            onSuccess={() => window.location.reload()}
            onCancel={() => setCreateSubscription(false)}
          />
        </Modal>
      )}
      {loading ? (
        <div className={LoadingWrapper}>
          <Loading />
        </div>
      ) : (
        <SubscriptionList
          subscriptions={subscriptions}
          setCreateSubscription={setCreateSubscription}
        />
      )}
    </div>
  )
}

export default Home
