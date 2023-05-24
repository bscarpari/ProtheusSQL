import { createContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import api from '../api'

const API_URL = 'http://localhost:3000'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)

  // TODO: Implementar refresh token, onde o usuário é deslogado quando jwt expirar
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   const tokenExpired = isExpired(token)
  //   console.log('expirou? ', tokenExpired)

  //   if (tokenExpired) {
  //     api
  //       .post('/auth/logout', {
  //         headers: {
  //           Authorization: localStorage.getItem('token'),
  //         },
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           setAuthenticated(false)
  //           toast.info('Sua sessão expirou')
  //         }
  //       })
  //     localStorage.removeItem('token')
  //   }

  //   api.defaults.headers.Authorization = token
  //   setAuthenticated(true)
  // }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = token
      setAuthenticated(true)
    }
  }, [])

  const register = async (fullname, cpf, username, email, password) => {
    console.log(fullname, cpf, username, email, password)

    try {
      const res = await api.post(`${API_URL}/auth/register`, {
        fullname: fullname ? fullname : '',
        cpf: cpf ? cpf : '',
        username,
        email,
        password,
      })

      if (res.status === 201) {
        toast.success('Conta criada com sucesso')

        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      }
    } catch (error) {
      console.log(error)
      toast.error(
        `${error.response?.data?.message || 'Ocorreu um erro inesperado'}`
      )
    }
  }

  const login = async (email, password) => {
    try {
      const response = await api.post(`${API_URL}/auth/login`, {
        email,
        password,
      })

      const { token } = response.data
      localStorage.setItem('token', token)
      api.defaults.headers.Authorization = token

      if (token) {
        setAuthenticated(true)
        toast.success('Logado com sucesso')

        setTimeout(() => {
          window.location.href = '/workspace'
        }, 500)
      }
    } catch (error) {
      console.log(error)
      toast.error(
        `${error.response?.data?.message || 'Ocorreu um erro inesperado'}`
      )
    }
  }

  const logout = async () => {
    try {
      const res = api.get('/auth/logout')

      if (!res) return toast.error('Ocorreu um erro inesperado')

      localStorage.removeItem('token')
      setAuthenticated(false)
      toast.success('Deslogado com sucesso')
    } catch (error) {
      console.log(error)
      toast.error(
        `${error.response?.data?.message || 'Ocorreu um erro inesperado'}`
      )
    }
  }

  const sendResetEmail = async (email) => {
    try {
      const response = await api.post(`${API_URL}/auth/forgotPassword`, {
        email,
      })

      if (response.status === 200) toast.info('Verifique sua caixa de entrada')
    } catch (error) {
      console.log(error)
      toast.error(
        `${error.response?.data?.message || 'Ocorreu um erro inesperado'}`
      )
    }
  }

  const resetPassword = async (id, token, password) => {
    try {
      const response = await api.post(
        `${API_URL}/auth/resetPassword/:id/:token`,
        {
          id,
          token,
          password,
        }
      )

      if (response.status === 200) {
        toast.success('Senha atualizada com sucesso')
        toast.info(
          'Você será redirecionado para a página de login em 2 segundos'
        )
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      }
    } catch (error) {
      console.log(error)
      toast.error(
        `${error.response?.data?.message || 'Ocorreu um erro inesperado'}`
      )
    }
  }

  const contextData = {
    authenticated,
    register,
    login,
    logout,
    sendResetEmail,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={contextData} key={authenticated}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  )
}

export default AuthProvider
