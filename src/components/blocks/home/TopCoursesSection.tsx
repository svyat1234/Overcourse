import CourseCard from "@/components/ui/CourseCard";
import { COURSES } from "@/constants";


//  ==============================================================
//  Временно пока нет рейтинга по курсам просто выводятся 5 курсов
//  ==============================================================

const TOP_COURSES_COUNT = 5;

export default function TopCoursesSection() {
  const topCourses = COURSES.slice(-TOP_COURSES_COUNT);

  return (
    <section className="top-courses top-courses--small section">
      <div className="top-courses__wrap">
        <div className="container">
          <h2 className="top-courses__title section-title">
            <span className="section-title--accent">Топ-5 курсов</span> по отзывам учеников
          </h2>
          <div className="top-courses__cards-wrap">
            <div className="top-courses__cards">
              {topCourses.map((course, i) => (
                <CourseCard
                  key={`${course.title}-${i}`}
                  course={course}
                  variant="wide"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
