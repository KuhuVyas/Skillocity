// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/about" },
  { name: "Find Swap", href: "/events" },
  { name: "Announcements", href: "/announcements" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b bg-white fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Logo or App Name */}
        <Link href="/" className="text-xl font-semibold text-black">
          SkillSwap
        </Link>

        {/* Center: Navigation Links */}
        <div className="flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "relative pb-2 px-2 text-sm font-medium transition-all duration-200 rounded-md",
                pathname === link.href
                  ? "text-black bg-gray-100 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black"
                  : "text-gray-500 hover:text-black hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-[2px] hover:after:w-full hover:after:bg-black"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/sign-up"
            className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:scale-105 transition-transform"
          >
            Sign Up
          </Link>
          <Link
            href="/sign-in"
            className="text-sm text-black font-medium hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
