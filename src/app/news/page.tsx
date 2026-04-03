import { Suspense } from "react";
import NewsSection from "@/components/blocks/NewsSection";
import "./page.scss";

export default function NewsPage() {
  return (
    <div className="page-news">
      <Suspense fallback={<div className="section container">Загрузка...</div>}>
        <NewsSection variant="full" />
      </Suspense>
    </div>
  );
}
