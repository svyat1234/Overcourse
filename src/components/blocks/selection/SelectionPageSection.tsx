"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SELECTION_CARDS } from "@/constants";
import SelectionCard from "@/components/ui/SelectionCard";
import Pagination from "@/components/ui/Pagination";
import "./SelectionPageSection.scss";

const PAGE_SIZE = 16;

export default function SelectionPageSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldScrollAfterPageChangeRef = useRef(false);
  const [viewMode, setViewMode] = useState<"single" | "expanded">("single");
  const [visiblePages, setVisiblePages] = useState(1);

  const totalPages = Math.max(1, Math.ceil(SELECTION_CARDS.length / PAGE_SIZE));

  const currentPage = useMemo(() => {
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    if (!Number.isFinite(page) || page < 1) return 1;
    return Math.min(page, totalPages);
  }, [searchParams, totalPages]);

  const setPage = (page: number) => {
    const url = page === 1 ? pathname : `${pathname}?page=${page}`;
    router.replace(url, { scroll: false });
  };

  const goToPage = (page: number) => {
    shouldScrollAfterPageChangeRef.current = true;
    setViewMode("single");
    setPage(page);
  };

  useEffect(() => {
    if (!shouldScrollAfterPageChangeRef.current) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!shouldScrollAfterPageChangeRef.current) return;
        shouldScrollAfterPageChangeRef.current = false;
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [currentPage]);

  const handleShowMore = () => {
    shouldScrollAfterPageChangeRef.current = true;
    const nextVisible = Math.min(totalPages, visiblePages + 1);
    setVisiblePages(nextVisible);
    setViewMode("expanded");
    setPage(nextVisible);
  };

  const displayedCards =
    viewMode === "single"
      ? SELECTION_CARDS.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
      : SELECTION_CARDS.slice(0, visiblePages * PAGE_SIZE);

  return (
    <section ref={sectionRef} className="selection section container">
      <div className="selection__heading">
        <h1 className="selection__title section-title">
          Подборки<span className="section-title--accent"> курсов</span>
        </h1>
        <div className="selection__interaction">
          <span className="section-title section-title--accent">от overcourse</span>
        </div>
      </div>

      <div className="selection__cards">
        {displayedCards.map((card, i) => (
          <div key={i} className="selection-card">
            <SelectionCard card={card} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalItems={SELECTION_CARDS.length}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={goToPage}
          showMoreButton={
            currentPage < totalPages
              ? { text: "Показать ещё", onClick: handleShowMore }
              : undefined
          }
        />
      )}
    </section>
  );
}
