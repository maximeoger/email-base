import { ReactElement } from "react";
import { ModalParams } from "src/models/modal";

export const useModal = () => {
  const openModal = (modal: ReactElement | null, params?: ModalParams) => {
    if (window && window.setModalInManager) {
      window.setModalInManager(modal, params);
    }
  };

  const closeModal = () => {
    if (window && window.setModalInManager) {
      window.setModalInManager(null);
    }
  };

  return {
    openModal,
    closeModal,
  };
};
