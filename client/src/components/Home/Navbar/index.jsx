import { useState } from 'react'
import { Button } from 'react-daisyui'
import { VscMenu } from 'react-icons/vsc'
import { HiXMark } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import {
  AuthButtons,
  DesktopLinks,
  LogoContainer,
  MobileBtn,
  NavbarMobile,
  Navbar,
  Wrapper,
} from './style'

const navigation = [
  { name: 'Início', href: '/', current: true },
  { name: 'Sobre', href: '#about', current: false },
  { name: 'Contatos', href: '#contatos', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const HomeNavbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Navbar>
        <Wrapper>
          <MobileBtn>
            <Button
              size={'sm'}
              onClick={() => {
                setOpen(!open)
              }}
            >
              {open ? <HiXMark size={18} /> : <VscMenu size={18} />}
            </Button>
          </MobileBtn>

          <LogoContainer>
            <Link to='/'>
              <img src='/src/assets/icons/logotipo.svg' alt='logo protheus' />
            </Link>
          </LogoContainer>

          <DesktopLinks>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'text-primary border-primary border-b-2'
                    : 'hover:text-primary text-white',
                  'px-3 py-2 text-sm font-medium'
                )}
              >
                {item.name}
              </a>
            ))}
          </DesktopLinks>

          <AuthButtons>
            <a
              className='hover:text-primary focus:text-primary hidden rounded p-3 px-8 text-xs font-bold   leading-3 text-white md:flex '
              href='/register'
            >
              Cadastro
            </a>
            <a
              className='hover:text-primary focus:border-primary focus:bg-primary rounded border-2 p-3 px-8 text-xs font-bold leading-3 text-white hover:border-white  hover:bg-white focus:text-white'
              href='/login'
            >
              Entrar
            </a>
          </AuthButtons>
        </Wrapper>
      </Navbar>

      {open ? (
        <NavbarMobile>
          {navigation.map((item) => (
            <div className='flex'>
              <Button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  textTransform: 'none',
                }}
                key={item.name}
                as='a'
                href={item.href}
                className={classNames(
                  item.current
                    ? 'text-primary'
                    : 'hover:text-primary text-white',
                  'flex flex-col px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </Button>
            </div>
          ))}
        </NavbarMobile>
      ) : null}
    </>
  )
}

export default HomeNavbar
