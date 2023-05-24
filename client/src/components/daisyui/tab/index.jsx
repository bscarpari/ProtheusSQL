import { useState } from 'react'
import { Tabs } from 'react-daisyui'

const Tab = () => {
  const [tabValue, setTabValue] = useState(0)

  return (
    <Tabs
      value={tabValue}
      onChange={setTabValue}
      dataTheme={'mytheme'}
      boxed={false}
      size={'md'}
    >
      <Tabs.Tab value={0}>Comandos</Tabs.Tab>
      <Tabs.Tab value={1}>Histórico</Tabs.Tab>
      <Tabs.Tab value={2}>Database</Tabs.Tab>
    </Tabs>
  )
}

export default Tab
