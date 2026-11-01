import { useEffect } from 'react';

type Meta = { title: string; description: string; image?: string };

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Sets a unique title, description and Open Graph tags per page. */
export function useDocumentMeta({ title, description, image }: Meta) {
  useEffect(() => {
    const full = `${title} | Trusted Roofing Systems`;
    document.title = full;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', full);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    if (image) setMeta('meta[property="og:image"]', 'property', 'og:image', image);
  }, [title, description, image]);
}
