import QuestionCards from "@/components/ui/QuestionCards";
import type { QuestionCardItem } from "@/components/ui/QuestionCards";
import "./QuestionsSection.scss";

const QUESTIONS_ITEMS: QuestionCardItem[] = [
  { title: "Как агрегаторы могут помочь в поиске подходящих курсов?", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
  { title: "Слияние и поглощение", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
  { title: "Новая политика или регламент", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
  { title: "А также явные признаки", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
  { title: "Институционализации и по сей день", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
  { title: "Распределены по отраслям", text: "Предварительное исследование необходимо, если компания намерена расширить ассортимент своих товаров и услуг." },
];

export default function QuestionsSection() {
  return (
    <section className="questions section container">
      <h2 className="questions__title section-title">
        Остались<span className="section-title--accent"> вопросы?</span>
      </h2>
      <QuestionCards items={QUESTIONS_ITEMS} />
    </section>
  );
}
