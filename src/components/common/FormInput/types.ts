/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegisterReturn } from 'react-hook-form'

export type InputTypes = 'text' | 'password' | 'email' | 'number'

export interface IFormTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: InputTypes
  label: string
  register?: UseFormRegisterReturn<any>
}
