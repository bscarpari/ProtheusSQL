import React, { useEffect, useState } from 'react'

import api from '../../api'
import SimpleNavbar from '../../components/Utils/Navbar'
import StatusBadge from '../../components/Forum/StatusBadge'
import LikeCount from '../../components/Forum/LikeCount'
import SubmitComment from './SubmitComment'
import ReplyCard from '../../components/Forum/ReplyCard'

import { Link } from 'react-router-dom'
import { calculatePublicationTime, verifyEditPermission } from '../../utils'
import { AiFillHome, AiFillHeart } from 'react-icons/ai'
import { VscCommentDiscussion, VscEdit, VscLoading } from 'react-icons/vsc'
import { SlOptions } from 'react-icons/sl'
import { Dropdown } from 'react-daisyui'
import { MdBlock, MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import RoleBadge from '../../components/Forum/RoleBadge'

const ForumPost = () => {
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)
  const postId = window.location.pathname.split('/')[3]

  const [editMode, setEditMode] = useState(false)
  const [replyMode, setReplyMode] = useState(false)

  const fetchPost = async () => {
    const { data } = await api.get(`/api/forum/${postId}`)

    if (!data) return toast.error('Post não encontrado')

    return data
  }

  useEffect(() => {
    fetchPost().then((data) => {
      setPost(data)
      setLoading(false)
    })
  }, [])

  const handleEdit = async () => {
    try {
      const { title, description } = post

      console.log(title, description)

      if (!verifyEditPermission(post))
        return toast.error('Você não tem permissão para editar este post')

      const res = await api.put(`/api/forum/${postId}`, {
        title,
        description,
      })

      if (!res.data) return toast.error('Erro ao editar post')
      if (res.data.title === title && res.data.description === description)
        return setEditMode(!editMode)

      if (res.status === 200) toast.success('Post editado com sucesso')
      setEditMode(!editMode)
    } catch (error) {
      toast.error('Erro ao editar post')
      console.log(error)
    }
  }

  const handleDelete = async () => {
    if (!verifyEditPermission(post))
      return toast.error('Você não tem permissão para excluir este post')

    if (!confirm('Tem certeza que deseja excluir este post?')) return

    const res = await api.delete(`/api/forum/${postId}`)

    if (res.status === 200) toast.success('Post excluído com sucesso')
    window.location.href = '/forum'
  }

  // Ao editar, escuta o evento de tecla ESC para cancelar a edição
  useEffect(() => {
    if (editMode) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
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
    <>
      {loading ? (
        <div className='flex h-screen items-center justify-center'>
          <VscLoading className='animate-spin' size={100} />
        </div>
      ) : post.length === 0 ? (
        <div className='flex h-screen items-center justify-center'>
          <span className='text-2xl'>Nenhum post encontrado</span>
        </div>
      ) : (
        <div className='h-screen'>
          <SimpleNavbar />
          <div className='container mx-auto px-8'>
            <div className='mt-8 flex flex-row items-center'>
              <Link to='/forum' className='flex flex-row'>
                <AiFillHome size={20} />
                <p className='ml-2'>Voltar</p>
              </Link>
            </div>
            <div className='flex flex-col items-center rounded-lg py-6'>
              <div className='flex w-full flex-col justify-between border-b'>
                <span className='flex w-full flex-row items-center justify-between pt-4 text-2xl font-bold'>
                  {editMode ? (
                    <input
                      type='text'
                      className='border-primary focus:border-primary focus:ring-primary mx-2 w-full appearance-none break-words rounded-lg border-b bg-transparent text-base font-bold leading-tight'
                      style={{
                        marginLeft: '-0.75rem',
                      }}
                      value={post.title}
                      onChange={(e) =>
                        setPost({ ...post, title: e.target.value })
                      }
                    />
                  ) : (
                    <span className='text-base font-bold text-gray-500'>
                      {post.title}
                    </span>
                  )}

                  {verifyEditPermission(post) && (
                    <div className='my-32 text-xs'>
                      <Dropdown horizontal='left'>
                        <Dropdown.Toggle>
                          <SlOptions size={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='w-32'>
                          <Dropdown.Item onClick={handleEdit}>
                            <VscEdit size={20} className='mr-2' />
                            Editar
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleDelete}>
                            <MdDelete size={20} className='mr-2' />
                            Excluir
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </span>

                <div className='flex w-full flex-col items-center py-4 sm:justify-start'>
                  <span className='mb-2 w-full text-lg font-bold'>
                    Postado por:
                  </span>
                  <div className='flex w-full flex-row items-center'>
                    <span className='mr-2 text-sm text-gray-500'>
                      {post.username ? post.username : 'Anônimo'}
                    </span>
                    <RoleBadge role={post.role} />
                  </div>
                </div>
              </div>

              <div className='my-2 flex w-full flex-row items-center justify-between'>
                <span className='text-sm text-gray-500'>
                  <StatusBadge status={post.status} />
                </span>

                <span className='text-sm text-gray-500'>
                  Postado {calculatePublicationTime(post.createdAt)}
                </span>
              </div>

              <div className='ml-4 flex w-full flex-row items-center justify-between'>
                <span className='flex flex-row text-sm text-gray-500'>
                  <VscCommentDiscussion size={20} className='mr-2' />
                  {post.replies.length} comentários
                </span>
                <span className='flex flex-row text-sm text-gray-500'>
                  <AiFillHeart size={20} className='mr-2' />
                  {post.likes} curtidas
                </span>
              </div>

              <div className='min-h-16 bg-black100 mt-10 flex w-full flex-col overflow-y-auto overflow-x-hidden rounded-md py-4 px-4 text-justify'>
                <span className='text-sm text-gray-500'>
                  {editMode ? (
                    <textarea
                      className='border-primary focus:border-primary focus:ring-primary w-full appearance-none break-words rounded-lg border-b bg-transparent text-base leading-tight'
                      value={post.description}
                      onChange={(e) =>
                        setPost({ ...post, description: e.target.value })
                      }
                    />
                  ) : (
                    <span className='text-base font-medium text-gray-500'>
                      {post.description}
                    </span>
                  )}
                </span>
              </div>

              {post.status != 'canceled' ? (
                <>
                  {editMode ? (
                    <div className='w-full'>
                      <button
                        className='bg-primary my-4 rounded-lg py-2 px-6 font-medium text-white'
                        onClick={handleEdit}
                      >
                        Salvar
                      </button>
                    </div>
                  ) : (
                    <div className='my-4 flex w-full flex-row items-center justify-between'>
                      <button
                        className='bg-primary rounded-lg py-2 px-6 font-medium text-white'
                        onClick={() => {
                          setReplyMode(!replyMode)
                        }}
                      >
                        Responder
                      </button>

                      <LikeCount
                        post={post}
                        flex='flex-row'
                        styles='bg-primary border-none py-1'
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className='my-4 flex w-full flex-row items-center justify-between sm:flex-col'>
                  <button
                    className='bg-primary flex flex-row items-center rounded-lg py-2 px-6 font-medium text-white opacity-50'
                    disabled
                  >
                    Responder
                    <MdBlock size={20} className='ml-2' />
                  </button>
                  <span className='text-sm'>Comentários desativados</span>
                </div>
              )}

              {replyMode && <SubmitComment />}

              <div className='my-4 w-full border-b'></div>

              {/* Respostas presentes */}
              <div className='min-h-16 flex w-full flex-col overflow-y-auto overflow-x-hidden'>
                <h1 className='my-4 flex w-full flex-row items-center justify-between pt-4 text-2xl font-bold'>
                  Respostas
                </h1>
                <div
                  className='overflow-scroll overflow-y-auto overflow-x-hidden text-sm text-gray-500'
                  style={{
                    maxHeight: 'calc(100vh - 200px)',
                  }}
                >
                  {post.replies.length === 0 ? (
                    <span className='text-sm text-gray-500'>
                      Nenhum comentário encontrado
                    </span>
                  ) : (
                    <div className='mr-2'>
                      {post.replies.map((reply, index) => (
                        <ReplyCard reply={reply} key={index} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ForumPost
