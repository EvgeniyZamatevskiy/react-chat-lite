import React, { FC } from "react"
import { AuthFormPropsType } from "./types"
import classes from "./index.module.css"

export const AuthForm: FC<AuthFormPropsType> = ({username, onUsernameChange, onConnectClick}) => {
  return (
    <div className={classes.authForm}>
      <input type="text" placeholder="Введите ваше имя" value={username} onChange={onUsernameChange}/>
      <button onClick={onConnectClick}>Войти</button>
    </div>
  )
}
