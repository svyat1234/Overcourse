"use client";

import dynamic from "next/dynamic";

const ScrollRevealHeadings = dynamic(
  () => import("@/components/animations/ScrollRevealHeadings"),
  { ssr: false }
);

/** Обёртка: `ssr: false` разрешён только в Client Component */
export default function ScrollRevealHeadingsLoader() {
  return <ScrollRevealHeadings />;
}
