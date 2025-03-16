import { Chip } from "@nextui-org/react";
import Link from "next/link";
import { SenderDTO } from "shared/types/sender";

interface IProps {
  data: SenderDTO[];
}

export default function SendersContainer (props: IProps) {
  const { data } = props;

  return (
    <div className="flex gap-2 flex-wrap">
      {data.map((sender: SenderDTO) => (
        <Chip variant="bordered">
          <Link href={"/"}>{sender.name}</Link>
        </Chip>
      ))}
    </div>
  )
}