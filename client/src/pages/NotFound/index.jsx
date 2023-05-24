import React from 'react'

import { goBack } from '../../utils'

import notFound from '../../assets/icons/24.svg'

import { Button, Center, Container, Image, Span, Text } from './style'

const NotFound = () => {
  return (
    <Container>
      <Center>
        <Text>
          Página<Span> não encontrada!</Span>
        </Text>
        <Image src={notFound} alt='not found' />
        <Button
          onClick={() => {
            goBack()
          }}
        >
          Retorne a página anterior
        </Button>
      </Center>
    </Container>
  )
}

export default NotFound
