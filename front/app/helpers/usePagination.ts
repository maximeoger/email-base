import {useState} from "react";

interface PaginationState {
  page: number;
  nextPage: () => void;
  setPage: (page: number) => void;
  setTotalItems: (max: number) => void;
  totalPages: number;
}

function usePagination (start: number, limit: number): PaginationState {
  const [page, setPage] = useState<number>(start);
  const [totalItems, setTotalItems] = useState<number>(0);

  const nextPage = () => setPage((page) => page + limit);

  return {
    page,
    nextPage,
    setPage,
    setTotalItems,
    totalPages: totalItems % limit,
  }
}

export default usePagination;
