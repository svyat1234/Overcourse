import Link from "next/link";
import "./not-found.scss";
import PromoLoopGlass from "@/components/ui/PromoLoopGlass";

export default function NotFoundPage() {
  return (
    <section className="not-found-page section container">
      <div className="not-found-page__content">
        <h1 className="not-found-page__code">404</h1>
        <p className="not-found-page__text">Упс! Такой страницы не существует!</p>
        <Link href="/" className="not-found-page__button button">
          Перейти на главную
        </Link>
        <PromoLoopGlass />
      </div>
    </section>
  );
}
