import React from 'react'
import ReactSelect from 'react-select'
import { string, bool, oneOfType, shape, arrayOf, element } from 'prop-types'

import { Container, SelectWrapper, Label } from './Select.module.css'

const classNames = array => array.filter(Boolean).join(' ')

const Select = ({
  label,
  className,
  required,
  value,
  isMulti,
  noOptionsMessage,
  helperText,
  ...props
}) => (
  <div className={SelectWrapper}>
    <span className={Label}>{label}</span>
    <ReactSelect
      placeholder=""
      value={value}
      isMulti={isMulti}
      className={classNames([className, Container])}
      noOptionsMessage={() => noOptionsMessage || 'no result'}
      {...props}
      theme={theme => ({
        ...theme,
        borderRadius: 10,
        spacing: {
          baseUnit: 4,
          controlHeight: 60,
          menuGutter: 8,
        },
        colors: {
          ...theme.colors,
          neutral0: '#f6f6f6',
          primary25: '#f14d38',
          primary50: '#f14d38',
          primary: '#f14d38',
        },
      })}
      styles={{
        control: base => ({
          ...base,
          minHeight: 'inherit',
          height: '100%',
          border: 'none',
        }),
        option: (base, state) => ({
          ...base,
          color: state.isFocused || state.isSelected ? '#fff' : '#000',
        }),
      }}
    />
  </div>
)

Select.propTypes = {
  label: element,
  className: string,
  required: bool,
  value: oneOfType([
    shape({ label: string, value: string }),
    arrayOf(shape({ label: string, value: string })),
    string,
  ]),
  isMulti: bool,
  noOptionsMessage: string,
  helperText: element,
}

Select.defaultProps = {
  label: <></>,
  className: '',
  required: false,
  value: '',
  isMulti: false,
  noOptionsMessage: null,
  helperText: null,
}

export default Select
