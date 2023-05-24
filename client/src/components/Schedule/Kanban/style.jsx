import tw from 'tailwind-styled-components'

export const Board = tw.div`
  flex
  items-start
  justify-start
  overflow-auto
`

export const Content = tw.div`
  mt-3
  h-full
  overflow-y-auto
`

export const Section = tw.div`
  flex
  flex-col
  w-[25rem]
  p-2
  rounded-xl
  my-1
  mx-2
  max-h-[50vh]
`

export const Header = tw.div`
  w-full
  flex
  flex-row
  justify-between
`

export const Amount = tw.div`
  flex
  justify-center
  items-center
  bg-white
  text-black100
  w-6
  h-6
  rounded-full
`
