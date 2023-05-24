import { generateRandomDate, generateShortUniqueId } from '../../../../utils'

const tasksData = [
  {
    id: generateShortUniqueId(),
    title: 'A fazer',
    tasks: [
      {
        id: generateShortUniqueId(),
        title: 'Learn JavaScript',
        description: 'Exemplo de descrição 1',
        priority: '',
        createdAt: generateRandomDate(),
        finishedAt: generateRandomDate(),
      },
      {
        id: generateShortUniqueId(),
        title: 'Learn Git',
        description: 'Exemplo de descrição 2',
        priority: 'medium',
        createdAt: generateRandomDate(),
        finishedAt: generateRandomDate(),
      },
      {
        id: generateShortUniqueId(),
        title: 'Learn Python',
        description: 'Exemplo de descrição 3',
        priority: 'low',
        createdAt: generateRandomDate(),
        finishedAt: generateRandomDate(),
      },
    ],
  },
  {
    id: generateShortUniqueId(),
    title: 'Em andamento',
    tasks: [
      {
        id: generateShortUniqueId(),
        title: 'Learn CSS',
        description: 'Exemplo de descrição 4',
        priority: 'high',
        createdAt: generateRandomDate(),
        finishedAt: generateRandomDate(),
      },
      {
        id: generateShortUniqueId(),
        title: 'Learn Golang',
        description: 'Exemplo de descrição 5',
        priority: 'low',
        createdAt: generateRandomDate(),
        finishedAt: generateRandomDate(),
      },
    ],
  },
  {
    id: generateShortUniqueId(),
    title: 'Concluído',
    tasks: [
      {
        id: generateShortUniqueId(),
        title: 'Learn HTML',
        description: '',
        priority: 'medium',
        createdAt: generateRandomDate(),
        finishedAt: generateRandomDate(),
      },
    ],
  },
]

export default tasksData
