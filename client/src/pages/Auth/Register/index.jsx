import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import useAuth from '../../../hooks/useAuth'

import { ButtonPrimary } from '../../../components/Utils/Buttons'
import { HiEnvelope, HiLockClosed, HiAtSymbol } from 'react-icons/hi2'
import { AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai'

import { Center, Form, SignupInput, Label, Input, InputDiv } from './style'

const Register = () => {
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const { username, email, password } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register('', '', username, email, password)
  }

  return (
    <Center>
      <Form onSubmit={handleSubmit}>
        <Description />
        {/* <AuthButtons /> */}
        <Divider />
        <SignupInput>
          <Label>Nome de Usuário</Label>
          <InputDiv>
            <Input
              id='username'
              type='text'
              placeholder='Digite seu usuário aqui'
              value={username}
              onChange={handleChange}
              minLength={3}
              maxLength={20}
              required
            />
            <HiAtSymbol className={'absolute left-6 h-6 w-6'} />
          </InputDiv>
        </SignupInput>
        <SignupInput>
          <Label>Endereço de email</Label>
          <InputDiv>
            <Input
              id='email'
              type='email'
              placeholder='Digite seu e-mail aqui'
              value={email}
              onChange={handleChange}
              required
            />
            <HiEnvelope className={'absolute left-6 h-6 w-6'} />
          </InputDiv>
        </SignupInput>
        <SignupInput>
          <Label>Senha</Label>
          <InputDiv>
            <Input
              id='password'
              type='password'
              placeholder='Digite sua senha aqui'
              value={password}
              autoComplete='on'
              onChange={handleChange}
              maxLength={20}
              required
            />
            <HiLockClosed className={'absolute left-6 h-6 w-6'} />
          </InputDiv>
        </SignupInput>
        <ButtonPrimary text='Registrar-se' />
      </Form>
    </Center>
  )
}

const AuthButtons = () => {
  return (
    <div className='flex w-full flex-col items-start justify-start space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4'>
      <button
        type='button'
        className=' xl:text-1xl mr-2 mb-2 inline-flex w-full items-center rounded-lg bg-[#4285F4] px-8 py-4 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 sm:text-sm'
      >
        <AiOutlineGoogle size={20} className='mx-2' />
        Sign in with Google
      </button>
      <button
        type='button'
        className='mr-2 mb-2 inline-flex w-full items-center rounded-lg bg-[#24292F] px-8 py-4 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50'
      >
        <AiOutlineGithub size={20} className='mx-2' />
        Sign in with Github
      </button>
    </div>
  )
}

const Description = () => {
  return (
    <div className='flex w-full flex-col items-start justify-start space-y-4'>
      <p className='text-4xl font-bold leading-7 md:text-3xl'>Protheus</p>
      <p className='text-sm leading-4'>
        Já tem uma conta?
        <Link to='/login' className='font-bold hover:underline '>
          &nbsp;Entrar
        </Link>
      </p>
    </div>
  )
}

const Divider = () => {
  return (
    <div className='flex w-full items-center justify-start space-x-4'>
      <hr className='w-full border-gray-400' />
      <p className='text-base leading-4 text-gray-400'>ou</p>
      <hr className='w-full border-gray-400' />
    </div>
  )
}

export default Register
