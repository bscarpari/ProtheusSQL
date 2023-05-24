import React, { useState, useEffect } from 'react'

import api from '../../../../api'
import Card from '../Card'

import { toast } from 'react-toastify'
import { VscCheck, VscClose, VscLoading } from 'react-icons/vsc'

export const EditTaskForm = ({ data, isOpen, setModalOpen, columnTitle }) => {
  const taskId = data.id

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'none',
    status: '',
    startAt: '',
    finishAt: '',
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFormData({
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      startAt: new Date(data.finishAt).toISOString().substring(0, 16),
      finishAt: new Date(data.finishAt).toISOString().substring(0, 16),
    })
  }, [data])

  const refreshTask = async () => {
    const editedTask = await api.put(`/api/tasks/${taskId}`, {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      startAt: formData.startAt,
      finishAt: formData.finishAt,
    })

    if (editedTask.status === 200) {
      toast.success('Tarefa editada com sucesso')
      setModalOpen(false)
      setLoading(false)
      window.location.reload()
    }
  }

  const handleEdit = async () => {
    try {
      setLoading(true)
      refreshTask()
    } catch (err) {
      toast.error('Erro ao editar tarefa')
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <Card
      columnTitle={columnTitle}
      className={isOpen ? 'w-[370px] overflow-auto' : 'hidden'}
      onSubmit={(e) => {
        e.preventDefault()
        handleEdit()
        fetchTask()
      }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleEdit()
      }}
    >
      <div className='flex flex-row items-center justify-between whitespace-nowrap'>
        <input
          className='bg-black100 focus:ring-primary focus:border-primary cursor-pointer rounded-md border-none text-left text-sm'
          type='text'
          placeholder='Título'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <div className='flex flex-row items-center justify-between py-2 px-2'>
          <button
            className='bg-primary rounded-full p-1 text-white hover:text-gray-300'
            type='button'
            onClick={handleEdit}
          >
            {loading ? (
              <VscLoading size={20} className='animate-spin text-white' />
            ) : (
              <VscCheck size={18} />
            )}
          </button>
          <button
            className='ml-3 rounded-full bg-red-500 text-white hover:text-gray-300'
            type='button'
            onClick={() => setModalOpen(false)}
          >
            <VscClose size={24} />
          </button>
        </div>
      </div>
      <div className='my-1 flex flex-row items-center justify-between overflow-hidden whitespace-nowrap text-sm'>
        <input
          type='datetime-local'
          name='startAt'
          id='startAt'
          className='bg-black100 focus:ring-primary focus:border-primary w-full cursor-pointer rounded-md border-none text-xs'
          value={formData.startAt}
          onChange={(e) =>
            setFormData({
              ...formData,
              startAt: e.target.value,
            })
          }
        />
        <input
          type='datetime-local'
          name='finishAt'
          id='finishAt'
          className='bg-black100 focus:ring-primary focus:border-primary w-full cursor-pointer rounded-md border-none text-xs'
          value={formData.finishAt}
          onChange={(e) =>
            setFormData({
              ...formData,
              finishAt: e.target.value,
            })
          }
        />
      </div>
      <div className='mt-2 flex flex-row items-center justify-between'>
        <textarea
          name='description'
          id='description'
          className='bg-black100 focus:ring-primary focus:border-primary w-2/3 cursor-pointer rounded-md border-none text-xs'
          rows={1}
          value={formData.description}
          placeholder='Descrição'
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />
        <select
          name='priority'
          id='priority'
          className='bg-black100 focus:ring-primary focus:border-primary w-1/3 cursor-pointer rounded-md border-none text-xs'
          value={formData.priority}
          placeholder='Prioridade'
          onChange={(e) => {
            setFormData({
              ...formData,
              priority: e.target.value,
            })
          }}
        >
          <option value='none'>Nenhuma</option>
          <option value='low'>Baixa</option>
          <option value='medium'>Média</option>
          <option value='high'>Alta</option>
        </select>
      </div>
    </Card>
  )
}
