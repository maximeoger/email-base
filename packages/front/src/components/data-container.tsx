import { ReactElement } from "react";
import { Spinner } from "@nextui-org/spinner";

interface IProps {
  loading?: boolean;
  error?: string;
  children: ReactElement;
  noData?: boolean;
}

export default function DataContainer({ loading, error, children, noData }: IProps) {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        error
      ) : noData ? (
        <span>no data</span>
      ) : (
        children)}
    </>
  )
}
