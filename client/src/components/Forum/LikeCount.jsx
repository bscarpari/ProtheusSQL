import React, { useState, useEffect } from 'react'

import { toast } from 'react-toastify'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import api from '../../api'
import jwtDecode from 'jwt-decode'

const LikeCount = ({ post, flex = 'flex-col', styles }) => {
  const [likes, setLikes] = useState(post.likes)
  const [liked, setLiked] = useState(false)
  const [userId, setUserId] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      const token = localStorage.getItem('token')
      const { id } = jwtDecode(token)
      setUserId(id)
    }
  }, [])

  useEffect(() => {
    if (userId && post.likedBy)
      post.likedBy.includes(userId) ? setLiked(true) : setLiked(false)
  }, [post.likedBy, userId])

  const handleLike = async () => {
    if (userId === post.userId) {
      toast.info('Você não pode dar like em seu próprio post')
      return setLiked(false)
    }

    if (post.status === 'canceled') return toast.info('Este post foi cancelado')

    if (post.likedBy.includes(userId) && liked) {
      const index = post.likedBy.indexOf(userId)
      post.likedBy.splice(index, 1)
      setLiked(false)
    } else {
      post.likedBy.push(userId)
      setLiked(true)
    }

    const updatedLikes = !liked ? likes + 1 : likes - 1
    setLikes(updatedLikes)

    const res = await api.put(`/api/forum/${post.id}`, {
      ...post,
      likes: updatedLikes,
    })

    if (res.status === 200) toast.success('Post atualizado com sucesso')
  }

  return (
    <button
      className={`${styles} rounded-lg border px-2 text-xs sm:text-sm`}
      onClick={handleLike}
    >
      <div
        className={`${flex} flex items-center justify-center rounded-lg py-2 px-2`}
      >
        {liked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
        <span className='mx-1 text-lg'>{likes ? likes : 0}</span>
      </div>
    </button>
  )
}

export default LikeCount
