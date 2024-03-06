import type { ITableBodyProps } from './types'

const TableBody = <T,>({ data, columns, onClick }: ITableBodyProps<T>) => {
  return (
    <tbody>
      {data?.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className="hover cursor-pointer"
          onClick={() => onClick && onClick(row, rowIndex)}
        >
          {columns?.map((column, colIndex) => (
            <td key={colIndex}>
              {(row as Record<string, React.ReactNode>)[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
