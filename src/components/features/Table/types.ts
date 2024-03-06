import type { Dispatch, SetStateAction } from 'react'
import type { ITableBodyProps } from './components/TableBody/types'
import type { GetAllCitizensSort } from 'services/blockchain/citizensService'

export interface ITableProps<T> extends ITableBodyProps<T> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onSortChange: Dispatch<SetStateAction<GetAllCitizensSort>>
}
