import * as React from 'react'
import { FaUser } from 'react-icons/fa'
import { Center, Wrapper } from './style'

export const AvatarPicture = () => {
  return (
    <Center>
      <Wrapper>
        <FaUser size={96} color='#fff' />
      </Wrapper>
    </Center>
  )
}
