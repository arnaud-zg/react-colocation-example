import { Link } from '@tanstack/react-router'

const BASE_URL = import.meta.env.BASE_URL

export default function Header() {
  return (
    <header className="px-10 py-2 flex gap-4 bg-white text-black justify-between h-10 shadow-sm">
      <nav className="flex flex-row gap-4">
        <div className="font-semibold">
          <Link
            to={BASE_URL}
            activeProps={{
              className: 'underline',
            }}
            className="text-[#282c34]"
          >
            Home
          </Link>
        </div>
      </nav>
    </header>
  )
}
