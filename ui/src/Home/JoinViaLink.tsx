import { Modal, TextInput } from "@carbon/react"
import { useRef, useState } from "react";

export const JoinViaLinkComponent = () => {
    const roomIdRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleCreate = () =>{
        setIsModalOpen(false);
    }
    const handleClose = () => {
        setIsModalOpen(false);
      };
    return (
      <><div style={{ paddingTop: '48px', paddingLeft: 0 }}>HomeComponent</div>
      <Modal
        open={isModalOpen}
        modalHeading="Create Room"
        primaryButtonText="Create"
        secondaryButtonText="Cancel"
        onRequestClose={handleClose}
        onRequestSubmit={handleCreate}
      >
      <TextInput
            className="pt-4"
            ref={roomIdRef}
            id="Projectname-text-input"
            labelText='Display name'
            placeholder='Enter your display name'
        />
        </Modal>
        </>
        
    )
  }
