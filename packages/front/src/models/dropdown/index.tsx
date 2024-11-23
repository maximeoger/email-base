import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface DropdownOption {
  onClick: (params: any) => any;
  startContent: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  name: string;
  className: string;
  color:  "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
}