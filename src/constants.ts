import type { AboutPromoSectionData } from "@/components/blocks/AboutPromoSection";

/**
 * Данные карточки курса для секции курсов.
 * Изображения: положи в public/images/ и используй пути /images/...
 * Либо импортируй из @/assets/images в компоненте.
 */
export type CourseTag = {
  label: string;
  href: string;
};

export type Course = {
  /** URL-slug страницы курса (например course-0, ux-ui-designer-plus) */
  slug?: string;
  /** Рейтинг от 1 до 5 */
  rating: number;
  /** Путь к логотипу школы (например /images/skypro.png) */
  schoolLogo: string;
  /** Путь к картинке карточки */
  image: string;
  /** Название курса */
  title: string;
  /** Срок обучения: число месяцев (подпись «мес» добавляется при отображении) */
  duration: number;
  /** Количество уроков (подпись «уроков» добавляется при отображении) */
  lessonsCount?: number;
  /** Теги (ссылки) */
  tags: CourseTag[];
  /** Краткое описание курса (опционально, для wide-варианта) */
  text?: string;
  /** Цена в месяц — только число, например "2 900" (подпись «₽», «в месяц» в UI) */
  pricePerMonth: string;
  /** Общая стоимость — только число, например "105 600" */
  priceTotal: string;
  /** Старая цена — только число, например "115 600" */
  priceOld: string;
};

const COURSES_TAGS: CourseTag[] = [
  { label: "Дизайн", href: "#" },
  { label: "Интерфейсы", href: "#" },
  { label: "Программирование", href: "#" },
];

// ============================================================
// Карточки выведены для удобства циклом с одинаковыми данными, 
// возможно так будет где нибудь ещё чтобы не засорять файл
// ============================================================

export const COURSES: Course[] = Array.from({ length: 60 }, (_, i) => ({
  slug: `course-${i}`,
  rating: 5,
  schoolLogo: "/images/courses/skypro.png",
  image: "/images/courses/courses-card.png",
  title: "UX/UI-дизайнер Plus",
  text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
  duration: 9,
  lessonsCount: 145,
  tags: COURSES_TAGS,
  pricePerMonth: "2 900",
  priceTotal: "105 600",
  priceOld: "115 600",
}));

/** Найти курс по slug (для страницы /courses/[slug]) */
export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

/** Преобразовать курс в данные для секции AboutPromo (промо-блок на странице курса). */
export function courseToPromoData(course: Course): AboutPromoSectionData {
  const descriptionParagraphs = course.text
    ? [course.text]
    : [
        "Для современных компаний бренд является важным элементом, от которого зависит успех экономической деятельности.",
        "Показатели для развития бренда и проводить запуск маркетинговых кампаний.",
      ];

  return {
    company: {
      logo: course.schoolLogo,
      rating: String(course.rating),
    },
    tags: course.tags,
    title: course.title,
    descriptionParagraphs,
    primaryButton: { href: "#", text: "Посмотреть курс" },
    image: { src: course.image, alt: course.title },
    infoCards: [
      {
        title: "Срок обучения",
        value: `${course.duration} мес`,
        subText: course.lessonsCount ? `${course.lessonsCount} уроков` : undefined,
      },
      {
        title: "Полная стоимость курса",
        value: `${course.priceTotal}₽`,
        subText: `${course.priceOld} ₽`,
        subTextStrike: true,
      },
      {
        title: "В рассрочку",
        value: `${course.pricePerMonth}₽`,
        subText: "В месяц",
      },
    ],
  };
}

// ============================================================
// Школы (страница школы /schools/[slug])
// ============================================================

export type SchoolTag = {
  label: string;
  href: string;
};

export type School = {
  /** URL-slug страницы школы */
  slug: string;
  /** Рейтинг, например 4.9 */
  rating: number;
  /** Путь к логотипу школы */
  logo: string;
  /** Название школы */
  title: string;
  /** Описание (абзацы для промо-блока) */
  descriptionParagraphs: string[];
  /** Теги */
  tags: SchoolTag[];
  /** Путь к изображению промо */
  image: string;
  /** Количество курсов */
  coursesCount: number;
  /** Средняя стоимость курса (число с пробелами, например "32 078") */
  averagePrice: string;
  /** Количество преподавателей */
  teachersCount: number;
};

const SCHOOLS_TAGS: SchoolTag[] = [
  { label: "Маркетинг", href: "#" },
  { label: "Бренд-менеджмент", href: "#" },
];

export const SCHOOLS: School[] = [
  {
    slug: "school-0",
    rating: 4.9,
    logo: "/images/courses/skypro.png",
    title: "Школа маркетинга",
    descriptionParagraphs: [
      "Для современных компаний бренд является важным элементом, от которого зависит успех экономической деятельности. В рамках освоения курса по бренд-менеджменту вы научитесь эффективно использовать показатели для развития бренда и проводить запуск маркетинговых кампаний.",
      "Курс отлично подойдет маркетологам для развития навыков по работе с рекламой и получения новых знаний в маркетинге.",
    ],
    tags: SCHOOLS_TAGS,
    image: "/images/courses/courses-card.png",
    coursesCount: 223,
    averagePrice: "32 078",
    teachersCount: 1113,
  },
];

