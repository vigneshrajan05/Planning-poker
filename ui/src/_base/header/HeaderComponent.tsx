import { Theme, Header } from "@carbon/react"

export const HeaderComponent = () => {
  return (
    <Theme theme='g100'>
        <Header
            aria-label="Planning Poker"
            className={`pl-6`}
        >
            PLANNING POKER
        </Header>
    </Theme>
  )
}
