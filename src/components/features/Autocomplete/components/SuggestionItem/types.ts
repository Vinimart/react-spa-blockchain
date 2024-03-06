export interface ISuggestionItemProps<T> {
  suggestion: T
  renderSuggestion: (suggestion: T) => React.ReactNode
  onSelect: (suggestion: T) => void
}
