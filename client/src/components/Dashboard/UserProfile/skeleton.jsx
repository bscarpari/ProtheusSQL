import React from 'react'

import { Button } from 'react-daisyui'
import { IoEnterOutline } from 'react-icons/io5'
import { Avatar, Table } from 'react-daisyui'

import { Title, Body, Information } from './style'

const SkeletonUserProfile = () => {
  return (
    <>
      <Information>
        <Title>
          <h1>Perfil</h1>
          <Button
            color={'primary'}
            startIcon={''}
            size={'sm'}
            style={{
              borderRadius: '5px',
              fontSize: '14px',
              fontVariant: 'normal',
              textTransform: 'none',
            }}
            disabled={true}
          >
            Editar
          </Button>
        </Title>
        <Body>
          <SkeletonTable />
          <Button
            color={'primary'}
            className='mt-4 lg:mt-0'
            style={{ textTransform: 'none', marginTop: '1rem' }}
            href={'/schedule'}
            disabled={true}
          >
            Ir para agenda
            <IoEnterOutline size={20} style={{ marginLeft: '0.5em' }} />
          </Button>
        </Body>
      </Information>
    </>
  )
}

const SkeletonTable = () => {
  return (
    <>
      <div className='animate-pulse'>
        <div className='flex flex-col items-center justify-center overflow-x-auto'>
          <Avatar
            letters={'  '}
            shape={'circle'}
            color={'accent'}
            size={'md'}
            className='bg-gray'
            style={{
              background: '#2b2b36',
              borderRadius: '100%',
            }}
          />
          <h1
            className='text-xl'
            style={{
              background: '#2b2b36',
              marginTop: '1rem',
              borderRadius: '4px',
            }}
          >
            ㅤㅤ
          </h1>
          <h2
            className='my-2 text-sm'
            style={{
              background: '#2b2b36',
              borderRadius: '4px',
            }}
          >
            ㅤㅤㅤ ㅤㅤㅤ ㅤㅤㅤ
          </h2>
          <Table
            compact={false}
            style={{ textAlign: 'center', padding: '0px' }}
            id='profileForm'
          >
            <Table.Head className=''>
              <span className=''>&nbsp;</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
            </Table.Head>

            <Table.Body>
              <Table.Row>
                <span>ㅤㅤㅤ</span>
                <span>ㅤㅤㅤ</span>
                <span>ㅤㅤㅤ</span>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  )
}

export default SkeletonUserProfile
