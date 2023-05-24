import tw from 'tailwind-styled-components'

export const Container = tw.div`
  mt-[4vh]
  bg-black200
  p-4
  rounded-xl
  shadow-sm
`

export const Title = tw.div`
  flex
  justify-between
  items-center
  font-semibold
`

export const PrioritySpan = tw.div`
  bg-white
  rounded-full
`

export const Content = tw.div`
  mt-8
  text-xs
`

export const Bottom = tw.div`
  w-full
  flex
  justify-between
`

export const Wrapper = tw.div`
  w-full
  flex
  items-center
`

export const Information = tw.div`
  h-full
  w-full
  mb-4
  max-h-[50vh]
  lg:max-h-[46vh]
  lg:mb-0
  lg:mt-0
  rounded-lg
  p-4
  bg-black100
  overflow-y-auto
`
