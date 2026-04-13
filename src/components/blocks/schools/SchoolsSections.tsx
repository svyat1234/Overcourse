"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/Pagination";
import "./SchoolsSections.scss";
import Link from "next/link";

const SCHOOLS_CARD_SKELETON_ENABLED = true;

type SchoolListItem = {
  id: string;
  title: string;
  description: string;
  logo: string;
};

const PAGE_SIZE = 9;

const SCHOOLS_LIST: SchoolListItem[] = Array.from({ length: 34 }, (_, i) => ({
  id: `school-list-${i + 1}`,
  title: "Университет skypro",
  description:
    "Современный университет, в котором интересно учиться. В Talentsy помогают развивать талант, чтобы вы могли начать заниматься любимым делом и превратили свое увлечение в профессию.",
  logo: "/images/logo.svg",
}));

function SchoolsSectionsCardSkeleton() {
  return (
    <div className="schools-sections-card-skeleton" aria-hidden>
      <div className="schools-sections-card-skeleton__logo" />
      <div className="schools-sections-card-skeleton__line schools-sections-card-skeleton__line--title" />
      <div className="schools-sections-card-skeleton__lines">
        <div className="schools-sections-card-skeleton__line" />
        <div className="schools-sections-card-skeleton__line" />
        <div className="schools-sections-card-skeleton__line schools-sections-card-skeleton__line--short" />
      </div>
    </div>
  );
}

function SchoolsSectionsCard({ school }: { school: SchoolListItem }) {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onLogoLoad = useCallback(() => setLogoLoaded(true), []);
  const onLogoError = useCallback(() => setLogoLoaded(true), []);

  useEffect(() => {
    setLogoLoaded(false);
  }, [school.id, school.logo]);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLogoLoaded(true);
  }, [school.logo, school.id]);

  useEffect(() => {
    const t = window.setTimeout(() => setLogoLoaded(true), 15000);
    return () => clearTimeout(t);
  }, [school.logo, school.id]);

  const showSkeleton = SCHOOLS_CARD_SKELETON_ENABLED && !logoLoaded;

  return (
    <Link href={`/schools/school-0`}
      className={`schools-sections-card${showSkeleton ? " schools-sections-card--assets-loading" : ""}`}
    >
      {showSkeleton && <SchoolsSectionsCardSkeleton />}
      <div
        className={`schools-sections-card__inner${showSkeleton ? " schools-sections-card__inner--hidden" : ""}`}
      >
        <div className="schools-sections-card__logo-wrap" aria-hidden>
          <Image
            ref={imgRef}
            src={school.logo}
            alt=""
            className="schools-sections-card__logo"
            width={120}
            height={24}
            onLoad={onLogoLoad}
            onError={onLogoError}
          />
        </div>
        <h3 className="schools-sections-card__title">{school.title}</h3>
        <p className="schools-sections-card__desc">{school.description}</p>
      </div>
    </Link>
  );
}

export default function SchoolsSections() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldScrollAfterPageChangeRef = useRef(false);

  const [viewMode, setViewMode] = useState<"single" | "expanded">("single");
  const [visiblePages, setVisiblePages] = useState(1);

  const totalPages = Math.max(1, Math.ceil(SCHOOLS_LIST.length / PAGE_SIZE));

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
    const nextVisible = Math.min(totalPages, Math.max(visiblePages, currentPage) + 1);
    setVisiblePages(nextVisible);
    setViewMode("expanded");
    setPage(nextVisible);
  };

  const displayedSchools =
    viewMode === "single"
      ? SCHOOLS_LIST.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
      : SCHOOLS_LIST.slice(0, visiblePages * PAGE_SIZE);

  return (
    <section ref={sectionRef} className="schools-sections section container">
      <h1 className="schools-sections__title section-title">Все школы</h1>

      <div className="schools-sections__cards">
        {displayedSchools.map((school) => (
          <SchoolsSectionsCard key={school.id} school={school} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalItems={SCHOOLS_LIST.length}
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
