import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

import Box from 'components/Box'
import { RoomType } from 'lib/apiTypes'
import PlaylistManagement from 'PlaylistManagement'
import YoutubeSearch from 'YoutubeSearch'
import RoomPlaylist from 'RoomPlaylist'

import Users from './Users'

const ROOM_ACTIVATE = gql`
  mutation RoomActivate($roomId: ID!) {
    roomActivate(input: { roomId: $roomId }) {
      errors
    }
  }
`
type RoomsQuery = {
  room: RoomType
}
const ROOMS_QUERY = gql`
  query RoomsQuery($id: ID!) {
    room(id: $id) {
      currentRecord {
        playedAt
        song {
          name
          youtubeId
        }
      }
      name
      users {
        id
        name
        email
      }
    }
  }
`
const Room: React.FC = () => {
  const { id } = useParams()
  const [active, setActive] = useState(false)
  const [roomActivate] = useMutation(ROOM_ACTIVATE, { onCompleted: () => setActive(true) })

  useEffect(() => {
    roomActivate({ variables: { roomId: id } })
  }, [id, roomActivate])

  const [loadUsers, { data }] = useLazyQuery<RoomsQuery>(ROOMS_QUERY, { variables: { id } })

  useEffect(() => {
    if (!active) {
      return
    }

    loadUsers()
  }, [active, loadUsers])

  if (!active) {
    return <p>Loading</p>
  }

  if (!id) {
    return <></>
  }

  return (
    <Box>
      <p>
        Room Name: <strong>{data?.room.name}</strong>
      </p>
      <p>Users In Room</p>
      <Users initialUsers={data?.room.users || []} />

      <p>Playlist Management</p>
      <PlaylistManagement />
      <p>Playlist For Room</p>
      <RoomPlaylist roomId={id} />
      <p>Search</p>
      <YoutubeSearch />
    </Box>
  )
}

export default Room
