import { Progress } from 'react-daisyui'

export const SliderPrimary = ({ value, max }) => {
  return <Progress color={'primary'} value={value} max={max} />
}
