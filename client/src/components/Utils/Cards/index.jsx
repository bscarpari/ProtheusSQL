import React from 'react'
import { Button } from 'react-daisyui'

import { AiFillClockCircle } from 'react-icons/ai'
import { formatDateTime } from '../../../utils'
import { Span } from './Span'

import {
  Container,
  Title,
  PrioritySpan,
  Content,
  Wrapper,
  Bottom,
  Information,
} from './style'

const TaskCard = ({ data }) => {
  const { title, description, createdAt, priority } = data
  const formattedCreatedAt = formatDateTime(createdAt)

  return (
    <Container>
      <Title>
        <div className='mr-2 max-w-[20px] overflow-x-auto overflow-y-hidden whitespace-nowrap'>
          <h1>{title ? title : 'Sem título'}</h1>
        </div>
        <PrioritySpan>
          <Span priority={priority ? priority : ''} />
        </PrioritySpan>
      </Title>
      <h2 className='mt-2 overflow-y-auto overflow-x-hidden whitespace-pre-wrap text-sm'>
        {description ? description : ''}
      </h2>
      <Content>
        <Bottom>
          <Wrapper>
            <AiFillClockCircle size={25} />
            <h3 className='ml-2'>
              {formattedCreatedAt ? formattedCreatedAt : 'dd/MM/yy'}
            </h3>
          </Wrapper>
          <Button color={'primary'} size={'sm'} href='/schedule'>
            Abrir
          </Button>
        </Bottom>
      </Content>
    </Container>
  )
}

const SkeletonTaskCard = () => {
  return (
    <Information>
      <Title className='animate-pulse'>
        <h1 style={{ background: '#383847', width: '120px', height: '15px' }} />
        <span
          className='h-6 w-6 rounded-full '
          style={{ background: '#383847' }}
        />
      </Title>
      <Container className='animate-pulse'>
        <Title>
          <h1
            style={{ background: '#383847', width: '120px', height: '15px' }}
          />
          <span
            className='h-6 w-6 rounded-full '
            style={{ background: '#383847' }}
          />
        </Title>
        <h2 style={{ background: '#383847', width: '200px', height: '20px' }} />
        <Content>
          <Bottom>
            <Wrapper>
              <span
                style={{
                  background: '#383847',
                  width: '25px',
                  height: '25px',
                  borderRadius: '100%',
                }}
              />
              <h3
                className='ml-2 rounded'
                style={{
                  background: '#383847',
                  width: '120px',
                  height: '30px',
                }}
              ></h3>
            </Wrapper>
            <Button
              size={'sm'}
              href='/schedule'
              style={{ width: '70px', background: '#383847', border: 'none' }}
            ></Button>
          </Bottom>
        </Content>
      </Container>
    </Information>
  )
}

export { TaskCard, SkeletonTaskCard }
