import { ForwardedRef, forwardRef } from "react";

interface IProps {
  screenshot: string;
}

 function MailCard (props: IProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div ref={ref} className={"border-1 rounded-sm hover:border-grey hover:cursor-pointer"}>
      <img src={props.screenshot}/>
    </div>
  )
}

export default forwardRef(MailCard)