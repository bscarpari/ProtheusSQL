import React, { useState } from 'react'
import { goBack } from '../../../utils'

import useAuth from '../../../hooks/useAuth'

import { Hero, Card, Form, Input, Button } from 'react-daisyui'

const SendResetEmail = () => {
  const { sendResetEmail } = useAuth()

  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    sendResetEmail(email)
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Hero>
        <Hero.Content className='flex-col'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-white'>Esqueceu a senha?</h1>
            <p className='py-6 text-justify'>
              Sem problemas, nós iremos lhe enviar as
              <br />
              instruções via e-mail.
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Label title='Email' />
            <Input
              type='text'
              placeholder='Digite seu e-mail aqui'
              className='outline-primary accent-primary border-primary'
              color='primary'
              autoComplete='on'
              onChange={onChange}
            />
            <br />
            <Button color='primary'>Enviar</Button>
            <a
              className='text-grayMain mt-4 cursor-pointer text-center text-sm hover:text-white'
              onClick={() => goBack()}
            >
              Voltar
            </a>
          </Form>
        </Hero.Content>
      </Hero>
    </div>
  )
}

export default SendResetEmail
