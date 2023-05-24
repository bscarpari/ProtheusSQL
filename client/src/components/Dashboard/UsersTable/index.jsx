import React, { useEffect, useState } from 'react'

import api from '../../../api'

import { Avatar, Table } from 'react-daisyui'
import {
  calculateAttemptsPercentage,
  calculatePublicationTime,
  formatDateTime,
  formatRole,
  verifyEditPermission,
} from '../../../utils'
import { SliderPrimary } from '../../daisyui/slider'
import { toast } from 'react-toastify'

export const TableForm = ({ data, editMode = false, setEditMode }) => {
  const { id, username, role, forumPosition, createdAt } = data
  const [usernameValue, setUsernameValue] = useState(username)

  const handleEdit = async () => {
    const username = document.getElementById('username').value

    if (!verifyEditPermission(data))
      return toast.error('Você não tem permissão para editar este perfil')

    const res = api.put(`api/users/${id}`, {
      username,
    })

    if (!res) return toast.error('Erro ao editar perfil')

    setUsernameValue(username)
    toast.success('Perfil editado com sucesso')
    return setEditMode(false)
  }

  return (
    <div className='flex flex-col items-center justify-center overflow-x-auto'>
      <Avatar
        letters={username ? username.charAt(0) : '?'}
        shape={'circle'}
        color={'primary'}
        size={'sm'}
      />
      <span className='my-4 w-full text-center'>
        {editMode ? (
          <div className='flex flex-col items-center'>
            <input
              type='text'
              id='username'
              name='username'
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              maxLength={25}
              minLength={3}
              required
              className='w-32 rounded-md border border-gray-300 bg-transparent p-2 text-center'
              defaultValue={username ? username : 'N/A'}
            />
            <h2 className='text-sm'>{role ? formatRole(role) : 'N/A'}</h2>
            <button
              type='button'
              className='bg-primary mt-4 w-32 rounded-md px-6 py-2 text-sm text-white'
              onClick={handleEdit}
            >
              Salvar
            </button>
          </div>
        ) : (
          <>
            <h1 className='mb-1 text-xl'>
              {usernameValue ? usernameValue : 'N/A'}
            </h1>
            <h2 className='text-sm'>{role ? formatRole(role) : 'N/A'}</h2>
          </>
        )}
      </span>

      <Table
        compact={false}
        style={{ textAlign: 'center', padding: '0px' }}
        id='profileForm'
      >
        <Table.Head>
          <span>ID</span>
          <span>Desde de</span>
          <span>Rank</span>
        </Table.Head>

        <Table.Body>
          <Table.Row>
            <span>{id ? id : '?'}</span>
            <span>{createdAt ? formatDateTime(createdAt) : '?'}</span>
            <span>{forumPosition ? forumPosition : '0'}</span>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export const MonitorTable = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [performance, setPerformance] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('api/users')
        setLoading(false)
        setUsers(res.data)
      } catch (err) {
        toast.error(
          err?.response?.data?.message || 'Erro ao carregar dados do usuário'
        )
      }
    }

    const fetchUsersPerformance = async () => {
      try {
        const res = await api.get('api/users/performance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        setLoading(false)
        setPerformance(res.data)
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            'Erro ao carregar performance do usuário'
        )
      }
    }

    fetchUsers()
    fetchUsersPerformance()
  }, [])

  useEffect(() => {
    const filteredData = users.map((e) => {
      const userPerformance = performance.find((p) => p.id === e.id)

      if (userPerformance) {
        const { attemptHistory } = userPerformance
        console.log(attemptHistory)

        const attempts = attemptHistory.reduce((acc, e) => {
          return acc + e.attempts
        }, 0)

        const correct = attemptHistory.reduce((acc, e) => {
          return acc + e.correct
        }, 0)

        const percentValue = calculateAttemptsPercentage(attempts, correct)

        console.log(percentValue)

        return {
          id: e.id,
          username: e.username,
          percentValue,
          totalSession: calculatePublicationTime(e.createdAt),
          online: userIsOnline(e.id) || false,
        }
      }

      return {
        id: e.id,
        username: e.username,
        percentValue: e.percentValue || 0,
        totalSession: calculatePublicationTime(e.createdAt),
        online: userIsOnline(e.id) || false,
      }
    })

    setData(filteredData)
  }, [users, performance])

  const userIsOnline = (id) => {
    const user = users.find((e) => e.id === id)
    return user ? user.online : false
  }

  // order by percentValue
  data.sort((a, b) => {
    return b.percentValue - a.percentValue
  })

  return (
    <div className='mt-6 overflow-x-auto'>
      <Table compact={false} id='monitorForm' style={{ width: '100%' }}>
        <Table.Head>
          {users.role === 'admin' && <span>ID</span>}
          <span>Usuário</span>
          <span>Porcentagem</span>
          <span />
          <span>Duração</span>
          <span>Status</span>
        </Table.Head>

        {loading ? (
          <Table.Body>
            <span>Carregando...</span>
          </Table.Body>
        ) : (
          <TableRow data={data} />
        )}
      </Table>
    </div>
  )
}

export const TableRow = ({ data }) => {
  return (
    <Table.Body>
      {data.map((e) => {
        return (
          <Table.Row key={e.id}>
            <span>{e.id}</span>
            <span
              style={{ width: '100%', display: 'flex', alignItems: 'center' }}
            >
              <Avatar
                letters={e.username ? e.username.charAt(0) : 'U'}
                size={35}
                shape={'circle'}
                style={{ marginRight: '10px' }}
                color={'primary'}
              />
              {e.username}
            </span>
            <span>
              <SliderPrimary value={e.percentValue} max={100} />
            </span>
            <span>{e.percentValue}</span>
            <span>{e.totalSession}</span>
            <span>{e.online ? 'Ativo' : 'Inativo'}</span>
          </Table.Row>
        )
      })}
    </Table.Body>
  )
}
