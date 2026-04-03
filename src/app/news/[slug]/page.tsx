import NewsContent from "@/components/blocks/news/NewsContent";
import NewsSection from "@/components/blocks/NewsSection";
import SelectionSection from "@/components/blocks/SelectionSection";
import { SELECTION_CARDS } from "@/constants";
import { Suspense } from "react";

export default function NewsArticlePage() {
  return (
    <>
      <NewsContent />
      <Suspense fallback={<div className="section container">Загрузка...</div>}>
        <NewsSection variant="full" />
      </Suspense>
      <SelectionSection cards={SELECTION_CARDS} />
    </>
  );
}

