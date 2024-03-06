import SuggestionItem from '../SuggestionItem'

import type { ISuggestionListProps } from './types'

export default function SuggestionList<T>({
  suggestions,
  renderSuggestion,
  onSelect
}: ISuggestionListProps<T>) {
  if (!suggestions.length) return null

  return (
    <div className="relative">
      <ul className="menu dropdown-content absolute z-[1] w-full rounded-box rounded-t-none bg-neutral-50 p-2 shadow">
        {suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={index}
            suggestion={suggestion}
            renderSuggestion={renderSuggestion}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  )
}
