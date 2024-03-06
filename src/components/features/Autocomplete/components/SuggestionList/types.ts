export interface ISuggestionListProps<T> {
  suggestions: T[]
  renderSuggestion: (suggestion: T) => React.ReactNode
  onSelect: (suggestion: T) => void
}
