import React, { PropsWithChildren } from "react";
import { DropdownOption } from "src/models/dropdown";
import { Ellipsis } from "lucide-react";
import DropdownWrapper from "../dropdown-wrapper";

interface IProps extends PropsWithChildren {
  options: Array<DropdownOption>;
}

export default function DropdownButton(props: IProps) {
  const { options } = props;

  return (
    <DropdownWrapper options={options} placement="bottom-end">
      <Ellipsis className="cursor-pointer" />
    </DropdownWrapper>
  );
}
