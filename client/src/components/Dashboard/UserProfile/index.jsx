import React, { useState, useEffect } from 'react'

import { Button } from 'react-daisyui'

import SkeletonUserProfile from './skeleton'
import { TableForm } from '../UsersTable'

import { Title, Body, Information } from './style'
import { fetchUserData } from '../../../utils'

const UserProfile = () => {
  const [user, setUser] = useState()
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    try {
      if (token) {
        fetchUserData().then((data) => {
          setUser(data)
          setLoading(false)
        })
      } else {
        window.location.href = '/login'
      }
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  return (
    <>
      {loading ? (
        <SkeletonUserProfile />
      ) : (
        <Information>
          <Title>
            <h1>Perfil</h1>
            <Button
              color={'primary'}
              startIcon={''}
              size={'sm'}
              style={{
                borderRadius: '5px',
                fontSize: '12px',
                fontVariant: 'normal',
                textTransform: 'none',
              }}
              onClick={() => setEditMode(!editMode)}
            >
              Editar
            </Button>
          </Title>
          <Body>
            <TableForm
              data={user}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </Body>
        </Information>
      )}
    </>
  )
}

export default UserProfile
