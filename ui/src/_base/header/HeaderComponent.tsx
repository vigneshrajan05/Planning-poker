import { Theme, Header } from "@carbon/react"
import { Presentation } from "@carbon/pictograms-react";

export const HeaderComponent = () => {
  return (
    <Theme theme='g100'>
        <Header
            aria-label="Planning Poker"
            className={`pl-6`}
        >
            <Presentation style={{maxHeight: '42px'}} />
            <span>PLANNING POKER</span>
        </Header>
    </Theme>
  )
}
