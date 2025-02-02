import { Card } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export default function CollectionCardContainer (props: PropsWithChildren) {
  return (
    <Card
      shadow="none"
      className="min-w-full md:min-w-[350px] h-[230px] border border-1 border-grey-300 rounded-md cursor-pointer flex flex-col items-center justify-around"
    >
      {props.children}
    </Card>
  )
} 