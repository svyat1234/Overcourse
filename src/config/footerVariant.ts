/**
 * Вариант футера по пути страницы.
 * По умолчанию везде "dark". Чтобы сделать светлый футер — добавь путь в light.
 */
export const footerVariantByPath: Record<string, "light" | "dark"> = {
  "/": "light",
};

export const defaultFooterVariant = "dark" as const;
