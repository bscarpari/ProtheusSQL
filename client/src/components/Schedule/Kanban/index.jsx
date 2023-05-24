import React, { useState, useEffect, forwardRef } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import api from '../../../api'
import Card from './Card'
import IconMenu from '../../../assets/icons/moreHorizontal.svg'

import { toast } from 'react-toastify'
import { VscLoading } from 'react-icons/vsc'
import { Dropdown, Button } from 'react-daisyui'
import { AiFillClockCircle } from 'react-icons/ai'
import { PriorityLabel } from '../../Utils/Cards/Label'

import { AddTaskForm } from './Forms/AddTaskForm'
import { EditTaskForm } from './Forms/EditTaskForm'

import { formatDateTime } from '../../../utils'
import { generateShortUniqueId } from '../../../utils'

import { Amount, Board, Content, Header, Section } from './style'

const KanbanBoard = forwardRef(({ items, onDragEnd }, ref) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Board ref={ref}>
        {items.map((item, index) => (
          <Columns
            key={item.id}
            column={item}
            tasks={item.tasks}
            index={index}
          />
        ))}
      </Board>
    </DragDropContext>
  )
})

const Columns = ({ column, tasks }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Droppable
        key={column.id}
        droppableId={column.id}
        mode='virtual'
        renderClone={(provided, snapshot, rubric) => (
          <TaskCard
            key={rubric.source.index}
            provided={provided}
            item={tasks[rubric.source.index]}
            columnTitle={column.title}
            isDragging={snapshot.isDragging}
          />
        )}
      >
        {(provided) => (
          <>
            <Section ref={provided.innerRef} {...provided.droppableProps}>
              <Header>
                {column.title ? column.title : 'Sem título'}
                <Amount>{tasks.length > 0 ? tasks.length : 0}</Amount>
              </Header>

              <div className='h-full'>
                <TasksList column={column} tasks={tasks} />
                <AddTaskButton column={tasks} />
              </div>
            </Section>
          </>
        )}
      </Droppable>
    </div>
  )
}

const TasksList = ({ column, tasks }) => {
  const tasksOrderedByDate = tasks.sort((a, b) => {
    return new Date(a.finishAt) - new Date(b.finishAt)
  })

  return (
    <Content>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.uid} index={index}>
          {(provided, snapshot) => (
            <TaskCard
              index={index}
              ref={provided.innerRef}
              provided={provided}
              item={tasksOrderedByDate[index]}
              columnTitle={column.title}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isDragging={snapshot.isDragging}
            />
          )}
        </Draggable>
      ))}
    </Content>
  )
}

