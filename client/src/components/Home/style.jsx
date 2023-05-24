import tw from 'tailwind-styled-components'

export const Center = tw.div`
  h-full
  relative
  overflow-hidden
`

export const HomeDiv = tw.div`
  relative
  z-10
  pb-12
  p-6
  sm:pb-16
  md:pb-20
  lg:w-full
  lg:max-w-2xl
  xl:text-6xl
`

export const HomeMain = tw.main`
  my-auto
  mx-auto
  mt-10
  max-w-7xl
  px-4
  sm:mt-12
  sm:px-6
  md:mt-16
  lg:mt-20
  lg:px-8
  xl:mt-28
`

export const TextWrapper = tw.div`
  sm:text-center
  lg:text-left
`

export const Title = tw.h1`
  text-4xl
  font-bold
  tracking-tight
  text-white
  sm:text-5xl
  md:text-6xl
`

export const Span = tw.span`
  block
  xl:inline
`

export const Highlight = tw.span`
  block
  text-primary
  xl:inline
`

export const Paragraph = tw.p`
  mt-3 text-base
text-white
  sm:mx-auto
  sm:mt-5
  sm:max-w-xl
  sm:text-lg
  md:mt-5
  md:text-xl
  lg:mx-0
`

export const Button = tw.div`
  mt-5
  sm:mt-8
  sm:flex
  sm:justify-center
  lg:justify-start
`

export const AnchorStyle = `
  flex 
  w-64
  items-center
  justify-center
  rounded-md
  border
  border-transparent
  bg-indigo-600
  px-8
  py-3
  text-base
  font-medium
  text-white
  hover:bg-indigo-700
  md:py-4
  md:px-10
  md:text-lg
  bg-primary
  border-none
`
