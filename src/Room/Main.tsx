import React, { useEffect, useState } from 'react'
import { Button, Box, Flex } from 'rebass'

import Player from 'Player'
import QuickAdd from 'QuickAdd'
import RoomPlaylist from 'RoomPlaylist'
import UserPlaylist from 'UserPlaylist'
import Users from './Users'
import { useCurrentRecordContext } from 'Room'

import { Room as RoomType } from './graphql'

const Main: React.FC<{ room: RoomType }> = ({ room }) => {
  const [tab, setTab] = useState('userPlaylist')
  const selectUserPlaylist = (): void => setTab('userPlaylist')
  const selectRoomPlaylist = (): void => setTab('roomPlaylist')

  // TODO:  Sort of a hack to ensure current record is set after room has
  // been activated.  This should be pulled out.
  const { setCurrentRecord } = useCurrentRecordContext()
  const { currentRecord } = room
  useEffect(() => {
    setCurrentRecord(currentRecord)
  }, [currentRecord, setCurrentRecord])

  return (
    <Flex
      as="main"
      sx={{
        flexDirection: 'column',
        height: '100vh',
        p: 4,
        width: ['100%', '60%'],
      }}
    >
      <Box>
        <QuickAdd />
      </Box>

      <Box
        sx={{
          overflowY: 'scroll',
        }}
      >
        <Box>
          <Users initialUsers={room.users} />
        </Box>

        <Box>
          <Player />
        </Box>

        <Box
          sx={{
            py: 3,
          }}
        >
          <Flex flexDirection="row">
            <Box>
              <Button
                disabled={tab === 'userPlaylist'}
                onClick={selectUserPlaylist}
                variant="transparent"
                sx={{
                  bg: tab === 'userPlaylist' ? 'accent' : 'transparent',
                  cursor: 'pointer',
                  ':disabled': {
                    pointerEvents: 'none',
                  },
                  ':hover': {
                    bg: 'accent',
                  },
                }}
              >
                User Playlist
              </Button>
            </Box>

            <Box mx={3}>
              <Button
                disabled={tab === 'roomPlaylist'}
                onClick={selectRoomPlaylist}
                variant="transparent"
                sx={{
                  bg: tab === 'roomPlaylist' ? 'accent' : 'transparent',
                  cursor: 'pointer',
                  ':disabled': {
                    pointerEvents: 'none',
                  },
                  ':hover': {
                    bg: 'accent',
                  },
                }}
              >
                Room Playlist
              </Button>
            </Box>
          </Flex>
        </Box>

        <Flex flexDirection="column">
          <Box display={tab === 'userPlaylist' ? 'block' : 'none'}>
            <UserPlaylist />
          </Box>
          <Box display={tab === 'roomPlaylist' ? 'block' : 'none'}>
            <RoomPlaylist roomId={room.id} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Main
