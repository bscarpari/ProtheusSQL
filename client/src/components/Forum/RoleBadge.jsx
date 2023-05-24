import React from 'react'

const RoleBadge = ({ role }) => {
  const roles = {
    admin: 'Administrador',
    voluntary: 'Voluntário',
  }

  return (
    <div className='flex flex-row items-center'>
      <div
        className={`${
          role === 'admin'
            ? 'bg-red-500'
            : role === 'voluntary'
            ? 'bg-green-500'
            : 'bg-gray-500'
        } h-4 w-4 rounded-full px-4 py-1 text-xs font-medium text-white`}
      >
        <span>{roles[role]}</span>
      </div>
    </div>
  )
}

export default RoleBadge
