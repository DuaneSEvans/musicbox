import React, { createRef, useEffect } from 'react'
import { Box } from 'rebass'

import { useMessagesContext } from './MessagesContextProvider'
import { Message as MessageType } from './graphql'
import Message from './Message'

type MessageGroup = [string, MessageType[]]
const groupMessagesByRecord = (messages: MessageType[]): MessageGroup[] => {
  const messageGroups: MessageGroup[] = []
  let messageGroup: MessageGroup = ['', []]
  let recordId = ''

  messages.forEach(message => {
    if ((message.roomPlaylistRecord?.id || '') === recordId) {
      messageGroup[1].push(message)
    } else {
      messageGroups.push(messageGroup)
      recordId = message.roomPlaylistRecord?.id || ''
      messageGroup = [recordId, [message]]
    }
  })
  messageGroups.push(messageGroup)

  return messageGroups
}

const MessageGroup: React.FC<{ messageGroup: MessageGroup }> = ({ messageGroup }) => {
  const [recordId, messages] = messageGroup
  const songName = !!recordId && messages[0].song?.name

  return (
    <>
      <Box
        sx={{
          my: 4,
          position: 'relative',
          '&:before': {
            bg: 'accent',
            content: "''",
            height: '1px',
            left: 0,
            position: 'absolute',
            top: '50%',
            width: '25%',
          },
          '&:after': {
            bg: 'accent',
            content: "''",
            height: '1px',
            right: 0,
            position: 'absolute',
            top: '50%',
            width: '25%',
          },
        }}
      >
        <Box
          sx={{
            bg: 'backgroundTint',
            border: '1px solid',
            borderColor: 'accent',
            borderRadius: 6,
            boxShadow: 'md',
            color: 'gray500',
            fontSize: 0,
            fontWeight: 600,
            overflow: 'hidden',
            py: 2,
            px: 3,
            m: '0 auto',
            textAlign: 'center',
            textTransform: 'uppercase',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '50%',
          }}
        >
          {songName || 'No Song Playing'}
        </Box>
      </Box>
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </>
  )
}

const Messages: React.FC = () => {
  const { messages } = useMessagesContext()
  const chat = createRef<HTMLDivElement>()

  useEffect(() => {
    if (!chat || !chat.current) {
      return
    }

    chat.current.scrollTop = chat.current.scrollHeight
  }, [chat, messages])

  const groupedMessages = groupMessagesByRecord(messages)

  const messageLines = groupedMessages.map((messageGroup, idx) => (
    <MessageGroup key={idx} messageGroup={messageGroup} />
  ))
  return (
    <Box
      ref={chat}
      sx={{
        overflowY: 'scroll',
        py: 4,
      }}
    >
      {messageLines}
    </Box>
  )
}

export default Messages
