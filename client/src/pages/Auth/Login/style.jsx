import tw from 'tailwind-styled-components'

export const Center = tw.div`
  w-screen
  h-screen
  flex
  flex-col
  justify-center
  items-center
  py-12
  px-4
  text-white
`

export const Form = tw.form`
  max-w-sm  
  w-full  
  fle
  flex-col
  items-center
  justify-center
  gap-4
  p-3
  rounded
  space-y-6
`

export const Input = tw.input`
  pl-14
  pr-6
  w-full
  py-4
  rounded-lg
focus:border-primary
focus:ring-primary
border-white
  text-sm
  leading-4
placeholder-white
  bg-transparent
`

export const LabelSignup = tw.label`
  text-center
  flex
  justify-center
  text-sm
  text-grayMain
`

export const Span = tw.span`
  mx-1
  text-grayMain
  hover:text-white
  hover:underline
`

export const InputDiv = tw.div`
  relative
  w-full
  flex-col
  flex
`
