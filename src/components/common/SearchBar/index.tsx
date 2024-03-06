import { useDebounce } from 'hooks'
import { useState } from 'react'

import { FormInput } from '../'

import type { ISearchBarProps } from './types'

export default function SearchBar({ onSearch }: ISearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { debouncedCallback } = useDebounce(onSearch, 300)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value

    setSearchTerm(term)
    debouncedCallback(term)
  }

  return (
    <FormInput
      label="Search"
      type="text"
      value={searchTerm}
      onChange={handleChange}
    />
  )
}
