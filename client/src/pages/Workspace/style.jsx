import tw from 'tailwind-styled-components'

export const Container = tw.div`
  flex
  flex-col
  h-full
  w-full
  overflow-hidden
`

export const WorkspaceContainer = tw.div`
  flex
  flex-row
  w-full
  h-full
  overflow-hidden
`

export const CodeContainer = tw.div`
  flex
  flex-col
  w-full
  h-full
  overflow-auto
`

export const SidebarContainer = tw.div`
  flex
  bg-black200
`
