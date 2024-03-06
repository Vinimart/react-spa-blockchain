import type { ITableColumn } from '../TableHeader/types'

export interface ITableBodyProps<T> {
  data: T[]
  columns: ITableColumn[]
  onClick?: (row: T, rowIndex?: number) => void
}
