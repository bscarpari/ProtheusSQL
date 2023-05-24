import React, { useState } from 'react'

import useAuth from '../../../hooks/useAuth'

import { useParams } from 'react-router-dom'

import { Hero, Card, Form, Input, Button } from 'react-daisyui'

const ResetPassword = () => {
  const { resetPassword } = useAuth()
  const [newPassword, setNewPassword] = useState('')

  const { id, token } = useParams()

  const onChange = (e) => setNewPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    resetPassword(id, token, newPassword)
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Hero>
        <Hero.Content className='flex-col lg:flex-row-reverse'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-white'>Redefinir senha</h1>
            <p className='py-6 text-justify'>Digite sua nova senha</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Label title='Nova senha' />
            <Input
              type='password'
              placeholder='Digite sua nova senha'
              className='outline-primary accent-primary border-primary'
              color='primary'
              onChange={onChange}
            />
            <br />
            <Button color='primary'>Redefinir senha</Button>
            <a
              className='text-grayMain mt-4 cursor-pointer text-center text-sm hover:text-white'
              href='/login'
            >
              Voltar
            </a>
          </Form>
        </Hero.Content>
      </Hero>
    </div>
  )
}

export default ResetPassword
