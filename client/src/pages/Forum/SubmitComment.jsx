import React, { useState } from 'react'

import api from '../../api'
import jwtDecode from 'jwt-decode'

import { toast } from 'react-toastify'

const SubmitComment = () => {
  const token = localStorage.getItem('token')
  const { id, username } = jwtDecode(token)
  const [value, setValue] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const postId = window.location.pathname.split('/')[3]

    const res = await api.post(`/api/forum/new_comment/${postId}`, {
      username: username,
      userId: id,
      comment: value,
    })

    if (res.status !== 200) return toast.error('Erro ao criar post')

    toast.success('Post criado com sucesso')
    window.location.reload() // TODO: fazer sem reload, usar refetch
  }

  const onChange = (value) => {
    setValue(value)
  }

  return (
    <form onSubmit={handleSubmit} method='POST' className='w-full'>
      <div className='form-group flex flex-col'>
        <label htmlFor='comment' className='my-4'>
          Comentário
        </label>
        <textarea
          name='comment'
          id='comment'
          onChange={(e) => onChange(e.target.value)}
          placeholder='Escreva seu comentário. Limite de 255 caracteres'
          className='form-control min-h-16 focus:border-primary focus:ring-primary max-h-32 overflow-auto rounded-md border border-gray-400 bg-transparent p-2 text-sm'
          style={{
            minHeight: '100px',
            maxHeight: '300px',
          }}
        />
      </div>
      <div className='form-group flex flex-col'>
        <button type='submit' className='btn btn-primary mt-4 w-36'>
          Enviar
        </button>
      </div>
    </form>
  )
}

export default SubmitComment
