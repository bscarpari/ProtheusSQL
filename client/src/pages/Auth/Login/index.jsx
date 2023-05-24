import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import useAuth from '../../../hooks/useAuth'

import { ButtonPrimary } from '../../../components/Utils/Buttons'
import { Input } from '../../../components/Utils/Inputs'
import { AvatarPicture } from '../../../components/Utils/Avatar'

import { Center, Form, LabelSignup, Span, InputDiv } from './style'
import { Label } from '../Register/style'

const Login = () => {
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <Center>
      <AvatarPicture />
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Label htmlFor='password' className='mb-4'>
            E-mail
          </Label>
          <Input
            id='email'
            type='email'
            placeholder='Digite seu e-mail'
            value={email}
            onChange={handleChange}
            autoComplete='on'
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor='password' className='mb-4'>
            Senha
          </Label>
          <Input
            id='password'
            type='password'
            placeholder='Digite sua senha'
            value={password}
            onChange={handleChange}
            minLength={8}
            maxLength={16}
            required
          />
          <Link
            to='/forgotPassword'
            className='text-grayMain mt-4 w-full text-sm hover:text-white hover:underline'
          >
            Esqueceu a senha?
          </Link>
        </InputDiv>
        <ButtonPrimary text='Logar-se' />
        <LabelSignup>
          Não tem uma conta?
          <Link to='/register'>
            <Span>Registre-se</Span>
          </Link>
        </LabelSignup>
        <LabelSignup>
          Ou seja voluntário clicando
          <Link to='/registerVoluntary'>
            <Span>Aqui</Span>
          </Link>
        </LabelSignup>{' '}
      </Form>
    </Center>
  )
}

export default Login
