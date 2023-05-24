import React, { useState, useEffect } from 'react'

import api from '../../../api'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const TasksCalendar = () => {
  const [tasks, setTasks] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await api.post('/api/tasks/userTasks')
      const { data } = res
      if (data) {
        setTasks(data)
      }
    }
    fetchTasks()
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      const filteredTasks = tasks.filter((task) => task.status != 'done')

      const eventTasks = filteredTasks.map((task) => ({
        title: task.title,
        start: task.startAt,
        end: task.finishAt,
      }))

      setEvents(eventTasks)

      if (!eventTasks) return setEvents([])
    }
  }, [tasks])

  return (
    <div className='w-full text-xs sm:w-1/2'>
      <FullCalendar
        locale='pt-br'
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={events}
      />
    </div>
  )
}

export default TasksCalendar
