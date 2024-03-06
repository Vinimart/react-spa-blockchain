import type { IButtonProps } from './types'

export default function Button({ children, ...props }: IButtonProps) {
  return (
    <button
      className={`btn btn-primary w-full`}
      style={{
        color: 'white'
      }}
      {...props}
    >
      {children}
    </button>
  )
}
