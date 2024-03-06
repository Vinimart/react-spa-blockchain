import { useConnectWallet } from 'hooks'
import { Link } from 'react-router-dom'
import useMainStore from 'store/main'
import navItems, { INavItems } from 'utils/nav-items'

function NavItem({ label, path }: INavItems) {
  return (
    <Link to={path}>
      <li className="btn btn-primary btn-sm text-sm">{label}</li>
    </Link>
  )
}

export default function Navbar() {
  const connectWallet = useConnectWallet(true)

  const { signer, wallet } = useMainStore()

  return (
    <nav className="bg-base-100">
      <div className="container-sm navbar">
        <div className="flex-1">
          <ul className="flex items-center gap-2">
            {navItems?.map((props, i) => <NavItem key={i} {...props} />)}

            <li
              className="btn btn-outline btn-sm text-sm"
              onClick={connectWallet}
            >
              {signer
                ? `${String(wallet)?.slice(0, 6)}...${String(wallet)?.slice(
                    -4
                  )}`
                : 'Connect Wallet'}
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Github"
                src="https://avatars.githubusercontent.com/u/47956560?v=4"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a
                className="justify-between"
                href="https://github.com/Vinimart"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>

            <li>
              <a
                className="justify-between"
                href="https://www.linkedin.com/in/vinimartdev/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
