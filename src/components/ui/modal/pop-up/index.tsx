import React from "react";
import { createPortal } from "react-dom";
import { ModalRef, PopupModalProps } from "../modal.types";
import classNames from "classnames";
import { X } from "lucide-react";

const PopupModal = React.forwardRef<ModalRef, PopupModalProps>(
  (props: PopupModalProps, modalRef) => {
    const {
      open,
      handleClose,
      children,
      className,
      showCloseBtn = false,
    } = props;
    const modalClx = classNames(
      "relative bg-white p-5 rounded shadow min-w-60 max-w-[95%] md:max-w-[80%] md:max-h-[80%]",
      className,
    );
    if (!open) return null;
    return createPortal(
      <React.Fragment>
        <div
          className="fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-black/50"
          onClick={handleClose}
        >
          <div
            className={modalClx}
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseBtn && (
              <button
                onClick={close}
                className="absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-white p-2 lg:-right-8 lg:-top-8"
              >
                <X color="#908b8b" />
              </button>
            )}
            {children}
          </div>
        </div>
      </React.Fragment>,
      document.getElementById("modal-portal")!,
    );
  },
);

export default PopupModal;
