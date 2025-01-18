"use client"
import { 
  Modal as NextUIModal, 
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import React, { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalParams, ModalState } from "src/models/modal";

export default function ModalManager () {
  const [ modalState, setModalState ] = useState<ModalState | null>(null);
  const { isOpen, onOpen } = useDisclosure();
  
  window.setModalInManager = (modal: ReactElement | null, params?: ModalParams) => setModalState({ component: modal, ...(params || {}) });

  useEffect(() => {
    if(modalState) {
      onOpen()
    }
  }, [modalState])

  if (!modalState) return null

  return createPortal(
      <NextUIModal 
        isOpen={isOpen}
        size={modalState.size}
        radius="sm"
        scrollBehavior="inside"
        onOpenChange={() => setModalState(null)} 
        
      >
        <ModalContent data-name="modal-content">
          {modalState.component}
        </ModalContent>
      </NextUIModal>,
      document.body
  )
}