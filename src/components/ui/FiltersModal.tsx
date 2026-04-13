"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MAX_PRICE_DEFAULT, MAX_DURATION_DEFAULT } from "@/components/blocks/courses/CatalogSection";
import "./FiltersModal.scss";

type FiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// ============================================================
// Константы для фильтров
// ============================================================
const DIRECTIONS = [
  "Программирование", "Маркетинг", "Дизайн", "Бизнес и управление", 
  "Аналитика", "Игры", "Другие профессии", "Саморазвитие", 
  "Финансы", "Психология", "Создание контента", "Детям и подросткам", 
  "Красота и здоровье"
];

const CATEGORIES = [
  "1С бухгалтерия", "1С-аналитика", "1С-разработка", "3D-моделирование", 
  "Android-разработка", "C#-разработка", "C++-разработка", "CRM-маркетинг", 
  "Data Engineering", "Data Science", "Event-менеджмент", "Excel и Google Таблицы", 
  "Frontend-разработка", "FullStack-разработка", "Go-разработка", "HR-аналитика", 
  "HTML и CSS вёрстка", "IT-рекрутинг", "Influence-маркетинг", "Java-разработка", 
  "JavaScript-разработка", "MBA", "Motion-дизайн", "PHP-разработка", 
  "PR-менеджмент", "Performance-маркетинг", "Python-разработка", "Ruby-разработка", 
  "SEO", "SMM-маркетинг", "Soft skills", "UX/UI-дизайн", "Веб-разработка"
];

const SCHOOLS = [
  "#Sekta", "100балльный репетитор", "Anecole", "Bang Bang Education", 
  "Bonnie & Slide", "City Business School", "Coddy", "Contented", 
  "Digital Skills Academy", "Skillbox", "Нетология", "GeekBrains"
];

