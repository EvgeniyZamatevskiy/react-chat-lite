import React, { ChangeEvent, KeyboardEvent, FC, useState } from "react"
import { SendMessageFormPropsType } from "./types"
import { EMPTY_STRING } from "constants/base"
import { Key } from "enums"
import classes from "./index.module.css"

const ERROR_MESSAGE = "Сообщение обязательно"

export const SendMessageForm: FC<SendMessageFormPropsType> = ({handleSendMessageClick}) => {

  const [message, setMessage] = useState(EMPTY_STRING)
  const [errorMessage, setErrorMessage] = useState(EMPTY_STRING)

  const onMessageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.currentTarget.value)

    if (errorMessage) {
      setErrorMessage(EMPTY_STRING)
    }
  }

  const sendMessage = (): void => {
    const messageTrimmed = message.replace(/\s+/g, " ").trim()

    if (messageTrimmed) {
      handleSendMessageClick(messageTrimmed)
      setMessage(EMPTY_STRING)
    } else {
      setErrorMessage(ERROR_MESSAGE)
    }
  }

  const onSendMessageClick = (): void => {
    sendMessage()
  }

  const onAddItemKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === Key.ENTER) {
      sendMessage()
    }
  }

  return (
    <div className={classes.sendMessageForm}>

      {errorMessage && <div className={classes.errorMessage}>{errorMessage}</div>}

      <input
        type="text"
        placeholder="Введите сообщение"
        value={message}
        onChange={onMessageChange}
        onKeyDown={onAddItemKeyDown}
      />
      <button onClick={onSendMessageClick}>Отправить</button>
    </div>
  )
}
