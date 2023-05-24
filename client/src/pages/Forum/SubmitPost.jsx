import React from 'react'

import api from '../../api'
import jwtDecode from 'jwt-decode'
import RulesAccordion from '../../components/Forum/RulesAccordion'
import SimpleNavbar from '../../components/Utils/Navbar'

import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { toast } from 'react-toastify'

const SubmitPost = () => {
  const token = localStorage.getItem('token')
  const { id, username, role } = jwtDecode(token)

  const [form, setForm] = React.useState({
    title: '',
    description: '',
    category: 'general',
  })

  console.log(form)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await api.post('/api/forum/new_post', {
      username: username,
      userId: id,
      role: role,
      title: form.title,
      description: form.description,
      category: form.category,
    })

    if (!res) return toast.error('Erro ao criar post')

    window.location.href = `/forum/${form.category}/${res.data.id}`
    toast.success('Post criado com sucesso')
  }

  return (
    <div>
      <SimpleNavbar />
      <div className='pb-12'>
        <div className='container mx-auto mt-8 px-8 sm:px-0'>
          <div className='my-4 flex flex-col py-4'>
            <Link to='/forum' className='flex flex-row items-center'>
              <AiFillHome
                className='my-4 mr-2 inline-block text-2xl'
                size={20}
              />
              Voltar
            </Link>
            <span className='text-2xl font-bold'>Criar uma nova pergunta</span>
          </div>

          <div className='my-4 flex flex-col py-4'>
            <RulesAccordion />
          </div>

          <form
            className='flex flex-col items-center justify-between md:flex-row md:justify-center'
            onSubmit={handleSubmit}
            method='POST'
          >
            <div className='my-4 w-full md:w-1/2'>
              <label
                className='mb-2 block text-xl font-bold text-gray-700'
                htmlFor='title'
              >
                Título
              </label>
              <span className='mb-2 text-sm text-gray-500'>
                Seja específico e imagine que você está fazendo esta pergunta
                diretamente para alguém
              </span>
              <input
                className='focus:border-primary focus:ring-primary focus:shadow-outline bg-black100 my-2 w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow-md'
                id='title'
                name='title'
                type='text'
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder='Título da pergunta'
              />
            </div>
            <div className='my-4 w-full md:w-1/2'>
              <label
                className='mb-2 block text-xl font-bold text-gray-700'
                htmlFor='description'
              >
                Corpo
              </label>
              <span className='mb-2 text-sm text-gray-500'>
                Inclua todos os detalhes que você acha que são relevantes e que
                ajudem a responder sua pergunta
              </span>
              <textarea
                className='focus:border-primary focus:ring-primary focus:shadow-outline bg-black100 my-2 w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow-md'
                style={{
                  minHeight: '200px',
                  maxHeight: '600px',
                }}
                id='description'
                name='description'
                rows='4'
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                placeholder='Detalhe sua pergunta aqui...'
              ></textarea>
            </div>
            <div className='flex w-full flex-col items-center justify-between md:flex-row md:justify-center'>
              <div className='my-4 w-full md:w-1/2'>
                <label
                  className='mb-2 block text-xl font-bold text-gray-700'
                  htmlFor='category'
                >
                  Categoria
                </label>
                <span className='mb-2  text-sm text-gray-500'>
                  Escolha a categoria que melhor se encaixa com a sua dúvida
                </span>
                <select
                  className='focus:border-primary focus:ring-primary focus:shadow-outline bg-black100 my-2 w-full appearance-none rounded border py-3 px-3 leading-tight text-gray-700 shadow-md'
                  id='category'
                  name='category'
                  value={form.category}
                  required
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value='general'>Geral</option>
                  <option value='suggestions'>Sugestões</option>
                  <option value='problems'>Problemas</option>
                </select>
              </div>
            </div>
            <div className='w-full md:w-1/2'>
              <button className='btn btn-primary w-64' type='submit'>
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubmitPost
