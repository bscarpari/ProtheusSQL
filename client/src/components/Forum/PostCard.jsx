import { Link } from 'react-router-dom'
import { calculatePublicationTime, translateCategory } from '../../utils'

import StatusBadge from './StatusBadge'
import LikeCount from './LikeCount'

const PostCard = ({ post }) => {
  return (
    <div className='bg-black200 mt-8 flex w-full flex-col rounded-lg py-4 px-4'>
      <div className='flex flex-row items-center justify-between'>
        <LikeCount post={post} styles='mr-2' />
        <div className='ml-2 flex w-full flex-col'>
          <h1 className='text-md lg:text-x overflow-y-auto sm:text-xl md:text-lg'>
            <Link to={`/forum/${post.category}/${post.id}`}>{post.title}</Link>
          </h1>
          <span className='max-h-12 overflow-y-auto whitespace-nowrap text-sm'>
            <StatusBadge status={post.status} />
          </span>
        </div>
        <div className='hidden w-36 flex-col whitespace-nowrap py-3 px-4 text-sm sm:flex'>
          <span className='font-bold'>
            <Link to={`/forum/${post.category}/${post.id}`}>
              {translateCategory(post.category)
                ? translateCategory(post.category)
                : post.category}
            </Link>
          </span>
          <span>{calculatePublicationTime(post.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default PostCard
