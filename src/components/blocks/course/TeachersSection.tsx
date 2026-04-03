import Image from "next/image";
import "./TeachersSection.scss";

const TEACHERS = [
  {
    image: "/images/teacher03.png",
    name: "Александр Какойнибудев",
    job: "Руководитель технического отдела",
  },
  {
    image: "/images/teacher02.png",
    name: "Анастасия Кибербулевна",
    job: "Маркетолог",
  },
  {
    image: "/images/teacher01.png",
    name: "Ольга Смирнова",
    job: "Организационный консультант",
  },
] as const;

export default function TeachersSection() {
  return (
    <section className="teachers section container">
      <h2 className="teachers__title section-title-default">Преподаватели</h2>
      <div className="teachers__cards">
        {TEACHERS.map((teacher) => (
          <div key={teacher.name} className="teachers__card">
            <div className="teachers__img-wrap">
              <Image
                src={teacher.image}
                alt=""
                className="teachers__img"
                width={170}
                height={170}
              />
            </div>
            <div className="teachers__card-info">
              <span className="teachers__card-title">{teacher.name}</span>
              <span className="teachers__card-job">{teacher.job}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
