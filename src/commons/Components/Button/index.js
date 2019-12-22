import React from 'react'
import { string } from 'prop-types'
import { Container } from './Button.module.css'

const classNames = array => array.filter(Boolean).join(' ')

function Button({ textColor, backgroundColor, className, ...props }) {
  return (
    <button
      className={classNames([className, Container])}
      style={{ color: textColor, backgroundColor }}
      {...props}
    />
  )
}

Button.propTypes = {
  textColor: string,
  backgroundColor: string,
  className: string,
}

Button.defaultProps = {
  textColor: '#fff',
  backgroundColor: '#f14d38',
  className: '',
}

export default Button
