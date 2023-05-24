import { useState } from 'react'

import PdfViewer from './PdfViewer'
import CodeEditor from './CodeEditor'
import Tree from './TreeView/'
import AvatarDropdown from '../daisyui/dropdown'

import { Button, Collapse } from 'react-daisyui'
import {
  VscFiles,
  VscBug,
  VscChevronRight,
  VscChevronDown,
} from 'react-icons/vsc'
import { RiDashboardFill } from 'react-icons/ri'
import { BsCalendarCheck, BsCardImage, BsImages } from 'react-icons/bs'
import {
  TbLayoutBottombar,
  TbLayoutSidebar,
  TbLayoutSidebarRight,
} from 'react-icons/tb'

import {
  MenuHorizontal,
  Sidebar,
  SubSidebar,
  SidebarWrapper,
  ButtonsContainer,
  SubMenuWrapper,
  Title,
  PdfContainer,
  SyntaxContainer,
} from './style'
import { fetchUserFiles, fetchUserSchema } from './TreeView/data'
import { useEffect } from 'react'
import UploadComponent from './Upload'

export const Logo = () => {
  return (
    <Button href='/workspace' style={{ marginLeft: '-20px' }}>
      <img src='/src/assets/icons/logo.svg' alt='logo Protheus' />
    </Button>
  )
}

export const HorizontalMenu = ({ children }) => {
  return (
    <>
      <MenuHorizontal>{children}</MenuHorizontal>
    </>
  )
}

export const VerticalMenu = ({ open, children }) => {
  return (
    <div
      className={
        `${open ? 'translate-x-0' : 'hidden -translate-x-full'} ` + Sidebar
      }
    >
      {children}
      <AvatarDropdown />
    </div>
  )
}

export const ToggleScreens = ({ handle }) => {
  const { sections, toggleSection } = handle

  return (
    <ButtonsContainer>
      <TbLayoutSidebar
        size={25}
        onClick={() => toggleSection('verticalMenu')}
        className={`${sections.verticalMenu ? 'text-white' : 'text-gray'}`}
        style={{ cursor: 'pointer' }}
      />
      <TbLayoutBottombar
        size={25}
        onClick={() => toggleSection('console')}
        className={`${sections.console ? 'text-white' : 'text-gray'}`}
        style={{ cursor: 'pointer' }}
      />
      <TbLayoutSidebarRight
        size={25}
        onClick={() => toggleSection('pdfReader')}
        className={`${sections.pdfReader ? 'text-white' : 'text-gray'}`}
        style={{ cursor: 'pointer' }}
      />
    </ButtonsContainer>
  )
}

export const ToggleSubMenus = ({ handle }) => {
  const { explorerMenu, setExplorerMenu } = handle

  return (
    <SidebarWrapper>
      <Button
        onClick={() => {
          setExplorerMenu(!explorerMenu)
        }}
        className={`${explorerMenu ? 'text-primary' : 'text-white'}`}
      >
        <VscFiles size={20} />
      </Button>

      <Button href='/dashboard'>
        <RiDashboardFill size={20} />
      </Button>

      <Button href='/schedule'>
        <BsCalendarCheck size={20} />
      </Button>

      <Button href='/forum'>
        <VscBug size={20} />
      </Button>
    </SidebarWrapper>
  )
}

export const ExplorerMenu = ({ open, isVerticalHidden }) => {
  const [files, setFiles] = useState([])
  const [schema, setSchema] = useState([])
  const [fileCollapse, setFileCollapse] = useState(false)
  const [schemaCollapse, setSchemaCollapse] = useState(false)

  useEffect(() => {
    fetchUserSchema().then((data) => {
      setSchema(data)
      console.log('schema', schema)
    })
  }, [])

  const handleFile = () => {
    setFileCollapse(!fileCollapse)
  }

  const handleSchema = () => {
    setSchemaCollapse(!schemaCollapse)
  }

  return (
    <SubSidebar
      className={`${
        open && !isVerticalHidden ? 'transition: flex' : 'transition: hidden'
      } `}
    >
      <SubMenuWrapper>
        <Title>
          <h1>EXPLORADOR</h1>
        </Title>

        <div className='flex max-h-[50vh] cursor-pointer flex-col py-2 transition-all'>
          <div
            onClick={handleSchema}
            className='justify-left flex w-full flex-row py-2 px-4 text-sm'
          >
            {schemaCollapse ? (
              <VscChevronDown size={20} />
            ) : (
              <VscChevronRight size={20} />
            )}
            <span className='text-md'>Banco de dados</span>
          </div>
          {schemaCollapse ? (
            <div className='my-2 px-4'>
              <Tree data={schema} type='database' />
            </div>
          ) : null}
        </div>
      </SubMenuWrapper>
    </SubSidebar>
  )
}

// Futuramente implementar a pesquisa
// export const SearchMenu = ({ open, isVerticalHidden }) => {
//   return (
//     <SubSidebar
//       className={`${
//         open && !isVerticalHidden ? 'transition: flex' : 'transition: hidden'
//       } `}
//     >
//       <SubMenuWrapper>
//         <Title>
//           <h1>PESQUISAR</h1>
//         </Title>
//         <div className='w-full flex ml-2 mt-4 items-center justify-start gap-2 font-sans '>
//           <Input
//             placeholder='Digite sua pesquisa aqui'
//             style={{ width: '90%' }}
//           />
//         </div>
//       </SubMenuWrapper>
//     </SubSidebar>
//   )
// }

export const DropdownSidebar = () => {
  return (
    <>
      <ExplorerMenu />
    </>
  )
}

export const PdfViewerContainer = () => {
  return (
    <PdfContainer>
      <PdfViewer />
    </PdfContainer>
  )
}

export const SyntaxEditor = ({ terminal }) => {
  return (
    <SyntaxContainer>
      <CodeEditor terminal={terminal} />
    </SyntaxContainer>
  )
}
