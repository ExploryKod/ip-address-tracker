import React from "react";

interface SectionProps {
  children: React.ReactNode;
  classNames?: string;
  fluid?: boolean;
}

export function Section({ children, classNames, fluid }: SectionProps): React.ReactElement {
  return <section className={`${fluid ? "section-container-fluid" : "section-container"} ${classNames}`}>{children}</section>;
}