import Image from "next/image";
import Link from "next/link";
import CourseCard from "@/components/ui/CourseCard";
import { COURSES } from "@/constants";
import "./NewsContent.scss";

const AUTHOR_AVATAR = "/images/review-person.png";

export default function NewsContent() {
  const topCourses = COURSES.slice(-2);

  return (
    <section className="news-content section container">
      <div className="news-content__left-column">
        <article className="news-content__profile-card">
          <div className="news-content__profile-top">
            <div className="news-content__avatar-wrap">
              <Image
                src={AUTHOR_AVATAR}
                alt=""
                className="news-content__avatar"
                fill
                sizes="48px"
              />
            </div>

            <div className="news-content__author-meta">
              <h3 className="news-content__author-name">
                Александр Какойнибудев
              </h3>
              <span className="news-content__author-role">
                Руководитель технического отдела
              </span>
            </div>
          </div>

          <Link href="/news" className="news-content__all-link">
            Все статьи
          </Link>
        </article>

        <article className="news-content__top-courses">
          <h3 className="news-content__top-courses-title">
            Топ курсов по Python
          </h3>

          <div className="news-content__top-courses-list">
            {topCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </article>
      </div>

      <div className="news-content__right-column">
        <nav className="news-content__breadcrumbs" aria-label="Хлебные крошки">
          <Link href="/" className="news-content__breadcrumb-link">
            Главная
          </Link>
          <span className="news-content__breadcrumb-sep">/</span>
          <Link href="/news" className="news-content__breadcrumb-link">
            Статьи
          </Link>
          <span className="news-content__breadcrumb-sep">/</span>
          <span className="news-content__breadcrumb-current">Срезы в Python</span>
        </nav>

        <h1 className="news-content__article-title">
          Срезы в Python: практическое руководство для разработчиков
        </h1>

        <div className="news-content__meta-row">
          <span className="news-content__meta-text news-content__meta-text--date">Опубликовано 12 мая</span>
          <span className="news-content__meta-text news-content__meta-text--views">5234 просмотра</span>
          <span className="news-content__meta-text news-content__meta-text--reading-time">8 мин чтения</span>
        </div>

        <div className="news-content__toc">
          <h3 className="news-content__toc-title">Содержание</h3>
          <ul className="news-content__toc-list">
            <li>1. Введение в концепцию срезов</li>
            <li>2. Базовый синтаксис: [start:stop]</li>
            <li>3. Работа с отрицательными индексами</li>
            <li>4. Использование шага в срезах [start:stop:step]</li>
            <li>5. Практические примеры и лайфхаки</li>
          </ul>
        </div>

        <p className="news-content__paragraph">
          Срезы (slices) - это мощный инструмент в Python, который позволяет
          извлекать части последовательностей (строк, списков, кортежей) с
          минимальными усилиями. Понимание того, как работают срезы, является
          критически важным навыком для любого Python-разработчика.
        </p>

        <h2 className="news-content__h2">Базовый синтаксис</h2>
        <p className="news-content__paragraph">
          Основной синтаксис среза выглядит следующим образом:
        </p>

        <pre className="news-content__code">sequence[start:stop]</pre>

        <ul className="news-content__list">
          <li>
            <strong>start:</strong> Индекс, с которого начинается срез
            (включительно).
          </li>
          <li>
            <strong>stop:</strong> Индекс, на котором срез заканчивается (не
            включительно).
          </li>
        </ul>

        <Image
          src="/images/news/news1.png"
          alt=""
          className="news-content__article-image"
          width={922}
          height={456}
          sizes="(max-width: 1200px) 100vw, 922px"
          style={{ width: "100%", height: "auto" }}
        />

        <h2 className="news-content__h2">Использование шага</h2>
        <p className="news-content__paragraph">
          Третий параметр, шаг (step), позволяет выбирать элементы через
          определенный интервал. Например, чтобы получить каждый второй элемент
          списка:
        </p>

        <pre className="news-content__code">
{`# Пример извлечения четных элементов
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
even_numbers = numbers[::2]
# Output: [0, 2, 4, 6, 8]`}
        </pre>

        <p className="news-content__tip">
          Совет: Используйте <code>[::-1]</code> для быстрого разворота строки
          или списка.
        </p>
      </div>
    </section>
  );
}
