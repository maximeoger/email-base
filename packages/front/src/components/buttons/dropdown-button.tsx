import React, { PropsWithChildren } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import { DropdownOption } from "src/models/dropdown";
import { Ellipsis } from 'lucide-react';

interface IProps extends PropsWithChildren {
  options: Array<DropdownOption>
}

export default function DropdownButton (props: IProps) {
  const { options } = props

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Ellipsis className='cursor-pointer'/>
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