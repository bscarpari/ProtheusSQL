import tw from 'tailwind-styled-components'

export const Center = tw.div`
  w-screen
  h-screen
  flex
  justify-center
  items-center
  text-white
  whitespace-nowrap
`

export const Form = tw.form`
  w-screen
  relative
  py-6
  p-8
  2xl:w-4/12
  xl:w-5/12
  md:w-6/12
  sm:w-9/12
  flex
  flex-col
  justify-start
  items-start
  space-y-6
`

export const SignupInput = tw.div`
  w-full
  flex
  flex-col
  justify-start
  items-start
  space-y-4
`

export const Label = tw.label`
  leading-4
`

export const InputDiv = tw.div`
  relative
  w-full
  flex
  justify-center
  items-center
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
