import { Suspense } from "react";
import Hero from "@/components/blocks/home/Hero";
import CatalogSection from "@/components/blocks/courses/CatalogSection";
import { COURSES, SELECTION_CARDS } from "@/constants";
import ImpressionsSection from "@/components/blocks/home/ImpressionsSection";
import ReviewsSection from "@/components/blocks/home/ReviewsSection";
import SchoolsSection from "@/components/blocks/home/SchoolsSection";
import TopCoursesSection from "@/components/blocks/home/TopCoursesSection";
import SelectionSection from "@/components/blocks/SelectionSection";
import AboutSection from "@/components/blocks/AboutSection";
import NewsSection from "@/components/blocks/NewsSection";
import QuestionsSection from "@/components/blocks/home/QuestionsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="section container">Загрузка...</div>}>
        <CatalogSection courses={COURSES.slice(-8)} variant="small" />
      </Suspense>
      <ImpressionsSection />
      <ReviewsSection />
      <SchoolsSection />
      <TopCoursesSection />
      {/* Временно отключен, доработка будет позже */}
      {/* <SelectionSection cards={SELECTION_CARDS} /> */}
      <AboutSection />
      <Suspense fallback={<div className="section container">Загрузка...</div>}>
        <NewsSection />
      </Suspense>
      <QuestionsSection />
    </>
  );
}
