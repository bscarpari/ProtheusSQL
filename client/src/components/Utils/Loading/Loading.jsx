import React from 'react'

import { VscLoading } from 'react-icons/vsc'

export const Loading = ({ children }) => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center '>
      <VscLoading size={120} className='animate-spin' color='#7259FD' />
      <span className='text-xl text-white'>Carregando...{children}</span>
    </div>
  )
}
