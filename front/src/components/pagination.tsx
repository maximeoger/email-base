import { Pagination as NextUiPagination } from "@nextui-org/react";

export default function Pagination () {
  return (
    <NextUiPagination total={100} initialPage={1}/>
  )
}