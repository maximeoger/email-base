import { ReactChild } from "react";

interface Props {
  onClick: () => void;
  children: ReactChild;
}

const Button = (props) => (
  <button className="">{props.children}</button>
);