import React from "react";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@components/atomes/CtaButton";

export const Header: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <header className="pb-10 header-height w-full mx-auto bg-transparent">
    <nav
      className={`header-container flex flex-wrap items-center justify-between gap-4 w-full ${className}`.trim()}
    >
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </div>
      <div className="flex items-center gap-4">
        <Link href="/register" className="text-sm font-medium text-gray-700 hover:text-gray-900 underline focus:outline-none focus:ring-2 focus:ring-gray-500 rounded">
          Register
        </Link>
        <CtaButton variant="secondary" >Try It Free</CtaButton>
      </div>
    </nav>
    </header>
  );
};




