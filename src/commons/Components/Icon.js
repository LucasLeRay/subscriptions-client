import React, { forwardRef } from 'react'
import { string } from 'prop-types'

const Icon = forwardRef(({ className, ...props }, ref) => (
  <i {...props} className={`${className} material-icons`} ref={ref} />
))

Icon.propTypes = {
  className: string,
}

Icon.defaultProps = {
  className: '',
}

export default Icon
