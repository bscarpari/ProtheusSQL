import React, { useEffect } from 'react'

import useAuth from '../../../hooks/useAuth'

import { Dropdown } from 'react-daisyui'
import { VscAccount } from 'react-icons/vsc'
import { fetchUserData } from '../../../utils'

const AvatarDropdown = () => {
  const { logout } = useAuth()
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')

  useEffect(() => {
    fetchUserData().then((data) => {
      setUsername(data.username)
      setEmail(data.email)
    })
  }, [])

  return (
    <Dropdown vertical={'end'} horizontal={'right'}>
      <Dropdown.Toggle>
        <VscAccount size={25} className='text-white' />
      </Dropdown.Toggle>
      <Dropdown.Menu
        className='ml-2 shadow'
        style={{
          width: '15rem',
        }}
      >
        <div
          className='mx-4 my-2 overflow-auto whitespace-nowrap border-b py-3 text-sm text-gray-900'
          style={{ minWidth: '10rem' }}
        >
          <div>{username}</div>
          <div className='truncate font-medium'>{email}</div>
        </div>
        <Dropdown.Item href='/dashboard'>Dashboard</Dropdown.Item>
        <Dropdown.Item href='/schedule'>Agenda</Dropdown.Item>
        <Dropdown.Item href='/forum'>Fórum</Dropdown.Item>
        <Dropdown.Item onClick={() => logout()} href='/'>
          Sair
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AvatarDropdown
