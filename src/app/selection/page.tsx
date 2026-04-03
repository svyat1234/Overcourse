// ВРЕМЕННО ОТКЛЮЧЕНО:
// import { Suspense } from "react";
// import SelectionPageSection from "@/components/blocks/selection/SelectionPageSection";
//
// export default function SelectionPage() {
//   return (
//     <Suspense fallback={<div className="section container">Загрузка...</div>}>
//       <SelectionPageSection />
//     </Suspense>
//   );
// }

import { notFound } from "next/navigation";

export default function SelectionPage() {
  notFound();
}
