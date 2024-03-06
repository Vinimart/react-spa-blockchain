/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegisterReturn } from 'react-hook-form'

export interface IAutocompleteProps<T> {
  suggestions: T[]
  placeholder: string
  register: UseFormRegisterReturn<any>
  disabled?: boolean
  renderSuggestion: (suggestion: T) => React.ReactNode
  onSelect: (suggestion: T) => void
}
