import React, { useState } from 'react'
import jwtDecode from 'jwt-decode'
import api from '../../../../api'

import { toast } from 'react-toastify'
import { VscAdd, VscClose, VscLoading } from 'react-icons/vsc'
import { generateUniqueId } from '../../../../utils'

export const AddTaskForm = ({ setShowAddForm }) => {
  const token = localStorage.getItem('token')
  const decodedtoken = jwtDecode(token)

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id: null,
    userId: decodedtoken.id,
    uid: generateUniqueId(),
    title: '',
    description: '',
    priority: '',
    status: 'pending',
    startAt: '',
    finishAt: '',
  })

  const handleAdd = async () => {
    try {
      setLoading(true)

      const newTask = await api.post('/api/tasks/create', {
        ...formData,
        updatedAt: new Date(),
      })

      if (newTask.status === 200) {
        toast.success('Tarefa adicionada com sucesso')
        setShowAddForm(false)
        setLoading(false)
      }

      window.location.reload()
    } catch (err) {
      setLoading(false)
      toast.error('Erro ao adicionar tarefa')
      console.log(err)
    }
  }

  return (
    <form
      className='bg-black200 flex w-[370px] flex-col items-center justify-center rounded-md px-6 py-4'
      onSubmit={handleAdd}
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleAdd()
      }}
    >
      <div className='flex w-[370px] flex-row items-center justify-between whitespace-nowrap px-6'>
        <input
          className='bg-black100 focus:ring-primary focus:border-primary border-primary cursor-pointer rounded-md border-none text-left text-sm outline-none'
          type='text'
          placeholder='Título'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <div className='flex flex-row items-center justify-between'>
          <button
            className='bg-primary rounded-full p-1 text-white hover:text-gray-300'
            type='button'
            onClick={handleAdd}
          >
            {loading ? (
              <VscLoading size={20} className='animate-spin text-white' />
            ) : (
              <VscAdd size={18} />
            )}
          </button>
          <button
            className='ml-3 rounded-full bg-red-500 text-white hover:text-gray-300'
            type='button'
            onClick={() => setShowAddForm(false)}
          >
            <VscClose size={24} />
          </button>
        </div>
      </div>

      <div className='flex w-full flex-col items-center'>
        <div className='my-2 flex w-full flex-row items-center justify-between'>
          <input
            className='bg-black100 focus:ring-primary focus:border-primary w-full cursor-pointer rounded-md border-none text-xs'
            type='datetime-local'
            placeholder='Data inicial'
            value={formData.startAt}
            onChange={(e) =>
              setFormData({ ...formData, startAt: e.target.value })
            }
          />
          <input
            className='bg-black100 focus:ring-primary focus:border-primary ml-2 w-full cursor-pointer rounded-md border-none text-xs'
            type='datetime-local'
            value={formData.finishAt}
            placeholder='Data final'
            onChange={(e) =>
              setFormData({ ...formData, finishAt: e.target.value })
            }
          />
        </div>
        <div className='flex w-full flex-row items-center justify-between'>
          <textarea
            className='bg-black100 focus:ring-primary focus:border-primary mb-2 w-full cursor-pointer resize-none rounded-md border-none text-xs'
            rows={1}
            type='text'
            placeholder='Descrição da tarefa...'
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            style={{ resize: 'none' }}
          />
        </div>
        <div className='flex w-full flex-row items-center justify-between'>
          <select
            className='bg-black100 focus:outline-primary focus:ring-primary focus:border-primary mr-2 w-1/2 cursor-pointer rounded-md border-none text-xs'
            value={formData.priority}
            defaultValue=''
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <option value=''>Nenhuma</option>
            <option value='low'>Baixa</option>
            <option value='medium'>Média</option>
            <option value='high'>Alta</option>
          </select>
          <select
            className='bg-black100 focus:ring-primary focus:border-primary w-1/2 cursor-pointer rounded-md border-none text-xs'
            value={formData.status}
            defaultValue='pending'
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value='pending'>Pendente</option>
            <option value='inProgress'>Em progresso</option>
            <option value='done'>Concluída</option>
          </select>
        </div>
      </div>
    </form>
  )
}
