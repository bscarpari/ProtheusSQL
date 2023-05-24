import React, { useState, useEffect } from 'react'

import PostCard from '../../components/Forum/PostCard'
import SimpleNavbar from '../../components/Utils/Navbar'

import {
  calculatePublicationTime,
  fetchForum,
  translateCategory,
} from '../../utils'
import { Link } from 'react-router-dom'

import { IoIosChatbubbles } from 'react-icons/io'
import { AiFillPushpin } from 'react-icons/ai'
import { VscAdd, VscLoading } from 'react-icons/vsc'

const Forum = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchForum().then((data) => {
      console.log(data)
      setPosts(data)
      setLoading(false)
    })
  }, [])

  const categories = {
    general: 'Geral',
    problems: 'Problemas',
    suggestions: 'Sugestões',
  }

  // Ordenar os posts por likes
  posts.sort((a, b) => b.likes - a.likes)

  return (
    <>
      {loading ? (
        <div className='flex h-screen items-center justify-center'>
          <VscLoading className='animate-spin' size={100} />
        </div>
      ) : (
        <div>
          <SimpleNavbar forum={true} />
          <div className='py-6'>
            <div className='container mx-auto w-full px-4 sm:px-8'>
              <div className='mt-8 flex flex-row items-center justify-between'>
                <h1 className='text-3xl'>Fórum</h1>
                <Link to='/forum/submit' className='btn btn-primary text-xs'>
                  Adicionar post
                  <VscAdd className='ml-2 inline-block' size={20} />
                </Link>
              </div>
              <RulesCard />
              <div className='mb-8 flex flex-col' id='recents'>
                <Link
                  className='mt-8 flex flex-row items-center text-2xl'
                  to='/forum/#recents'
                >
                  <AiFillPushpin size={20} className='mr-2' />
                  Tópicos Recentes
                </Link>
                <span>Veja os tópicos mais recentes</span>

                <div className='flex max-h-32 w-full flex-col items-center justify-center overflow-y-auto overflow-x-hidden'>
                  {Object.keys(categories).map((category, index) => (
                    <CategoryCard
                      data={posts}
                      category={category}
                      key={index}
                    />
                  ))}
                </div>
              </div>

              <div className='border-b' />

              <div className='flex flex-col' id='relevants'>
                <div className='mt-8 flex flex-row justify-between'>
                  <Link
                    className='flex cursor-pointer items-center whitespace-nowrap text-2xl'
                    to='/forum/#relevants'
                  >
                    <AiFillPushpin size={20} className='mr-2' />
                    Posts relevantes
                  </Link>
                </div>
                <span>
                  Veja os posts mais relevantes, de acordo com a quantidade de
                  likes
                </span>
                <div
                  className='overflow-y-auto overflow-x-hidden'
                  style={{
                    maxHeight: '24rem',
                  }}
                >
                  {
                    <div
                      className='flex w-full flex-col items-center justify-center'
                      style={{
                        paddingRight: '10px',
                      }}
                    >
                      {posts.map((post, index) => (
                        <PostCard post={post} key={index} />
                      ))}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const CategoryCard = ({ data, category }) => {
  const filteredPosts = data.filter((post) => post.category === category)

  const getRepliesCount = () => {
    if (filteredPosts.length === 0) return 'Nenhum post'
    return filteredPosts.length > 1 ? `${filteredPosts.length} posts` : '1 post'
  }

  const getLastPostTime = () => {
    const lastPost = filteredPosts[filteredPosts.length - 1]

    if (!lastPost) return 'Nenhum'

    const publishedTime = calculatePublicationTime(lastPost.createdAt) || ''
    return publishedTime
  }

  return (
    <div className='bg-black200 mx-4 mt-8 flex w-full flex-row items-center rounded-lg py-4 px-4'>
      <IoIosChatbubbles size={40} className='mr-2 hidden sm:block' />
      <div className='flex w-full flex-row items-center justify-between whitespace-nowrap'>
        <div className='flex flex-col sm:w-fit'>
          <h1 className='text-md sm:text-lg'>
            <Link to={`/forum/${category}`}>
              {translateCategory(category)
                ? translateCategory(category)
                : 'Geral'}
            </Link>
          </h1>
          <span className='text-xs sm:text-sm'>{getRepliesCount()}</span>
        </div>
        <div className='flex flex-col px-8'>
          <span className='sm:text-md text-sm font-bold'>Último post</span>
          <span className='w-full text-xs sm:text-sm'>{getLastPostTime()}</span>
        </div>
      </div>
    </div>
  )
}

const RulesCard = () => {
  return (
    <div className='bg-black200 mt-8 flex flex-col rounded-lg py-4 px-4'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col'>
          <h1 className='my-4 text-xl font-medium'>Regras do fórum</h1>
          <span className='sm:text-md text-sm'>
            <ul className='mb-2'>
              <li className='mb-4'>
                <p>
                  1. Não postar conteúdo inapropriado, como pornografia,
                  racismo, etc
                </p>
              </li>
              <li className='mb-4'>
                2. Respeito aos outros usuários, não postar conteúdo ofensivo
              </li>
              <li className='mb-4'>
                3. Não postar conteúdo que não seja relacionado ao fórum
              </li>
            </ul>
            <Link to='/forum/rules' className='text-sm'>
              Ver mais
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Forum
