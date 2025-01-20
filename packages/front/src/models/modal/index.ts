import { ReactElement } from "react";

export type ModalSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full";

export interface BaseModalProps {
  title: string;
  actionText: string;
  cancelText: string;
}

export interface ModalState extends ModalParams {
  component: ReactElement | null;
}

export interface ModalParams {
  size?: ModalSize | "md";
}
