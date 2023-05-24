import React, { useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { AiFillHome } from 'react-icons/ai'

const Breadcrumbs = () => {
  const [pages, setPages] = React.useState([])
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.split('/')
    const pages = path.map((page) => {
      return {
        name: page,
        href: `/${page}`,
        current: false,
      }
    })
    pages[pages.length - 1].current = true
    setPages(pages)
  }, [pathname])

  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol role='list' className='flex items-center space-x-4'>
        <li>
          <div>
            <Link to='/forum' className='text-gray-400 hover:text-gray-500'>
              <AiFillHome size={20} aria-hidden='true' />
              <span className='sr-only'>Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <>
            <li key={page.name}>
              <div className='flex items-center'>
                <a
                  href={page.href}
                  className='text-sm font-medium text-gray-500 hover:text-gray-700'
                  aria-current={page.current ? 'page' : undefined}
                >
                  {page.name}
                  &nbsp; &nbsp;
                  <span className=''>/</span>
                </a>
              </div>
            </li>
          </>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
