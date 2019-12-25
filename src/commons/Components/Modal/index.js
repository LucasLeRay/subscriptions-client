import React, { useEffect } from 'react'
import { func, string } from 'prop-types'
import { createPortal } from 'react-dom'
import { Background, Content } from './Modal.module.css'

const classNames = array => array.filter(Boolean).join(' ')

const element = document.body.appendChild(document.createElement('div'))

function Modal({ onClickOutSide, children, className }) {
  useEffect(() => {
    document.body.classList.add('no-scroll')
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])
  return createPortal(
    <div onClick={onClickOutSide} className={Background}>
      <div
        className={classNames([Content, className])}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    element,
  )
}

Modal.propTypes = {
  onClickOutSide: func,
  className: string,
}

Modal.defaultProps = {
  onClickOutSide: undefined,
  className: '',
}

export default Modal
