import type { ITableProps } from '../../types'

export interface ITableColumn {
  key: string
  title: string
}

export interface ITableHeaderProps {
  columns: ITableColumn[]
  onSortChange: ITableProps<never>['onSortChange']
}