/** Найти школу по slug */
export function getSchoolBySlug(slug: string): School | undefined {
  return SCHOOLS.find((s) => s.slug === slug);
}

/** Преобразовать школу в данные для AboutPromoSection (карточки без subText, первая — выделенная). */
export function schoolToPromoData(school: School): AboutPromoSectionData {
  return {
    company: {
      logo: school.logo,
      rating: String(school.rating),
    },
    tags: school.tags,
    title: school.title,
    descriptionParagraphs: school.descriptionParagraphs,
    primaryButton: { href: "#", text: "Перейти на сайт" },
    image: { src: school.image, alt: school.title },
    infoCards: [
      { title: "Курсов", value: `${school.coursesCount} ШТ`, highlight: true },
      { title: "Средняя стоимость", value: `${school.averagePrice}₽` },
      { title: "Преподавателей", value: `${school.teachersCount.toLocaleString("ru-RU")} чел` },
      { title: "рейтинг", value: String(school.rating) },
    ],
  };
}

// ============================================================
// Отзывы (секция «Отзывы» на странице курса и др.)
// ============================================================

export type ReviewItem = {
  authorName: string;
  date: string;
  /** Рейтинг 1–5 звёзд */
  rating: number;
  text: string;
  /** Внешняя ссылка «прочитать полностью»; если заданы поля модалки, открывается модалка */
  readMoreHref?: string;
  sourceLogo?: string;
  sourceLink?: string;
  voteGood?: number;
  voteBad?: number;
  avatar?: string;
  /** Данные для ReviewModal (город, курс, школа, фото справа) */
  city?: string;
  course?: string;
  school?: string;
  modalImg?: string;
  courseHref?: string;
};

/** Распределение отзывов по звёздам для статистики (5 → количество, 4 → количество, …) */
export type ReviewsByStar = { stars: number; count: number }[];

export const REVIEWS: ReviewItem[] = [
  {
    authorName: "Алина В.",
    date: "17.01.2024 г",
    rating: 1,
    text: "Лучше не ходите! После оплаты отношение резко меняется и все обещания забываются! Не очень хорошие курсы, отправляют постоянно искать все в интернете, на вопросы отвечать не любят. Только выкладывают свои вебинары, а как разбираться в теме - так это им не интересно.",
    sourceLogo: "/images/yandex.svg",
    sourceLink: "#",
    voteGood: 1,
    voteBad: 1,
    avatar: "/images/review-person.png",
    city: "Москва",
    course: "Python-разработчик",
    school: "Skillbox",
    modalImg: "/images/impressions/impressions-review.png",
    courseHref: "/courses/course-0",
  },
  {
    authorName: "Михаил К.",
    date: "02.02.2024 г",
    rating: 5,
    text: "Отличный курс, всё по делу. Преподаватели отвечают быстро, материалы структурированы. Рекомендую тем, кто хочет систематизировать знания и получить практические навыки.",
    sourceLogo: "/images/yandex.svg",
    sourceLink: "#",
    voteGood: 12,
    voteBad: 0,
    avatar: "/images/review-person.png",
    city: "Санкт-Петербург",
    course: "UX/UI-дизайнер Plus",
    school: "SkyPro",
    modalImg: "/images/impressions/impressions-review2.png",
    courseHref: "/courses/course-1",
  },
  {
    authorName: "Елена С.",
    date: "15.01.2024 г",
    rating: 4,
    text: "Хорошая подача материала, много примеров. Минус — иногда долго ждала ответа от куратора. В целом довольна результатом.",
    sourceLogo: "/images/yandex.svg",
    sourceLink: "#",
    voteGood: 5,
    voteBad: 1,
    avatar: "/images/review-person.png",
    city: "Казань",
    course: "Веб-разработчик",
    school: "GeekBrains",
    modalImg: "/images/impressions/impressions-review.png",
    courseHref: "/courses/course-2",
  },
];

/** Распределение отзывов по звёздам для блока статистики (по умолчанию в секции отзывов). */
export const REVIEWS_BY_STARS: ReviewsByStar = [
  { stars: 5, count: 507 },
  { stars: 4, count: 231 },
  { stars: 3, count: 89 },
  { stars: 2, count: 42 },
  { stars: 1, count: 170 },
];

// --- Карточки отзывов (впечатления студентов, слайдер, модалка «Прочитать полностью») ---

export type ReviewCard = {
  name: string;
  city: string;
  course: string;
  school: string;
  /** Полный текст отзыва */
  text: string;
  img: string;
  courseHref?: string;
};

/** Собирает объект для ReviewModal; null — модалку открывать нельзя */
export function reviewItemToModalReview(item: ReviewItem): ReviewCard | null {
  if (!item.city || !item.course || !item.school || !item.modalImg) return null;
  return {
    name: item.authorName,
    city: item.city,
    course: item.course,
    school: item.school,
    text: item.text,
    img: item.modalImg,
    courseHref: item.courseHref,
  };
}

