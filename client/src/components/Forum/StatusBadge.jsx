import React from 'react'

import { MdDone, MdBlock } from 'react-icons/md'
import { HiClock } from 'react-icons/hi'

const StatusBadge = ({ status }) => {
  const statuses = {
    pending: {
      color: '#B5BCC9',
      colorText: '#000',
      text: 'Pendente',
      icon: <HiClock size={20} />,
    },
    canceled: {
      color: '#FF4441',
      colorText: '#fff',
      text: 'Cancelado',
      icon: <MdBlock size={20} />,
    },
    resolved: {
      color: '#25AD6B',
      colorText: '#fff',
      text: 'Resolvido',
      icon: <MdDone size={20} />,
    },
  }

  const currentStatus = statuses[status]

  return (
    <span
      className={`my-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium`}
      style={{
        backgroundColor: currentStatus.color ? currentStatus.color : '#fff',
        color: currentStatus.colorText ? currentStatus.colorText : '#000',
      }}
    >
      {currentStatus.icon ? currentStatus.icon : null}
      <div className='ml-2'>{currentStatus.text ? currentStatus.text : ''}</div>
    </span>
  )
}

export default StatusBadge