const TaskCard = forwardRef(
  ({ item, columnTitle, isDragging, provided }, ref) => {
    const { id, title, description, finishAt, priority } = item
    const [modalOpen, setModalOpen] = useState(false)

    const handleDelete = async () => {
      try {
        const taskRemoved = await api.delete(`/api/tasks/${id}`)

        if (taskRemoved) {
          toast.success('Tarefa deletada com sucesso!')
          window.location.reload()
        }
      } catch (err) {
        toast.error('Erro ao deletar tarefa: \n', err)
      }
    }

    return (
      <div
        key={id}
        ref={ref}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={provided.draggableProps.style}
        className={`${isDragging ? 'opacity-50' : ''}`}
      >
        <div>
          {modalOpen ? (
            <EditTaskForm
              data={item}
              isOpen={modalOpen}
              setModalOpen={setModalOpen}
              columnTitle={columnTitle}
            />
          ) : (
            <Card columnTitle={columnTitle}>
              {/* Header */}
              <div className='flex flex-row items-center justify-between whitespace-nowrap text-sm'>
                <div className='max-w-[30px] overflow-x-auto overflow-y-hidden'>
                  {title ? title : 'Sem título'}
                </div>
                <Dropdown vertical={'end'}>
                  <Button color='ghost' shape='circle'>
                    <img src={IconMenu} width={'20px'} height={'20px'} />
                  </Button>
                  <Dropdown.Menu className='w-36'>
                    <Dropdown.Item onClick={() => setModalOpen(true)}>
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleDelete}>Apagar</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* Content */}
              <div className='justify-left my-1 flex flex-row items-center text-xs'>
                <AiFillClockCircle size={20} className='mr-2' />
                {finishAt ? formatDateTime(finishAt) : 'Sem data'}
              </div>
              <div className='mt-4 flex flex-row items-center justify-between overflow-y-auto whitespace-nowrap text-xs'>
                <div className='max-w-[30px] overflow-x-auto overflow-y-hidden'>
                  {description ? description : 'Sem descrição'}
                </div>
                {priority === 'none' ? null : (
                  <PriorityLabel priority={priority} />
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    )
  }
)

const AddTaskButton = () => {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <>
      {showAddForm ? (
        <AddTaskForm setShowAddForm={setShowAddForm} />
      ) : (
        <button
          className='bg-black200 w-[370px] cursor-pointer rounded-md py-3 text-center'
          onClick={() => setShowAddForm(true)}
        >
          Adicionar tarefa
        </button>
      )}
    </>
  )
}

const Kanban = () => {
  const [tasks, setTasks] = useState([{}]) // tarefas recebidas via api (array)
  const [items, setItems] = useState([]) // tarefas estruturadas para o kanban (array)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await api.post('/api/tasks/userTasks')
      const { data } = res
      if (data) {
        setTasks(data)
        setLoading(false)
      }

      if (data.length === 0) {
        toast.info('Você não tem tarefas cadastradas')
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      const structuredData = [
        {
          id: generateShortUniqueId(),
          title: 'A fazer',
          tasks: tasks.filter((task) => task.status === 'pending'),
        },
        {
          id: generateShortUniqueId(),
          title: 'Em andamento',
          tasks: tasks.filter((task) => task.status === 'inProgress'),
        },
        {
          id: generateShortUniqueId(),
          title: 'Concluído',
          tasks: tasks.filter((task) => task.status === 'done'),
        },
      ]

      setItems(structuredData)
    }
  }, [tasks])

  const onDragEnd = (result) => {
    try {
      if (!result.destination) return
      const { source, destination } = result

      if (source.droppableId !== destination.droppableId) {
        const sourceColIndex = items.findIndex(
          (e) => e.id === source.droppableId
        )
        const destinationColIndex = items.findIndex(
          (e) => e.id === destination.droppableId
        )

        const sourceCol = items[sourceColIndex]
        const destinationCol = items[destinationColIndex]

        const sourceTask = [...sourceCol.tasks]
        const destinationTask = [...destinationCol.tasks]

        const [removed] = sourceTask.splice(source.index, 1)
        destinationTask.splice(destination.index, 0, removed)

        items[sourceColIndex].tasks = sourceTask
        items[destinationColIndex].tasks = destinationTask

        const updatedTask = {
          ...removed,
          status:
            destinationCol.title === 'A fazer'
              ? 'pending'
              : destinationCol.title === 'Em andamento'
              ? 'inProgress'
              : 'done',
        }

        const movedTask = api.put(`/api/tasks/${updatedTask.id}`, updatedTask)

        if (movedTask) {
          window.location.reload()
        }

        setItems([...items])
      }
    } catch (error) {
      toast.error('Erro ao atualizar tarefa!')
    }
  }

  return (
    <div className='flex flex-row items-center justify-center'>
      {loading ? (
        <div className='flex flex-col items-center justify-center'>
          <VscLoading size={50} className='animate-spin' />
          <h1 className='text-lg'>Carregando...</h1>
        </div>
      ) : (
        <>
          <KanbanBoard items={items} onDragEnd={onDragEnd} />
        </>
      )}
    </div>
  )
}

export default Kanban
