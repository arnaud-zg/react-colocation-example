import logo from "@/assets/logo.svg";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main
      style={{ height: "calc(100vh - 2.5rem)" }}
      className="flex flex-col items-center justify-center bg-[#282c34] text-white px-6 text-base sm:text-lg md:text-xl lg:text-[1.375rem]"
    >
      <img
        src={logo}
        className="h-[20vmin] pointer-events-none mb-8"
        alt="React logo"
      />
      <h1 className="mb-6 text-4xl font-extrabold leading-tight text-center">
        Maintainable Frontend Architecture with React
      </h1>
      <p className="max-w-3xl mb-8 text-center leading-relaxed text-gray-300">
        This site is a hands-on demo showing how to apply{" "}
        <strong>Object Calisthenics</strong> in a front-end app. You'll see how
        keeping objects small, simple, and focused makes your React code easier
        to understand and maintain.
      </p>
      <p className="max-w-3xl mb-8 text-center leading-relaxed text-gray-300">
        Take a few moments to explore the interactive experience, then dive into
        the code to see these principles in action.
      </p>

      <div className="flex flex-col gap-2">
        {/* <a
          href="https://your-substack-link.substack.com/p/code-colocation-react"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#61dafb] hover:underline font-semibold transition-colors duration-200"
        >
          🔗 Read my article about applying object calisthenics to user interface code
        </a> */}
        <a
          href="https://github.com/arnaud-zg/react-object-calisthenics"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#61dafb] hover:underline font-semibold transition-colors duration-200"
        >
          🔗 View the GitHub project
        </a>

        <Link
          to="/shopping-cart"
          className="text-[#61dafb] hover:underline font-semibold transition-colors duration-200"
        >
          🛒 Try the Shopping Cart Experience
        </Link>
      </div>
    </main>
  );
}
