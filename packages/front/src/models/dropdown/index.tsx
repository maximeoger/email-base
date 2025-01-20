import type { ReactNode } from "react";

export interface DropdownOption {
  onClick: (params: any) => any;
  startContent: ReactNode;
  name: string;
  className: string;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
}
