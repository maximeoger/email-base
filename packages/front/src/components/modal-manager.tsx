"use client"
import { 
  Modal as NextUIModal, 
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import React, { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalManager () {
  const [ modal, setModal ] = useState<ReactElement | null>(null);
  const { isOpen, onOpen } = useDisclosure();

  window.setModalInManager = (modal: ReactElement | null) => setModal(modal);

  useEffect(() => {
    if(modal) {
      onOpen()
    }
  }, [modal])

  if (!modal) return null

  return createPortal(
      <NextUIModal 
        isOpen={isOpen} 
        onOpenChange={() => setModal(null)} 
      >
        <ModalContent>
          {modal}
        </ModalContent>
      </NextUIModal>,
      document.body
  )
}