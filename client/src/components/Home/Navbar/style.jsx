import tw from 'tailwind-styled-components'

export const Navbar = tw.div`
  mx-auto
  w-full
  px-2
  md:px-6
  lg:px-8
`

export const Wrapper = tw.div`
  relative 
  h-16 
  flex 
  items-center 
  justify-between
`

export const MobileBtn = tw.div`
  inset-y-0 
  left-0
  flex 
  items-center
  md:hidden
`

export const LogoContainer = tw.div`
  flex
  flex-shrink-0
  items-center
`

export const DesktopLinks = tw.div`
  hidden
  items-center
  md:ml-6
  md:flex
`

export const AuthButtons = tw.div`
  flex 
  relative 
  items-center
`

export const NavbarMobile = tw.div`
  space-y-1
  px-2
  pt-2
  pb-3
  text-white
  md:hidden
`

export const Anchor = `
  hidden 
  sm:flex 
  px-3 
  py-2 
  text-white 
  hover:text-primary 
  text-base 
  font-medium
`
