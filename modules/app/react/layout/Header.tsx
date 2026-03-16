import React from "react";
import Image from "next/image";
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
        <CtaButton variant="secondary" >Try It Free</CtaButton>
      </div>
    </nav>
    </header>
  );
};




