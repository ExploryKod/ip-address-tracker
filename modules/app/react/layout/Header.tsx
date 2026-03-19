"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useElementHeightCssVar } from "@modules/app/react/hooks/useElementHeightCssVar";
import CtaButton from "@components/atomes/CtaButton";

export const Header: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { ref } = useElementHeightCssVar({
		cssVarName: "--header-height",
		initialPx: 50,
		writeTo: "root",
	})
  
  return (
    <header ref={ref} className="relative pb-3 header-height w-full mx-auto bg-transparent z-10">
    <nav
      className={`header-container flex flex-wrap items-center justify-between gap-4 w-full ${className}`.trim()}
    >
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="Logo" width={30} height={30} />
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500 rounded">
          Log in
        </Link>
        <Link href="/register" className="text-sm font-medium text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500 rounded">
          Register
        </Link>
      </div>
    </nav>
    </header>
  );
};




