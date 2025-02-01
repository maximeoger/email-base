import { ReactElement } from "react";
import { ModalParams, ModalSize } from "src/models/modal";

export {};

declare global {
  interface Window {
    env: Record<string, string>,
    setModalInManager?: (
      modal: ReactElement | null,
      params?: ModalParams,
    ) => void;
  }
}
