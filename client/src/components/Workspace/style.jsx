import tw from 'tailwind-styled-components'

/* ==== Horizontal Menu ===== */
export const MenuHorizontal = tw.div`
  flex
  w-screen
  justify-between
  items-center
  p-6
bg-black100
`

export const ButtonsContainer = tw.div`
  flex
  mr-3
`

/* ============================== */

/* =====    VERTICAL MENU  ===== */
export const Sidebar = `
  w-[70px]
  h-full
  transform 
  ease-in-out
  transition
  duration-500
  flex
  flex-col
  items-center
  justify-between
  bg-black100
  flex-col
  pb-8
`

export const SubSidebar = tw.div`
  resize-x
  overflow-x-auto
  overscroll-x-contain
  whitespace-nowrap
  text-white
  w-[25vw]
  max-w-[50vw]
  min-w-[190px]
  h-full
  text-sm
  z-1
  bg-black100
`

export const SidebarWrapper = tw.div`
  w-full
  h-full
  flex-col
  items-center
  justify-items-center
`

export const SubMenuWrapper = tw.div`
  w-full
  h-full
  text-white
`

export const Title = tw.div`
  mb-2
  indent-5
  font-light
  text-xs
`
/* ============================== */

/* =====  CODE CONTAINERS ===== */
export const PdfContainer = tw.div`
  w-full
  h-full
  box-content
  bg-black100
  text-sm
  flex
  flex-col
`

export const SyntaxContainer = tw.div`
  h-full
  overflow-auto
  w-full
`
/* ============================== */
