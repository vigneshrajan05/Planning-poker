import { ExpressiveCard, UserAvatar } from "@carbon/ibm-products"
import { User } from "../models/user.interface"
import { useState } from "react";
import { Button } from "@carbon/react";

export const UserListComponent: React.FC<{userList: User[]}> = ({userList}) => {
    const [isRevealed, setIsRevealed] = useState<boolean>(true);
    const reveal = () => {
        setIsRevealed(true)
    }
    const close = () => {
        setIsRevealed(false)
    }
    return (
        <>
            <div style={{display: 'flex', padding: '36px 48px'}}>
                {userList.map((user) => {
                    return(
                        <div style={{height: '200px', width: '160px', margin: '8px'}}>
                            <ExpressiveCard label={user.displayName}>
                                {
                                    isRevealed ? <span>{user.score}</span> : <UserAvatar name={user.displayName}/>
                                }
                            </ExpressiveCard>
                        </div>
                    )
                })}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {isRevealed ? <Button onClick={close}>Start new Voting</Button> : <Button onClick={reveal}>Reveal</Button>}
            </div>
        </>
    )
}
