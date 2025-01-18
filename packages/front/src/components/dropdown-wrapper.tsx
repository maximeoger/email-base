import { PropsWithChildren } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import { DropdownOption } from "src/models/dropdown";

interface IProps extends PropsWithChildren {
  options: Array<DropdownOption>;
  placement: "center" | "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
}

export default function DropdownWrapper (props: IProps) {
  const { children, options } = props;

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        {children}
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Dropdown menu"
        className="w-[200px]"
        itemClasses={{
          base: "gap-4",
        }}
      >
      {
        options.map(({ name, startContent, className, color, onClick }) => (
          <DropdownItem
            key={name}
            className={className}
            color={color}
            onClick={onClick}
            startContent={startContent}
          >
            {name}
          </DropdownItem>
        ))
      }
      </DropdownMenu>
    </Dropdown>
  )
}