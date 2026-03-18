export const injectHeadingIds = (html) => {
  if (!html) return html;

  let idCounter = 0;

  return html.replace(/<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/gi, (match, level, attrs, content) => {
    if (/id\s*=\s*["']/.test(attrs)) {
      return match;
    }

    const id = `heading-${idCounter++}`;
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
};
