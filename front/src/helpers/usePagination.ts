import {useState} from "react";

interface PaginationState {
  page: number;
  nextPage: () => void;
}

function usePagination (start: number, limit: number): PaginationState {
  const [page, setPage] = useState<number>(start);
  const nextPage = () => setPage((page) => page + limit);
  return {
    page,
    nextPage
  }
}

export default usePagination;
