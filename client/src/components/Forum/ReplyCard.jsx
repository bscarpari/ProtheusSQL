import React, { useState, useEffect } from 'react'

import api from '../../api'
import jwtDecode from 'jwt-decode'

import { toast } from 'react-toastify'
import { Avatar } from 'react-daisyui'
import { VscEdit } from 'react-icons/vsc'
import { AiFillDelete } from 'react-icons/ai'
import { calculatePublicationTime } from '../../utils'
import RoleBadge from './RoleBadge'

const ReplyCard = ({ reply }) => {
  const [editMode, setEditMode] = useState(false)
  const [comment, onChange] = useState(reply.comment)
  const { id: commentId, username, role: userRole, createdAt } = reply

  const postId = window.location.pathname.split('/')[3]
  const [userId, setUserId] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const decoded = jwtDecode(token)
    const { id, role } = decoded

    setUserId(id)
    setRole(role)
  }, [])

  const verifyEditPermission = (value) => {
    if (value.userId === userId) return true // dono pode editar seu próprio post
    if (role === 'admin') return true // admin pode editar qualquer post
    // 1. voluntário pode editar post de role de 'learner'
    // 2. voluntário não pode editar post de outro 'voluntary'
    // 3. voluntário não pode editar post de 'admin'
    if (role === 'voluntary' && value.role === 'learner') return true
    if (
      role === 'voluntary' &&
      value.role === 'voluntary' &&
      value.userId !== userId
    )
      return false
    if (role === 'voluntary' && value.role === 'admin') return false

    return false
  }

  const handleDelete = async () => {
    const res = await api.delete(`api/forum/${postId}/${commentId}`)

    if (!res) return toast.error('Erro ao deletar comentário')

    window.location.reload() // TODO: refatorar para refetch
    toast.success('Comentário deletado com sucesso')
  }

  const handleEdit = async () => {
    if (!verifyEditPermission(reply))
      return toast.error('Você não tem permissão para editar este post')

    const res = await api.put(`api/forum/${postId}/${commentId}`, {
      comment,
    })

    if (!res) return toast.error('Erro ao editar comentário')

    if (!res.data) return toast.error('Erro ao editar post')
    if (res.data.comment === comment) return setEditMode(!editMode)

    setEditMode(!editMode)
  }

  useEffect(() => {
    if (editMode) {
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          setEditMode(false)
        }
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [editMode])

  return (
    <div className='bg-black200 mb-4 w-full rounded-lg py-2 px-6'>
      <div className='my-4 flex w-full flex-col items-center justify-between'>
        <div className='flex w-full flex-row items-center justify-between sm:w-fit'>
          <div className='flex w-full flex-row items-center'>
            <Avatar
              letters={username ? username[0] : 'A'}
              size='xs'
              shape='circle'
              color='primary'
            />
            <div className='ml-2 flex flex-col items-center text-sm'>
              <div className='my-2 flex w-full flex-row items-center'>
                <span className='mr-2'>{username ? username : 'Anônimo'}</span>
                <RoleBadge role={userRole} />
              </div>
              <span className='w-full text-sm text-gray-400'>
                {createdAt ? calculatePublicationTime(createdAt) : 'DD/MM/AAAA'}
              </span>
            </div>
          </div>

          {verifyEditPermission(reply) && (
            <div className='flex flex-row items-center'>
              <button onClick={handleEdit} className='mr-2'>
                <VscEdit size={20} />
              </button>
              <button onClick={handleDelete}>
                <AiFillDelete size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className='my-4 flex w-full flex-col overflow-y-auto overflow-x-hidden text-justify'
        style={{
          maxHeight: '400px',
          wordBreak: 'break-word',
          paddingRight: '1rem',
        }}
      >
        <>
          {editMode ? (
            <textarea
              name='comment'
              id='comment'
              onChange={(e) => onChange(e.target.value)}
              value={comment}
              placeholder='Escreva seu comentário. Limite de 255 caracteres'
              className='form-control focus:border-primary focus:ring-primary max-h-32 w-full overflow-auto rounded-md border border-gray-400 bg-transparent text-sm'
              style={{
                minHeight: '100px',
                maxHeight: '300px',
              }}
            />
          ) : (
            <p className='text-sm'>{comment ? comment : ''}</p>
          )}
        </>
      </div>
    </div>
  )
}

export default ReplyCard
