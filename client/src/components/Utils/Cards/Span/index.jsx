import { Tooltip } from 'react-daisyui'
import {
  AiOutlineArrowDown,
  AiOutlineExclamation,
  AiOutlineArrowUp,
} from 'react-icons/ai'

export const Span = ({ priority }) => {
  return (
    <div className='flex items-center justify-center rounded-full bg-white'>
      <Tooltip
        position='left'
        color={'primary'}
        message={
          priority === 'low'
            ? 'Prioridade baixa'
            : priority === 'medium'
            ? 'Prioridade média'
            : 'Prioridade alta'
        }
        children={
          priority === '' ? (
            ''
          ) : priority === 'low' ? (
            <AiOutlineArrowDown size={25} color={'#25AD6B'} />
          ) : priority === 'medium' ? (
            <AiOutlineExclamation size={25} color={'#ff7300'} />
          ) : (
            <AiOutlineArrowUp size={25} color={'#FF4441'} />
          )
        }
      />
    </div>
  )
}
