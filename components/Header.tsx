"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto px-4 sm:px-0 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
            HOME
        </Link>
      </nav>
    </header>
  );
};

export default Header;
