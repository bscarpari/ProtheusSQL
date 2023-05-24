import React, { useState, useEffect } from 'react'

import api from '../../api'
import SimpleNavbar from '../../components/Utils/Navbar'

import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { VscLoading } from 'react-icons/vsc'
import PostCard from '../../components/Forum/PostCard'
import { calculatePublicationTime, translateCategory } from '../../utils'

const ForumCategory = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const category = window.location.pathname.split('/')[2]

  const getPostsByCategory = async () => {
    const { data } = await api.get('/api/forum')

    if (!data) return toast.error('Erro ao carregar os posts')

    data.sort((a, b) => b.likes - a.likes)
    const postsByCategory = data.filter((post) => post.category === category)

    postsByCategory.forEach((post) => {
      post.category = translateCategory(post.category)
      post.publicationTime = calculatePublicationTime(post.createdAt)
    })

    setPosts(postsByCategory)
    setLoading(false)
  }

  useEffect(() => {
    getPostsByCategory()
  }, [])

  return (
    <div className='h-screen'>
      <SimpleNavbar />
      <div className='container mx-auto px-8'>
        <div className='mt-8 flex flex-row items-center py-6'>
          <Link to='/forum' className='mr-2'>
            <AiFillHome size={20} />
          </Link>
          <span>
            / <span className='font-bold'>{translateCategory(category)}</span>
          </span>
        </div>

        <span className='text-md mt-8 flex flex-row items-center'>
          Veja os tópicos mais recentes de&nbsp;
          <span className='font-bold'>{translateCategory(category)}</span>
        </span>

        <div className='my-4 border-b' />
        {/* Lista os cards dos posts de acordo com o gênero dos posts */}
        <div
          className='flex w-full flex-col items-center justify-start overflow-x-hidden overflow-y-scroll'
          style={{ height: 'calc(100vh - 300px)' }}
        >
          {loading ? (
            <div className='flex h-screen items-center justify-center'>
              <VscLoading className='animate-spin' size={100} />
            </div>
          ) : (
            <>
              {posts.length === 0 ? (
                <span className='text-md mt-8'>
                  Não há posts nessa categoria
                </span>
              ) : (
                posts.map((post, index) => <PostCard key={index} post={post} />)
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForumCategory
