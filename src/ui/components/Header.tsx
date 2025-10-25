import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="px-10 py-2 flex gap-4 bg-white text-black justify-between h-10 shadow-sm">
      <nav className="flex flex-row gap-4 font-semibold">
        <Link
          to="/"
          activeProps={{
            className: "underline",
          }}
          className="text-[#282c34]"
        >
          Home
        </Link>
        <Link
          to="/shopping-cart"
          activeProps={{
            className: "underline",
          }}
          className="text-[#282c34]"
        >
          Shopping Cart
        </Link>
      </nav>
    </header>
  );
}
