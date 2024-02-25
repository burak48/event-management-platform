"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
    return (
        <header className="py-4">
            <nav className="container mx-auto flex items-center justify-center">
                <Link href="/" className="text-black text-xl font-bold">
                    HOME
                </Link>
            </nav>
        </header>
    )
}

export default Header;
