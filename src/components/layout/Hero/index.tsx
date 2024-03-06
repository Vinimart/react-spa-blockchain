import type { IHeroProps } from './types'

export default function Hero({ children }: IHeroProps) {
  return (
    <h1 className="hero mb-10 h-20 bg-base-200 text-2xl text-primary">
      {children}
    </h1>
  )
}
