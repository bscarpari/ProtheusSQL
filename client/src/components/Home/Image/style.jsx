import tw from 'tailwind-styled-components'

export const Container = tw.div`
  lg:absolute
  lg:inset-y-0
  lg:right-0
  lg:w-1/2
`

export const Image = tw.img`
  h-full
  w-full
  object-contain
  sm:h-72
  md:h-96
  lg:h-screen
  lg:w-full
  py-2
  px-4
`
