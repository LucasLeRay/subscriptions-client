import React from 'react'
import { element } from 'prop-types'
import { Container, Label } from './Input.module.css'

function Input({ label, ...props }) {
  return (
    <div className={Container}>
      <span className={Label}>{label}</span>
      <input {...props} />
    </div>
  )
}

Input.propTypes = {
  label: element,
}

Input.defaultProps = {
  label: <></>,
}

export default Input
