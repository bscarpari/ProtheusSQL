import React, { useEffect } from 'react'

import { TaskCard, SkeletonTaskCard } from '../../Utils/Cards'

import { Information, Title } from './style'
import api from '../../../api'
import { Link } from 'react-router-dom'

const TasksList = () => {
  const [loading, setLoading] = React.useState(false)
  const [tasks, setTasks] = React.useState([])

  useEffect(() => {
    api.post('/api/tasks/userTasks').then((res) => {
      const { data } = res

      setLoading(true)

      if (data) {
        setTasks(data)
        setLoading(false)
      }
    })
  }, [])

  return (
    <>
      {loading ? (
        <>
          <SkeletonTaskCard />
        </>
      ) : (
        <Information>
          <Title>
            <h1>Tarefas</h1>
            <h2 className='bg-primary flex h-6 w-6 items-center justify-center rounded-full text-white'>
              {tasks.length ? tasks.length : '0'}
            </h2>
          </Title>
          <div>
            {tasks.length === 0 ? (
              <div className='flex w-full flex-col justify-center'>
                <h1 className='my-4 text-center text-gray-500'>
                  Nenhuma tarefa encontrada
                </h1>
                <Link
                  to='/schedule'
                  className='btn btn-primary my-4 mx-auto w-32 whitespace-nowrap text-xs'
                >
                  Ir para a agenda
                </Link>
              </div>
            ) : (
              <>
                {tasks.map((task, index) => (
                  <TaskCard data={task} key={index} />
                ))}
              </>
            )}
          </div>
        </Information>
      )}
    </>
  )
}

export default TasksList
