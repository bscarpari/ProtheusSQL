import React from 'react'
import { LoginInput } from './styles'

export const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <LoginInput
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      autoComplete='on'
    />
  )
}
