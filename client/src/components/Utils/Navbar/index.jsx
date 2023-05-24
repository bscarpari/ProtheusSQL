import React, { useEffect } from 'react'

import useAuth from '../../../hooks/useAuth'

import { Navbar, Button, Dropdown, Avatar } from 'react-daisyui'
import { fetchUserData } from '../../../utils'

const SimpleNavbar = () => {
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
    <div className='bg-black100 w-full'>
      <div className='flex w-screen items-center justify-center py-1 px-2 font-sans'>
        <Navbar>
          <div className='flex-1'>
            <Button
              className='text-xl normal-case'
              color='ghost'
              href='/workspace'
            >
              <img src='/src/assets/icons/logotipo.svg' alt='logo protheus' />
            </Button>
          </div>
          <div className='flex-none gap-2'>
            <Dropdown vertical='end'>
              <Avatar
                letters={username ? username[0] : 'A'}
                color={'primary'}
                size={'xs'}
                shape={'circle'}
              />
              <Dropdown.Menu className='menu-compact bg-black100 w-52'>
                <div
                  className='mx-4 my-2 overflow-auto whitespace-nowrap border-b py-3 text-sm text-gray-900 dark:text-white'
                  style={{ maxWidth: '10rem' }}
                >
                  <div>{username}</div>
                  <div className='truncate font-medium'>{email}</div>
                </div>
                <Dropdown.Item href='/workspace'>Workspace</Dropdown.Item>
                <Dropdown.Item href='/dashboard'>Dashboard</Dropdown.Item>
                <Dropdown.Item href='/schedule'>Agenda</Dropdown.Item>
                <Dropdown.Item href='/forum'>Fórum</Dropdown.Item>
                <Dropdown.Item onClick={() => logout()} href='/'>
                  Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar>
      </div>
    </div>
  )
}

export default SimpleNavbar
