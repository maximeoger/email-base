import { ReactElement } from "react";

export {}

declare global {
  interface Window {
    setModalInManager?: (modal: ReactElement | null) => void;
  }
}