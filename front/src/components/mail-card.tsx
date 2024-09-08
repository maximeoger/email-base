
interface IProps {
  subject: string;
  sender: string;
  screenshot: string;
}

export default function MailCard (props: IProps) {
  return (
    <div className={"border-1 rounded-sm hover:border-grey hover:cursor-pointer"}>
      <img src={props.screenshot}/>
    </div>
  )
}
