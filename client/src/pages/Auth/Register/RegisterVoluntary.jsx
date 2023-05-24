import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import useAuth from '../../../hooks/useAuth'

import { ButtonPrimary } from '../../../components/Utils/Buttons'
import { HiEnvelope, HiLockClosed, HiAtSymbol } from 'react-icons/hi2'

import { Center, Form, SignupInput, Label, Input, InputDiv } from './style'
import { FaUser } from 'react-icons/fa'
import { BsSymmetryHorizontal } from 'react-icons/bs'

const RegisterVoluntary = () => {
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    fullname: '',
    cpf: '',
    username: '',
    email: '',
    password: '',
  })

  const { fullname, cpf, username, email, password } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(fullname, cpf, username, email, password)
  }

  return (
    <Center>
      <Form onSubmit={handleSubmit}>
        <Description />
        <Divider />
        <SignupInput>
          <Label>Nome completo</Label>
          <InputDiv>
            <Input
              id='fullname'
              type='text'
              placeholder='Digite seu nome completo aqui (ex: João da Silva)'
              value={fullname}
              onChange={handleChange}
              minLength={3}
              maxLength={60}
              required
            />
            <FaUser className={'absolute left-6 h-6 w-6'} />
          </InputDiv>
        </SignupInput>
        <SignupInput>
          <Label>CPF</Label>
          <InputDiv>
            <Input
              id='cpf'
              type='text'
              placeholder='Digite seu CPF aqui (apenas números)'
              value={cpf}
              onChange={handleChange}
              minLength={11}
              maxLength={11}
              required
            />
            <BsSymmetryHorizontal className={'absolute left-6 h-6 w-6'} />
          </InputDiv>
        </SignupInput>
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

export default RegisterVoluntary
