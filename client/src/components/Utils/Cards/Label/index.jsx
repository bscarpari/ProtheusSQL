export const PriorityLabel = ({ priority }) => {
  return (
    <>
      {priority === '' ? null : priority === 'low' ? (
        <span className='rounded-md bg-blue-500 py-1 px-3 text-sm font-bold text-white'>
          Relevante
        </span>
      ) : priority === 'medium' ? (
        <span className='rounded-md bg-orange-500 py-1 px-3 text-sm font-bold text-white'>
          Importante
        </span>
      ) : (
        <span className='rounded-md bg-red-500 py-1 px-3 text-sm font-bold text-white'>
          Urgente
        </span>
      )}
    </>
  )
}
