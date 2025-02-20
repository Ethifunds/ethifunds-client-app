type DivNativeAttributes = React.ComponentPropsWithoutRef<'div'>;

export type ModalRef = HTMLDivElement;

export interface PopupModalProps extends DivNativeAttributes {
  open: boolean;
  handleClose: () => void;
  showCloseBtn?: boolean;
  children: React.ReactNode;
}

export interface BottomModalProps extends DivNativeAttributes {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}