/** Константа курсов. */
// export const COURSES: Course[] = [
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
//   {
//     rating: 5,
//     schoolLogo: "/images/courses/skypro.png",
//     image: "/images/courses/courses-card.png",
//     title: "UX/UI-дизайнер Plus",
//     text: "Наше дело не так однозначно, как может показаться: сплочённость команды профессионалов однозначно фиксирует необходимость новых принципов формирования материально-технической и кадровой базы.",
//     duration: "9 месяцев",
//     lessonsCount: 145,
//     tags: [
//       { label: "дизайн", href: "#" },
//       { label: "интерфейсы", href: "#" },
//       { label: "программирование", href: "#" },
//     ],
//     pricePerMonth: "2 900 ₽ в месяц",
//     priceTotal: "105 600 ₽",
//     priceOld: "115 600 ₽",
//   },
// ];

/** Тег подборки (ссылка) */
export type SelectionTag = {
  label: string;
  href: string;
};

/** Карточка подборки курсов (секция «Подборки курсов») */
export type SelectionCard = {
  /** Теги подборки */
  tags: SelectionTag[];
  /** Заголовок подборки */
  title: string;
  /** Путь к картинке (например /images/selection/selection1.png) */
  image: string;
  /** Ссылка карточки (куда ведёт клик) */
  href: string;
};

const SELECTION_TAGS: SelectionTag[] = [
  { label: "Дизайн", href: "#" },
  { label: "Frontend", href: "#" },
  { label: "Backend", href: "#" },
  { label: "Программирование", href: "#" },
  { label: "UX/UI", href: "#" },
];

/** 16 карточек подборок. Изображения: public/images/selection/selection1.png … selection16.png */
export const SELECTION_CARDS: SelectionCard[] = Array.from({ length: 16 }, (_, i) => ({
  tags: SELECTION_TAGS,
  title: "Научиться делать сайты и сервисы",
  image: `/images/selection/selection${i + 1}.png`,
  href: "#",
}));

// --- News section (новости и статьи) ---

/** Заглушка ссылки на страницу новости (потом — slug и т.д.) */
/** Пока нет slug в данных — заглушка под динамический маршрут `/news/[slug]` */
export const NEWS_ARTICLE_HREF_PLACEHOLDER = "/news/1" as const;

export type NewsTag = {
  label: string;
};

export type NewsCard = {
  tags: NewsTag[];
  title: string;
  text: string;
  image: string;
  /** Ссылка на страницу новости (`/news/[slug]`); иначе см. NEWS_ARTICLE_HREF_PLACEHOLDER */
  articleHref?: string;
};

const NEWS_TAGS: NewsTag[] = [
  { label: "Дизайн" },
  { label: "Frontend" },
  { label: "Backend" },
];

const NEWS_PLACEHOLDER_TEXT =
  "Картельные сговоры не допускают ситуации, при которой диаграммы связей, превозмогая сложившуюся непростую экономическую ситуацию, своевременно верифицированы. С другой стороны, понимание сути ресурсосберегающих технологий предоставлены сами себе.";

/** Все новости. На секции выводятся последние 5 (одна активная + 4 в списке). */
export const NEWS_CARDS: NewsCard[] = [
  { tags: NEWS_TAGS, title: "Как агрегаторы могут помочь в поиске подходящих курсов", text: NEWS_PLACEHOLDER_TEXT, image: "/images/news/news1.png" },
  { tags: NEWS_TAGS, title: "Как агрегаторы могут помочь в поиске подходящих курсов", text: NEWS_PLACEHOLDER_TEXT, image: "/images/news/news2.png" },
  { tags: NEWS_TAGS, title: "Как агрегаторы могут помочь в поиске подходящих курсов", text: NEWS_PLACEHOLDER_TEXT, image: "/images/news/news3.png" },
  { tags: NEWS_TAGS, title: "Как агрегаторы могут помочь в поиске подходящих курсов", text: NEWS_PLACEHOLDER_TEXT, image: "/images/news/news4.png" },
  { tags: NEWS_TAGS, title: "Как агрегаторы могут помочь в поиске подходящих курсов", text: NEWS_PLACEHOLDER_TEXT, image: "/images/news/news5.png" },
  { tags: NEWS_TAGS, title: "Как агрегаторы могут помочь в поиске ", text: NEWS_PLACEHOLDER_TEXT, image: "/images/news/news1.png" },
  { tags: NEWS_TAGS, title: "Как агрегаторы могут помочь в поиске подходящих курсов", text: NEWS_PLACEHOLDER_TEXT, image: "/images/news/news2.png" },
  { tags: NEWS_TAGS, title: "Как агрегаторы могут помочь в поиске подходящих ", text: NEWS_PLACEHOLDER_TEXT, image: "/images/news/news3.png" },
];
