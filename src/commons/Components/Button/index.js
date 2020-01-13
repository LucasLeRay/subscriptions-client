import React, { useState } from 'react'
import { string, bool } from 'prop-types'
import { Container, Loading } from './Button.module.css'

const classNames = array => array.filter(Boolean).join(' ')

function Button({
  children,
  invertOnHover,
  textColor,
  backgroundColor,
  className,
  loading,
  ...props
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      className={classNames([className, Container])}
      style={
        hover && invertOnHover
          ? {
            color: backgroundColor,
            backgroundColor: textColor,
          }
          : { color: textColor, backgroundColor }
      }
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {loading ? <div className={Loading} /> : children}
    </button>
  )
}

Button.propTypes = {
  children: string,
  textColor: string,
  backgroundColor: string,
  className: string,
  invertOnHover: bool,
  loading: bool,
}

Button.defaultProps = {
  children: '',
  textColor: '#fff',
  backgroundColor: '#f14d38',
  className: '',
  invertOnHover: false,
  loading: false,
}

export default Button
