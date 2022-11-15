import React, { FC } from "react"
import { MessagesListPropsType } from "./types"
import classes from "./index.module.css"

export const MessagesList: FC<MessagesListPropsType> = ({messages, currentUsername}) => {

  const messagesRender = messages.map(({id, message, event, username}) =>
    <div key={id}>
      {event === "connection"
        ? <div className={classes.connection}>{currentUsername} подключился</div>
        : <div className={classes.message}>{currentUsername}. {message}</div>}
    </div>)

  return <div>{messagesRender}</div>
}
