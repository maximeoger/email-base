import { ReactElement } from 'react';

export const useModal = () => {
  
  const openModal = (modal: ReactElement | null) => {
    if(window && window.setModalInManager) {
      window.setModalInManager(modal)
    }
  }

  const closeModal = () => {
    if(window && window.setModalInManager) {
      window.setModalInManager(null)
    }
  }

  return {
    openModal,
    closeModal
  }
};