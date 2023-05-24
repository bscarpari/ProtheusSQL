import api from '../api'
import { v4 as uid } from 'uuid'
import { toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'

export const goBack = () => window.history.back()


/* Generate functions 
  - generateRandomDate: generate a random date between 2022 and now
  - generateShortUniqueId: generate a short unique id with uuid
  - generateUniqueId: generate a unique id with uuid
*/
export const generateShortUniqueId = () => {
  const id = uid()
  return id.slice(0, 8)
}

export const generateUniqueId = () => {
  return uid()
}


/* 
  Format/translate functions
  - formatRole: format a role to a string in portuguese (PT-BR)
  - formatCurrency: format a number to a currency
  - formatDateTime: format a date to a string
  - formatTimestamp: format a timestamp to a string
  - calculatePublicationTime: calculate the time between now and a timestamp
  - translateCategory: translate a category to a string
*/
export const formatRole = (value) => {
  const roleTranslations = {
    learner: 'aprendiz',
    voluntary: 'voluntário',
    admin: 'administrador',
  }

  return roleTranslations[value] || value
}

export const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const formatDateTime = (date, options = {
  country: 'pt-BR',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}) => {

  return new Date(date).toLocaleString(options.country, options)
}

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  const options = {
    country: 'pt-BR',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    seconds: '2-digit',
  }

  return date.toLocaleString(options.country, options)
}

export const translateCategory = (category) => {
  const categories = {
    general: 'Geral',
    problems: 'Problemas',
    suggestions: 'Sugestões',
  }

  return categories[category]
}

/* 
  Calculate/Verify functions
  - calculatePublicationTime: calculate the time between now and a timestamp with PT-BR nomenclature
  - calculatePercentageCorrectTime: calculate the percentage of correct answers in relation to the time spent answering
  - verifyEditPermission: verify if the user has permission to edit a post
*/
export const calculatePublicationTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()

  const diff = now.getTime() - date.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (seconds < 60) {
    return `${seconds} segundos atrás`
  }

  if (minutes < 60) {
    if (minutes === 1) return `${minutes} minuto atrás`
    return `${minutes} minutos atrás`
  }

  if (hours < 24) {
    if (hours === 1) return `${hours} hora atrás`
    return `${hours} horas atrás`
  }

  if (days < 30) {
    if (days === 1) return `${days} dia atrás`
    return `${days} dias atrás`
  }

  if (months < 12) {
    if (months === 1) return `${months} mês atrás`
    return `${months} meses atrás`
  }

  if (years === 1) return `${years} ano atrás`
  return `${years} anos atrás`
}

export const calculatePercentageCorrect = (numQuestions, numCorrect) => {
  // Calcula a proporção de perguntas corretas
  let proportionCorrect = numCorrect / numQuestions;

  // Calcula a porcentagem de acerto
  let percentageCorrect = proportionCorrect * 100;

  // Retorna a porcentagem de acerto
  return percentageCorrect;
}

export const calculateAttemptsPercentage = (attempts, correct) => {
  if (attempts === 0) {
    return 0;
  }

  const percentage = (correct / attempts) * 100;
  return Math.round(percentage);
};

export const calculatePercentageCorrectTime = (numQuestions, numCorrect, totalTime = 86400000, timeToCorrect = 86400000) => {
  // Calcula a proporção de perguntas corretas
  let proportionCorrect = numCorrect / numQuestions;

  // Calcula a proporção de tempo gasto respondendo as perguntas corretamente
  let proportionTimeCorrect = timeToCorrect / totalTime; // por padrão é 24 horas (86400000 milissegundos) o tempo para responder as perguntas corretamente

  // Calcula a porcentagem de acerto em relação ao tempo
  let percentageCorrectTime = (proportionCorrect * proportionTimeCorrect) * 100;

  // Retorna a porcentagem de acerto em relação ao tempo
  return percentageCorrectTime;
}

export const verifyEditPermission = (value) => {
  const token = localStorage.getItem('token')
  if (!token) return false

  const { id, role } = jwtDecode(token)

  if (id === value.id || role === 'admin' || role === 'voluntary') return true
}

/*
  Fetch functions
  - fetchUserData: request user data from the server
  - fetchTasks: request user tasks from the server
*/
export const fetchUserData = async () => {
  const { data } = await api.post('api/users/profile')

  if (!data) return toast.error('Não foi possível carregar os dados do usuário')

  return data
}

export const fetchTasks = async () => {
  const { data } = await api.post('api/tasks')

  if (!data) return toast.error('Não foi possível carregar as tarefas')

  return data
}

export const fetchForum = async () => {
  const { data } = await api.get('api/forum')

  if (!data) return toast.error('Não foi possível carregar o fórum')

  return data
}