import tw from 'tailwind-styled-components'

export const DashboardContainer = tw.div`
  flex
  flex-col
  h-screen
  overflow-y-auto
  overflow-x-hidden
  lg:overflow-hidden
`

export const Container = tw.div`
  flex
  flex-col
  lg:h-full
  mx-[20px]
  my-[20px]
`

export const Div = tw.div`
  flex
  flex-col
  lg:flex-row
  h-full
`

export const Informations = tw.div`
  flex
  flex-col
  tab:flex-row
  w-full
  lg:w-1/3
  lg:h-full  
  mr-2
`

export const Information = tw.div`
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

export const Statistics = tw.div`
  flex
  flex-col
  lg:w-2/3
  lg:ml-2
  lg:mt-0
  mt-3
`

export const Performance = tw.div`
  w-full
  h-fit
  lg:h-1/3
  max-h-[300px]
  p-4
  mb-2
  rounded-lg
  bg-black100
`

export const Indicators = tw.div`
  w-full
  flex
  flex-col
  lg:flex-row
  lg:h-1/3
  items-center
`

export const Monitor = tw.div`
  w-full
  h-fit
  lg:h-1/3
  p-4
  items-center
  justify-center
  mt-2
  rounded-lg
  bg-black100
  overflow-auto
`

export const Indicator = tw.div`
  flex
  flex-col
  items-center
  w-full
  lg:h-full
  h-[30vh]
  my-3
  lg:my-0
  p-4
  rounded-lg
  bg-black100
`

export const Spacing = tw.div`
  my-0
  lg:my-2
  mr-0
  lg:mr-4
`

export const Title = tw.div`
  flex
  justify-between
  items-center
  font-semibold
  w-full
`

export const Body = tw.div`
  flex
  flex-col
  justify-center
  items-center
`

export const CardBody = tw.div`
  overflow-scroll
`
