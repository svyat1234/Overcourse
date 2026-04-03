import { notFound } from "next/navigation";
import AboutPromoSection from "@/components/blocks/AboutPromoSection";
import CourseQuestionsSection from "@/components/blocks/course/CourseQuestionsSection";
import ProfitSection from "@/components/blocks/course/ProfitSection";
import ReviewsInfoSection from "@/components/blocks/ReviewsInfoSection";
import SelectionSection from "@/components/blocks/SelectionSection";
import SkillsSection from "@/components/blocks/course/SkillsSection";
import TeachersSection from "@/components/blocks/course/TeachersSection";
import { courseToPromoData, getCourseBySlug, REVIEWS, SELECTION_CARDS } from "@/constants";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const promoData = courseToPromoData(course);
  return (
    <>
      <AboutPromoSection data={promoData} />
      <SkillsSection />
      <ProfitSection />
      <TeachersSection />
      <CourseQuestionsSection />
      <ReviewsInfoSection data={{ reviews: REVIEWS }} />
      <SelectionSection cards={SELECTION_CARDS} variant="main" />
    </>
  );
}
