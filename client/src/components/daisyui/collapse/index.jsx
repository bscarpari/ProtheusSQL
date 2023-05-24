import React from 'react'
import { Collapse } from 'react-daisyui'

const MyCollapse = (title, children) => {
  return (
    <Collapse checkbox={true} icon={'arrow'}>
      <Collapse.Title className='text-xl font-medium'>{title}</Collapse.Title>
      <Collapse.Content>{children}</Collapse.Content>
    </Collapse>
  )
}

export default MyCollapse
