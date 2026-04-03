/**
 * Вариант хедера по пути страницы.
 * По умолчанию везде "dark". Чтобы сделать светлый хедер — добавь путь в light.
 */
export const headerVariantByPath: Record<string, "light" | "dark"> = {
  "/": "light",
  // "/catalog": "dark",
  // "/news": "dark",
};

export const defaultHeaderVariant = "dark" as const;
