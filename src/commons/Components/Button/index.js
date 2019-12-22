import React, { useState } from 'react'
import { string, bool } from 'prop-types'
import { Container } from './Button.module.css'

const classNames = array => array.filter(Boolean).join(' ')

function Button({
  invertOnHover,
  textColor,
  backgroundColor,
  className,
  ...props
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      className={classNames([className, Container])}
      style={
        hover && invertOnHover
          ? { color: backgroundColor, backgroundColor: textColor }
          : { color: textColor, backgroundColor }
      }
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  )
}

Button.propTypes = {
  textColor: string,
  backgroundColor: string,
  className: string,
  invertOnHover: bool,
}

Button.defaultProps = {
  textColor: '#fff',
  backgroundColor: '#f14d38',
  className: '',
  invertOnHover: false,
}

export default Button
