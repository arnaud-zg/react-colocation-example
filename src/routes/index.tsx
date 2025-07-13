import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main
      style={{ height: 'calc(100vh - 2.5rem)' }}
      className="flex flex-col items-center justify-center bg-[#282c34] text-white px-6 text-base sm:text-lg md:text-xl lg:text-[1.375rem]"
    >
      <img
        src={logo}
        className="h-[20vmin] pointer-events-none mb-8"
        alt="React logo"
      />
      <h1 className="mb-6 text-4xl font-extrabold leading-tight text-center">
        Code Colocation in React
      </h1>
      <p className="max-w-3xl mb-8 text-center leading-relaxed text-gray-300">
        Organize your React code by colocating components, hooks, and styles
        within feature folders. This approach keeps your frontend codebase
        clean, maintainable, and scalable.
      </p>
      <a
        href="https://your-substack-link.substack.com/p/code-colocation-react"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#61dafb] hover:underline font-semibold transition-colors duration-200"
      >
        Read my article about code colocation
      </a>
    </main>
  );
}
