import { Modal, TextInput } from "@carbon/react"
import { useRef, useState } from "react";

export const JoinRoomComponent = () => {
    const roomIdRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleCreate = () =>{
        if(nameRef.current?.value){
            console.log(nameRef);
        }
        setIsModalOpen(false);
    }
    const handleClose = () => {
        setIsModalOpen(false);
      };
    return (
      <><div style={{ paddingTop: '48px', paddingLeft: 0 }}>HomeComponent</div>
      <Modal
        open={isModalOpen}
        modalHeading="Join Room"
        primaryButtonText="Join"
        secondaryButtonText="Cancel"
        onRequestClose={handleClose}
        onRequestSubmit={handleCreate}
      >
      <TextInput
            className="pt-4"
            ref={roomIdRef}
            id="Projectname-text-input"
            labelText='Room ID/Text'
            placeholder='Enter Room ID/Text'
        />
        <TextInput
            className="pt-4"
            ref={nameRef}
            id="Projectname-text-input"
            labelText='Display Name'
            placeholder='Display Name'
        />
        </Modal>
        </>
        
    )
  }
