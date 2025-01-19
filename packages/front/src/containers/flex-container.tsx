import { PropsWithChildren } from "react";
import classNames from "classnames";

interface IProps extends PropsWithChildren {
  className?: string;
}

export default function FlexContainer({ className, children }: IProps) {
  return <div className={classNames(`flex items-center`, className)}>{children}</div>;
}
