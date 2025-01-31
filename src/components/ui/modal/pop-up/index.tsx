import React from "react";
import { createPortal } from "react-dom";
import { ModalRef, PopupModalProps } from "../modal.types";
import classNames from "classnames";

const PopupModal = React.forwardRef<ModalRef, PopupModalProps>(
	(props: PopupModalProps, modalRef) => {
		const { open, handleClose, children, className } = props;
		const modalClx = classNames(
			"bg-white p-5 rounded shadow min-w-60 max-w-[95%] md:max-w-[80%] md:max-h-[80%]",
			className
		);
		if (!open) return null;
		return createPortal(
			<React.Fragment>
				<div
					className="fixed top-0 left-0 flex justify-center items-center size-full bg-black/50 z-50"
					onClick={handleClose}
				>
					<div className={modalClx} ref={modalRef} onClick={(e) => e.stopPropagation()}>
						{children}
					</div>
				</div>
			</React.Fragment>,
			document.getElementById("modal-portal")!
		);
	}
);

export default PopupModal;
