import { notFound } from "next/navigation";
import AboutPromoSection from "@/components/blocks/AboutPromoSection";
import CatalogSection from "@/components/blocks/courses/CatalogSection";
import ReviewsInfoSection from "@/components/blocks/ReviewsInfoSection";
import { COURSES, getSchoolBySlug, REVIEWS, schoolToPromoData } from "@/constants";

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = getSchoolBySlug(slug);
  if (!school) notFound();

  const promoData = schoolToPromoData(school);
  return (
    <>
      <AboutPromoSection data={promoData} />
      <CatalogSection courses={COURSES} variant="full" />
      <ReviewsInfoSection data={{ reviews: REVIEWS }} />
    </>
  ) 
}
