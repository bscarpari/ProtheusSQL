import tw from 'tailwind-styled-components'

export const Container = tw.div`
  grid
  place-items-center
  h-screen
  dark:bg-gray-900 
`

export const Center = tw.div`
  grid
  justify-items-center
`

export const Text = tw.h1`
  text-center
  text-xl
  md:text-4xl
  font-semibold
  text-primary
`
export const Span = tw.span`
  text-gray-900
  dark:text-white
`

export const Button = tw.button`
  relative
  z-50
  text-md
  md:text-xl
  font-semibold
  text-white
  bg-primary
  hover:bg-gray-600
  w-fit
  px-5
  py-2.5
  rounded-md
`

export const Image = tw.img`
  h-96
  w-auto
  animate-spin-slow
`
