import React, { useState } from 'react'
import { Container, NoSubscription } from './Home.module.css'
import Button from '../../commons/Components/Button'
import CreateSubscription from '../../commons/Components/CreateSubscription'
import Modal from '../../commons/Components/Modal'

function Home() {
  const [createSubscription, setCreateSubscription] = useState(false)

  return (
    <div className={Container}>
      {createSubscription && (
        <Modal onClickOutSide={() => setCreateSubscription(false)}>
          <CreateSubscription onDone={() => setCreateSubscription(false)} />
        </Modal>
      )}
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
    </div>
  )
}

export default Home
