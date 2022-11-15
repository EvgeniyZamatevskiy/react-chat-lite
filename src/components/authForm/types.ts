import { ChangeEvent } from "react"

export type AuthFormPropsType = {
  username: string
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void
  onConnectClick: () => void
}
