import React from 'react'

import { Container, Image } from './style'

const HomeImage = ({ src, alt }) => {
  return (
    <Container>
      <Image src={src} alt={alt} />
    </Container>
  )
}

export default HomeImage
