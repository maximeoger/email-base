import {Card, CardHeader, CardBody } from "@nextui-org/card";

interface IProps {
  subject: string;
  sender: string;
  screenshot: string;
}

export default function MailCard (props: IProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <span>{props.sender}</span>
      </CardHeader>
    
      <CardBody>
        <img src={props.screenshot}/>
        <span>{props.subject}</span>
      </CardBody>
    </Card>
  )
}