export default function FiltersModal({ isOpen, onClose }: FiltersModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Локальный стейт модалки (применяется к URL только по кнопке "Показать результаты")
  const [selectedDirections, setSelectedDirections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: MAX_PRICE_DEFAULT });
  const [durationRange, setDurationRange] = useState({ min: 0, max: MAX_DURATION_DEFAULT });
  const [rating, setRating] = useState<string>("Любой");
  const [level, setLevel] = useState<string>("Любой");
  const [jobHelp, setJobHelp] = useState<string>("Не важно");
  const [format, setFormat] = useState<string>("Онлайн");
  const [isFree, setIsFree] = useState(false);
  const [isInstallment, setIsInstallment] = useState(false);

  // Инициализация стейта из URL при открытии
  useEffect(() => {
    if (isOpen) {
      setSelectedDirections(searchParams.getAll("directions"));
      setSelectedCategories(searchParams.getAll("categories"));
      setSelectedSchools(searchParams.getAll("schools"));
      
      const minPrice = searchParams.get("min_price");
      const maxPrice = searchParams.get("max_price");
      setPriceRange({
        min: minPrice ? Number(minPrice) : 0,
        max: maxPrice ? Number(maxPrice) : MAX_PRICE_DEFAULT,
      });

      const minDur = searchParams.get("min_duration");
      const maxDur = searchParams.get("max_duration");
      setDurationRange({
        min: minDur ? Number(minDur) : 0,
        max: maxDur ? Number(maxDur) : MAX_DURATION_DEFAULT,
      });

      setRating(searchParams.get("rating_gte") ? `${searchParams.get("rating_gte")} и выше` : "Любой");
      const lvl = searchParams.get("level");
      setLevel(lvl === "новичок" ? "Для новичков" : lvl === "специалист" ? "Для специалистов" : "Любой");
      
      const jh = searchParams.get("job_help");
      setJobHelp(jh === "true" ? "Предоставляется" : jh === "false" ? "Отсутствует" : "Не важно");
      setFormat(searchParams.get("format") || "Онлайн");
      setIsFree(searchParams.get("is_free") === "true");
      setIsInstallment(searchParams.get("is_installment") === "true");
    }
  }, [isOpen, searchParams]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // ============================================================
  // Применение фильтров: собираем параметры и пушим в URL
  // ============================================================
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Очищаем старые множественные параметры перед добавлением новых
    params.delete("directions");
    selectedDirections.forEach(d => params.append("directions", d));
    
    params.delete("categories");
    selectedCategories.forEach(c => params.append("categories", c));
    
    params.delete("schools");
    selectedSchools.forEach(s => params.append("schools", s));

    // Цена
    if (priceRange.min > 0) params.set("min_price", priceRange.min.toString());
    else params.delete("min_price");

    if (priceRange.max < MAX_PRICE_DEFAULT) params.set("max_price", priceRange.max.toString());
    else params.delete("max_price");

    // Длительность
    if (durationRange.min > 0) params.set("min_duration", durationRange.min.toString());
    else params.delete("min_duration");

    if (durationRange.max < MAX_DURATION_DEFAULT) params.set("max_duration", durationRange.max.toString());
    else params.delete("max_duration");

    // Рейтинг
    if (rating !== "Любой") {
      const match = rating.match(/[\d.]+/);
      if (match) params.set("rating_gte", match[0]);
    } else {
      params.delete("rating_gte");
    }

    // Радио кнопки
    if (level === "Для новичков") params.set("level", "новичок");
    else if (level === "Для специалистов") params.set("level", "специалист");
    else params.delete("level");

    if (jobHelp === "Предоставляется") params.set("job_help", "true");
    else if (jobHelp === "Отсутствует") params.set("job_help", "false");
    else params.delete("job_help");

    if (format !== "Онлайн" && format !== "Любой") params.set("format", format);
    else params.delete("format");

    // Чекбоксы
    if (isFree) params.set("is_free", "true");
    else params.delete("is_free");

    if (isInstallment) params.set("is_installment", "true");
    else params.delete("is_installment");

    // Сброс пагинации при фильтрации
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    onClose();
  };

  const resetFilters = () => {
    setSelectedDirections([]);
    setSelectedCategories([]);
    setSelectedSchools([]);
    setPriceRange({ min: 0, max: MAX_PRICE_DEFAULT });
    setDurationRange({ min: 0, max: MAX_DURATION_DEFAULT });
    setRating("Любой");
    setLevel("Любой");
    setJobHelp("Не важно");
    setFormat("Онлайн");
    setIsFree(false);
    setIsInstallment(false);
  };

  return (
    <div className="filters-modal-overlay" onClick={onClose}>
      <div className="filters-modal" onClick={(e) => e.stopPropagation()}>
        <div className="filters-modal__header">
          <h2 className="filters-modal__title">Все фильтры</h2>
          <button className="filters-modal__close" onClick={onClose} aria-label="Закрыть" />
        </div>

        <div className="filters-modal__content">
          <div className="filters-modal__grid">
            {/* Левая колонка */}
            <div className="filters-modal__col">
              <div className="filters-modal__section">
                <h3 className="filters-modal__section-title">Все направления</h3>
                <div className="filters-modal__checkbox-list">
                  {DIRECTIONS.map(item => (
                    <label key={item} className="filters-modal__checkbox">
                      <input type="checkbox" checked={selectedDirections.includes(item)} onChange={() => toggleItem(selectedDirections, setSelectedDirections, item)} />
                      <span className="filters-modal__checkbox-text">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filters-modal__section">
                <h3 className="filters-modal__section-title">Категория</h3>
                <div className="filters-modal__checkbox-list filters-modal__checkbox-list--large">
                  {CATEGORIES.map(item => (
                    <label key={item} className="filters-modal__checkbox">
                      <input type="checkbox" checked={selectedCategories.includes(item)} onChange={() => toggleItem(selectedCategories, setSelectedCategories, item)} />
                      <span className="filters-modal__checkbox-text">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Правая колонка */}
            <div className="filters-modal__col">
              <div className="filters-modal__section">
                <h3 className="filters-modal__section-title">Цена курса</h3>
                <div className="filters-modal__price-inputs">
                  <div className="filters-modal__field">
                    <span>от</span>
                    <input type="number" value={priceRange.min || ""} onChange={(e) => setPriceRange({...priceRange, min: +e.target.value})} />
                    <span>₽</span>
                  </div>
                  <div className="filters-modal__field">
                    <span>до</span>
                    <input type="number" value={priceRange.max || ""} onChange={(e) => setPriceRange({...priceRange, max: +e.target.value})} />
                    <span>₽</span>
                  </div>
                </div>
                <div className="filters-modal__row-checkboxes">
                  <label className="filters-modal__checkbox">
                    <input type="checkbox" checked={isFree} onChange={() => setIsFree(!isFree)} />
                    <span className="filters-modal__checkbox-text">Только бесплатные</span>
                  </label>
                  <label className="filters-modal__checkbox">
                    <input type="checkbox" checked={isInstallment} onChange={() => setIsInstallment(!isInstallment)} />
                    <span className="filters-modal__checkbox-text">В рассрочку</span>
                  </label>
                </div>
              </div>

              <div className="filters-modal__section">
                <h3 className="filters-modal__section-title">Рейтинг</h3>
                <div className="filters-modal__radio-group">
                  {["Любой", "4.5 и выше", "4.0 и выше", "3.5 и выше"].map(r => (
                    <label key={r} className="filters-modal__radio">
                      <input type="radio" name="rating" checked={rating === r} onChange={() => setRating(r)} />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filters-modal__section">
                <h3 className="filters-modal__section-title">Длительность</h3>
                <div className="filters-modal__price-inputs">
                  <div className="filters-modal__field">
                    <span>от</span>
                    <input type="number" value={durationRange.min || ""} onChange={(e) => setDurationRange({...durationRange, min: +e.target.value})} />
                    <span>мес.</span>
                  </div>
                  <div className="filters-modal__field">
                    <span>до</span>
                    <input type="number" value={durationRange.max || ""} onChange={(e) => setDurationRange({...durationRange, max: +e.target.value})} />
                    <span>мес.</span>
                  </div>
                </div>
              </div>

              <div className="filters-modal__section">
                <h3 className="filters-modal__section-title">Онлайн-школа</h3>
                <div className="filters-modal__checkbox-list">
                  {SCHOOLS.map(item => (
                    <label key={item} className="filters-modal__checkbox">
                      <input type="checkbox" checked={selectedSchools.includes(item)} onChange={() => toggleItem(selectedSchools, setSelectedSchools, item)} />
                      <span className="filters-modal__checkbox-text">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filters-modal__section">
                <h3 className="filters-modal__section-title">Уровень сложности</h3>
                <div className="filters-modal__radio-group">
                  {["Любой", "Для новичков", "Для специалистов"].map(l => (
                    <label key={l} className="filters-modal__radio">
                      <input type="radio" name="level" checked={level === l} onChange={() => setLevel(l)} />
                      <span>{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filters-modal__section">
                <h3 className="filters-modal__section-title">Помощь в трудоустройстве</h3>
                <div className="filters-modal__radio-group">
                  {["Не важно", "Предоставляется", "Отсутствует"].map(h => (
                    <label key={h} className="filters-modal__radio">
                      <input type="radio" name="jobHelp" checked={jobHelp === h} onChange={() => setJobHelp(h)} />
                      <span>{h}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filters-modal__section">
                <h3 className="filters-modal__section-title">Форма обучения</h3>
                <div className="filters-modal__radio-group">
                  {["Онлайн", "Офлайн"].map(f => (
                    <label key={f} className="filters-modal__radio">
                      <input type="radio" name="format" checked={format === f} onChange={() => setFormat(f)} />
                      <span>{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="filters-modal__footer">
          <button className="filters-modal__reset" onClick={resetFilters}>
            Сбросить всё
          </button>
          <button className="filters-modal__apply" onClick={applyFilters}>
            Показать результаты
          </button>
        </div>
      </div>
    </div>
  );
}
