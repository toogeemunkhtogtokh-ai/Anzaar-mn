export const MOCK_MODE = false;

export const TEST_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
    <rect width="1200" height="675" fill="#8a8a8a"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial, sans-serif" font-size="96" font-weight="700" fill="#ffffff">
      TEST
    </text>
  </svg>
`)}`;

export function makeMockArticle(item, index = 0) {
  if (!MOCK_MODE) return item;

  return {
    ...item,
    title: `Жишээ гарчиг ${index + 1}`,
    excerpt: "Жишээ текст",
    content:
      "Жишээ текст. Энэ хэсэгт нийтлэлийн үндсэн агуулга байрлана. Сайтын харагдац, зай хэмжээ, уншигдах байдлыг шалгах зорилготой түр текст юм.",
    image: TEST_IMAGE,
    label: item.label || "TEST",
  };
}

export function mockArticles(items = []) {
  if (!MOCK_MODE) return items;

  return items.map((item, index) => makeMockArticle(item, index));
}

export function mockArticle(item, index = 0) {
  if (!item) return item;
  return makeMockArticle(item, index);
}
