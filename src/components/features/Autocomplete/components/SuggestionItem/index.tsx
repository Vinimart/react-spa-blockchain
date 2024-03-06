import type { ISuggestionItemProps } from './types'

export default function SuggestionItem<T>({
  suggestion,
  renderSuggestion,
  onSelect
}: ISuggestionItemProps<T>) {
  return (
    <li onClick={() => onSelect(suggestion)}>{renderSuggestion(suggestion)}</li>
  )
}
