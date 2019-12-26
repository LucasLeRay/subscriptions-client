import React from 'react'
import { element, string } from 'prop-types'
import { Container, Label } from './Input.module.css'

const classNames = array => array.filter(Boolean).join(' ')

function Input({ label, className, ...props }) {
  return (
    <div className={classNames([Container, className])}>
      <span className={Label}>{label}</span>
      <input {...props} />
    </div>
  )
}

Input.propTypes = {
  label: element,
  className: string,
}

Input.defaultProps = {
  label: <></>,
  className: '',
}

export default Input
