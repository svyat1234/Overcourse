import { Suspense } from "react";
import CatalogSection from "@/components/blocks/courses/CatalogSection";
import { COURSES } from "@/constants";

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="section container">Загрузка...</div>}>
      <CatalogSection courses={COURSES} variant="full" />
    </Suspense>
  );
}
