import { Pagination } from 'components/common'
import { memo } from 'react'

import { TableBody, TableHeader } from './components'

import type { ITableProps } from './types'

function Table<T>({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
  onSortChange,
  onClick
}: ITableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <TableHeader columns={columns} onSortChange={onSortChange} />
        <TableBody data={data} columns={columns} onClick={onClick} />
      </table>

      <div className="mt-4 flex w-full justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default memo(Table)
