import "./SkillsSection.scss";

const SKILLS = [
  "Определять на старте требования к ПО и контролировать их соблюдение",
  "Заниматься внутренним и внешним управлением для создания и презентации качественного IT-проекта",
  "Разбираться в основах UX/UI-дизайна, бизнес-анализа и программирования и организовывать успешное взаимодействие с коллегами",
  "Владеть инструментами и специальными техниками управления проектами в сфере IT",
  "Формировать команду для выполнения IT-проекта и организовывать успешное взаимодействие с коллегами",
  "Определять на старте требования к ПО и контролировать их соблюдение",
];

export default function SkillsSection() {
  return (
    <section className="skills section container">
      <h2 className="skills__title section-title-default">
        Чему вы<span className="section-title-default--accent"> научитесь</span>
      </h2>
      <div className="skills__cards">
        {SKILLS.map((text, i) => (
          <div key={i} className="skills__card">
            <p className="skills__card-text">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
