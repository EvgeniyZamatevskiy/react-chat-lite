import React, { ChangeEvent, FC, useRef, useState } from "react"
import { EMPTY_STRING } from "constants/base"
import { AuthForm, MessagesList, SendMessageForm } from "components"
import { MessageType } from "types"

export const App: FC = () => {

  const [messages, setMessages] = useState<MessageType[]>([])
  const [username, setUsername] = useState(EMPTY_STRING)
  const [isConnected, setIsConnected] = useState(false)

  const socketRef = useRef<WebSocket>()

  const currentUsername = username.trim() || "Аноним"

  const onUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.currentTarget.value)
  }

  const onConnectClick = (): void => {
    socketRef.current = new WebSocket("ws://localhost:5000")

    socketRef.current.onopen = () => {
      setIsConnected(true)

      const message = {id: Date.now(), username, event: "connection"}

      if (socketRef.current) {
        socketRef.current.send(JSON.stringify(message))
      }
    }

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages(prev => [message, ...prev])
    }
  }

  const handleSendMessageClick = async (messageTrimmed: string) => {
    const message = {username, message: messageTrimmed, id: Date.now(), event: "message"}

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message))
    }
  }

  return (
    <div className="app">
      <div>
        {isConnected
          ? <SendMessageForm handleSendMessageClick={handleSendMessageClick}/>
          : <AuthForm username={username} onUsernameChange={onUsernameChange} onConnectClick={onConnectClick}/>}
        <MessagesList messages={messages} currentUsername={currentUsername}/>
      </div>
    </div>
  )
}
