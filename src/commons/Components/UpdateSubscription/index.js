import React, { useState } from 'react'
import { API } from 'aws-amplify'
import { func, shape, string, number } from 'prop-types'
import {
  Container,
  Form,
  Buttons,
  ServiceInput,
  PayDay,
  PayMonth,
  FirstLine,
  SecondLine,
  Recurrence,
  CostInput,
  TextInput,
  YearLine,
} from './UpdateSubscription.module.css'
import useForm from '../../hooks/useForm'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const classNames = array => array.filter(Boolean).join(' ')

function UpdateSubscription({ subscription, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false)
  const [fields, handleFieldChange] = useForm({
    service: subscription.service,
    cost: String(subscription.cost),
    recurrence: subscription.recurrence,
    payDay: String(subscription.payDay),
    payMonth: String(subscription.payMonth),
  })

  function validateFields() {
    const { service, cost, recurrence, payDay, payMonth } = fields
    return (
      service.length > 0 &&
      cost.length > 0 &&
      ['month', 'year'].includes(recurrence) &&
      payDay.length > 0 &&
      Number(payDay) > 0 &&
      Number(payDay) <= 30 &&
      (recurrence === 'month' ||
        (payMonth.length > 0 && Number(payMonth) <= 12 && Number(payMonth) > 0))
    )
  }

  function handleCostChange(e) {
    const costRegExp = /^[0-9]*(\.)?[0-9]*$/
    if (costRegExp.test(e.target.value)) {
      handleFieldChange(e)
    }
  }

  function update() {
    const { service, cost, recurrence, payDay, payMonth } = fields
    const { subscriptionId } = subscription
    return API.put('subscriptions', `/subscriptions/${subscriptionId}`, {
      body: {
        service,
        cost: Number(cost),
        recurrence,
        payDay: Number(payDay),
        payMonth: recurrence === 'year' ? Number(payMonth) : 0,
      },
    })
  }

  async function handleUpdate() {
    try {
      setLoading('update')
      await update()
      onUpdate()
    } catch (err) {
      console.error(err)
    }
  }

  function del() {
    const { subscriptionId } = subscription
    return API.del('subscriptions', `/subscriptions/${subscriptionId}`)
  }

  async function handleDelete() {
    try {
      setLoading('delete')
      await del()
      onDelete()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={Container}>
      <div className={Form}>
        <h1>Update the subscription</h1>
        <div className={FirstLine}>
          <Input
            label={<>Service</>}
            id="service"
            type="text"
            value={fields.service}
            onChange={handleFieldChange}
            className={ServiceInput}
          />
          <Input
            label={<>Cost</>}
            id="cost"
            type="number"
            value={fields.cost}
            onChange={handleCostChange}
            className={CostInput}
          />
        </div>
        <div className={classNames([SecondLine,
          fields.recurrence === 'year' ? YearLine : '',
        ])}
        >
          <div>
            <span className={TextInput}>The</span>
            <Input
              className={PayDay}
              id="payDay"
              type="number"
              min="1"
              max="30"
              value={fields.payDay}
              onChange={handleFieldChange}
            />
            {fields.recurrence === 'year' && (
            <Select
              className={PayMonth}
              type="text"
              value={{
                label: months[fields.payMonth - 1],
                value: String(fields.payMonth),
              }}
              options={months.map((value, index) => ({
                label: value,
                value: String(index + 1),
              }))}
              onChange={e => handleFieldChange(e, 'payMonth')}
            />
            )}
          </div>
          <div>
            <span className={TextInput}>of each</span>
            <Select
              className={Recurrence}
              type="text"
              value={{ label: fields.recurrence, value: fields.recurrence }}
              onChange={e => handleFieldChange(e, 'recurrence')}
              options={[
                {
                  label: 'month',
                  value: 'month',
                },
                {
                  label: 'year',
                  value: 'year',
                },
              ]}
            />
          </div>
        </div>
        <div className={Buttons}>
          <Button onClick={handleDelete} loading={loading === 'delete'}>
            Delete
          </Button>
          <Button
            onClick={handleUpdate}
            loading={loading === 'update'}
            disabled={!validateFields()}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  )
}

UpdateSubscription.propTypes = {
  subscription: shape({
    service: string.isRequired,
    cost: number.isRequired,
    recurrence: string.isRequired,
    payDay: number.isRequired,
    payMonth: number,
    subscriptionId: string.isRequired,
  }).isRequired,
  onUpdate: func.isRequired,
  onDelete: func.isRequired,
}

export default UpdateSubscription
