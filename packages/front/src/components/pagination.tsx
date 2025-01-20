import { Pagination as NextUiPagination } from "@nextui-org/react";

interface IProps {
  page: number;
  onChange: (page: number) => void;
}

export default function Pagination(props: IProps) {
  return (
    <NextUiPagination total={100} page={props.page} onChange={props.onChange} />
  );
}
