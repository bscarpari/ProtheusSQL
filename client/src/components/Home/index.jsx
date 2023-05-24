import React from 'react'
import { Link } from 'react-router-dom'

import HomeImage from './Image'

import {
  Center,
  HomeDiv,
  HomeMain,
  Paragraph,
  Highlight,
  Span,
  TextWrapper,
  Title,
  Button,
  AnchorStyle,
} from './style'

const HomeSection = () => {
  return (
    <Center>
      <HomeDiv>
        <HomeMain>
          <TextWrapper>
            <HomeDescription title='Aprenda & Pratique' highlight='SQL.' />
          </TextWrapper>
        </HomeMain>
      </HomeDiv>
      <HomeImage src='/src/assets/icons/homeImage.svg' alt='Database figure' />
    </Center>
  )
}

const HomeDescription = ({ title, highlight }) => {
  return (
    <>
      <Title>
        <Span>{title}</Span>
        <Highlight> {highlight}</Highlight>
      </Title>
      <Paragraph>
        uma plataforma com um ambiente <strong>instantâneo</strong>,<br></br>
        sem instalação local, basta apenas começar.
      </Paragraph>

      <Button>
        <Anchor text='Começar agora' />
      </Button>
    </>
  )
}

const Anchor = ({ text }) => {
  return (
    <Link to='/login' className={AnchorStyle}>
      {text}
    </Link>
  )
}

export default HomeSection
