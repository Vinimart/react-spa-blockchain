import { IFormTextInputProps } from './types'

export default function FormInput({
  id,
  label,
  value,
  register,
  disabled,
  ...props
}: IFormTextInputProps) {
  return (
    <div>
      <label
        className="input input-bordered flex items-center gap-2"
        htmlFor={id}
      >
        <input
          className={`flex-1 grow ${disabled && 'input-disabled'}`}
          id={id}
          value={value}
          placeholder={label}
          disabled={disabled}
          {...register}
          {...props}
        />
      </label>
    </div>
  )
}
