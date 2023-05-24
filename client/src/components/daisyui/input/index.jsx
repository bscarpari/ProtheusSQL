import { Input } from 'react-daisyui'

const MyInput = ({ type, placeholder, value, onChange }) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      color={'primary'}
      className='outline-primary accent-primary border-primary'
    />
  )
}

export default MyInput
