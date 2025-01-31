import React from 'react';
import { createPortal } from 'react-dom';
import { BottomModalProps, ModalRef } from '../modal.types';

const BottomModal = React.forwardRef<ModalRef, BottomModalProps>(
  (props: BottomModalProps, modalRef) => {
    const { open, handleClose, children, className } = props;

    if (!open) return null;
    return createPortal(
      <div className='overlay overlay_bottom' onCanPlay={handleClose}>
        <div
          className={`${className} modal bottom`}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.getElementById('modal-portal')!
    );
  }
);

export default BottomModal;
