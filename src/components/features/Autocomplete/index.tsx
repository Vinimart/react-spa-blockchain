import { FormInput } from 'components/common'
import { memo, useCallback, useMemo, useState } from 'react'

import { SuggestionList } from './components'

import type { IAutocompleteProps } from './types'

function Autocomplete<T>({
  suggestions,
  placeholder,
  register,
  renderSuggestion,
  disabled,
  onSelect
}: IAutocompleteProps<T>) {
  const [value, setValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowSuggestions(!!e.target.value)
      setValue(e.target.value)
    },
    [setShowSuggestions]
  )

  const handleSelect = useCallback(
    (suggestion: T) => {
      onSelect(suggestion)
      setShowSuggestions(false)
      setValue(String(suggestion))
    },
    [onSelect]
  )

  const filteredSuggestions = useMemo(() => {
    if (!value || !showSuggestions) return []

    return suggestions.filter((suggestion) =>
      String(suggestion).toLowerCase().includes(value.toLowerCase())
    )
  }, [showSuggestions, suggestions, value])

  return (
    <div>
      <FormInput
        type="text"
        value={value}
        onChange={handleChange}
        label={placeholder}
        register={register}
        disabled={disabled}
      />

      <SuggestionList
        suggestions={filteredSuggestions}
        renderSuggestion={renderSuggestion}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default memo(Autocomplete)
