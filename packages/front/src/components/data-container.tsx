import { ReactElement } from "react";
import { Spinner } from "@nextui-org/spinner";

interface IProps {
  loading?: boolean;
  error?: string;
  children: ReactElement;
  isFetchingNextPage?: boolean;
  noData?: boolean;
}

export default function DataContainer({ loading, error, children, noData, isFetchingNextPage }: IProps) {
  return (
    <div className="flex flex-col items-center gap-16">
      <div>
        {loading ? (
          <Spinner />
        ) : error ? (
          error
        ) : noData ? (
          <span>no data</span>
        ) : (
          children)}
      </div>
      <div>
        { !loading && isFetchingNextPage && (<Spinner/>) }
      </div>     
    </div>
  )
}
