import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

function Pagination ({ page, setPage, totalPages }: Props) {
  const pages = Array.from({length: totalPages+1}, (_, i) => i + 1);

  return (
    <div className="w-fit flex">
      <div className="h-8 w-8">
        {page > 0 && (
          <button
            onClick={() => setPage(page-1)}
            className={`ml-1 w-8 h-8 border-2 rounded text-black`}
          >
            <ChevronLeftIcon/>
          </button>)
        }
      </div>

      {
        pages.map((p, index) => (
          <button
            key={p}
            onClick={() => setPage(index)}
            className={`ml-1 w-8 h-8 border-2 rounded ${(page+1 === p) ? 'text-white bg-gray-950' : 'text-black '}`}
          >
            {p}
          </button>
        ))
      }
      <div className="h-8 w-8">
        { page < totalPages &&
          (<button
            onClick={() => setPage(page+1)}
            className={`ml-1 w-8 h-8 border-2 rounded text-black`}
          >
            <ChevronRightIcon/>
          </button>)
        }
      </div>
    </div>
  )
}

export default Pagination;