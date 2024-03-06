import type { GetAllCitizensSort } from 'services/blockchain/citizensService'
import type { ITableHeaderProps } from './types'

export default function TableHeader({
  columns,
  onSortChange
}: ITableHeaderProps) {
  return (
    <thead>
      <tr className="cursor-default">
        {columns.map((column, index) => (
          <th
            key={index}
            className="cursor-pointer hover:text-primary"
            onClick={() => {
              onSortChange(null as unknown as GetAllCitizensSort)

              setTimeout(
                () => onSortChange(column.key as GetAllCitizensSort),
                100
              )
            }}
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  )
}
