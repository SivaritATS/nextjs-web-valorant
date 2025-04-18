import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md dark:bg-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-black dark:text-white">
          <Link
            href="/"
            className="hover:text-white transition-colors duration-300 text-red-500 text-3xl font-bold"
          >
            VALORANT LL
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="/character"
            className="text-black dark:text-white hover:text-blue-300 transition-colors duration-200 text-xl"
          >
            Character
          </Link>
          <Link
            href="/map"
            className="text-black dark:text-white hover:text-blue-300 transition-colors duration-200 text-xl"
          >
            Map
          </Link>
          <Link
            href="/weapon"
            className="text-black dark:text-white hover:text-blue-300 transition-colors duration-200 text-xl"
          >
            Weapon
          </Link>
          <Link
            href="/contact"
            className="text-black dark:text-white hover:text-blue-300 transition-colors duration-200 text-xl"
          >
            Contact
          </Link>
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-accent animate-ping"></div>
            <div className="status status-accent"></div>
          </div>{" "}
        </div>
      </div>
    </nav>
  );
}
