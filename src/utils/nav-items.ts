export interface INavItems {
  label: string
  path: string
}

const navItems: INavItems[] = [
  { label: 'Citizens List', path: '/' },
  { label: 'Add Citizen', path: '/add-citizen' }
]

export default navItems
