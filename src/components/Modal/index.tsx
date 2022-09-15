import React from "react";
import ReactModal from 'react-modal';

export type ModalProps = {
  children:JSX.Element | JSX.Element[];
  isOpen : boolean;
  handleStatusModal: () => void | undefined;
}

function Modal({children, isOpen, handleStatusModal}: ModalProps)
 {

    return (
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={handleStatusModal}
        isOpen={isOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
      {children}
        
      </ReactModal>
    );
  
};

export default Modal;
