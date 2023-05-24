import React, { useState } from 'react'
import { VscChevronRight } from 'react-icons/vsc'
import { generateShortUniqueId } from '../../../utils'
import { HiDatabase, HiFolder } from 'react-icons/hi'

const Tree = ({ data = [], type }) => {
  return (
    <div className='flex'>
      {data.length === 0 && (
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <div className='flex flex-row items-center justify-center text-sm text-white'>
            {type === 'database' && (
              <>
                <HiDatabase size={20} className='mr-2' />
                <span>Base de dados vazia</span>
              </>
            )}
          </div>
        </div>
      )}
      <ul className='flex flex-col'>
        {data.map((tree) => (
          <TreeNode node={tree} key={generateShortUniqueId()} />
        ))}
      </ul>
    </div>
  )
}

export default Tree

const TreeNode = ({ node }) => {
  const [childVisible, setChildVisiblity] = useState(false)

  const hasChild = node.children ? true : false

  return (
    <li className='cursor-pointer select-none px-6'>
      <div className='flex' onClick={() => setChildVisiblity((v) => !v)}>
        {hasChild && (
          <div className={`flex flex-row ${childVisible ? 'rotate-90' : ''}`}>
            <VscChevronRight size={20} />
          </div>
        )}

        {/* //TODO fazer com que exiba apenas ícone de pasta aberta/fechada para os arquivos corretos */}
        <div className='flex items-center'>
          <i className={`mr-1 ${node.icon}`} />
          {node.label}
          <div className='text-grayMain mx-3 flex !flex-row whitespace-nowrap'>
            {node.type || ''}
          </div>
        </div>
      </div>

      {hasChild && childVisible && (
        <ul className='my-1 flex w-full flex-col whitespace-nowrap'>
          <Tree data={node.children} />
        </ul>
      )}
    </li>
  )
}
