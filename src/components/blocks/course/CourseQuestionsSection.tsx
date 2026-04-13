import QuestionCards from "@/components/ui/QuestionCards";
import type { QuestionCardItem } from "@/components/ui/QuestionCards";
import "./CourseQuestionsSection.scss";

const INFO_TEXTS = ["6 модулей", "123 онлайн-уроков"] as const;

const QUESTIONS_ITEMS: QuestionCardItem[] = [
  { title: "Как агрегаторы могут помочь в поиске подходящих курсов?", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
  { title: "Слияние и поглощение", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
  { title: "Новая политика или регламент", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
  { title: "А также явные признаки", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
  { title: "Институционализации и по сей день", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
  { title: "Распределены по отраслям", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
];

export default function CourseQuestionsSection() {
  return (
    <section className="course-questions section container">
      <div className="course-questions__heading">
        <h2 className="course-questions__title section-title-default">
          Программа<span className="section-title-default--accent"> курса</span>
        </h2>
        <div className="course-questions__info">
          {INFO_TEXTS.map((text) => (
            <span key={text} className="course-questions__info-text">
              {text}
            </span>
          ))}
        </div>
      </div>
      <QuestionCards items={QUESTIONS_ITEMS} />
    </section>
  );
}
