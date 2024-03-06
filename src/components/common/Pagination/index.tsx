import type { IPaginationProps } from './types'

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: IPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="join">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn btn-ghost join-item btn-xs ${
            currentPage === page && 'btn-active'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
