import { Suspense } from "react";
import SchoolsSections from "@/components/blocks/schools/SchoolsSections";

export default function SchoolsPage() {
  return (
    <Suspense fallback={<div className="section container">Загрузка...</div>}>
      <SchoolsSections />
    </Suspense>
  );
}
