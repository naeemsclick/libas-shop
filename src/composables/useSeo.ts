import { watchEffect } from 'vue';

export interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const DEFAULT_TITLE = 'LIBAS Shop | YOUR CHOICE OUR PROMISE';
const DEFAULT_DESC = 'LIBAS Shop - Modern e-commerce destination for modest fashion, Jubba, Abaya, Perfumes, Watches, Shoes, and Sunnah essentials.';
const DEFAULT_IMAGE = 'https://libas.shop/images/logo.png';
const DEFAULT_URL = 'https://libas.shop/';

function setMetaTag(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const matches = selector.match(/\[(.*?)\]/);
    if (matches && matches[1]) {
      const [attrName, attrVal] = matches[1].split('=');
      const cleanAttrVal = attrVal.replace(/"/g, '');
      el.setAttribute(attrName, cleanAttrVal);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function useSeo(options: SeoOptions) {
  watchEffect(() => {
    const titleText = options.title ? `${options.title} | LIBAS Shop` : DEFAULT_TITLE;
    document.title = titleText;

    const descText = options.description || DEFAULT_DESC;
    const imgUrl = options.image || DEFAULT_IMAGE;
    const pageUrl = options.url || (typeof window !== 'undefined' ? window.location.href : DEFAULT_URL);

    setMetaTag('meta[name="description"]', 'content', descText);
    setMetaTag('meta[property="og:title"]', 'content', titleText);
    setMetaTag('meta[property="og:description"]', 'content', descText);
    setMetaTag('meta[property="og:image"]', 'content', imgUrl);
    setMetaTag('meta[property="og:image:secure_url"]', 'content', imgUrl);
    setMetaTag('meta[property="og:url"]', 'content', pageUrl);
    
    setMetaTag('meta[name="twitter:title"]', 'content', titleText);
    setMetaTag('meta[name="twitter:description"]', 'content', descText);
    setMetaTag('meta[name="twitter:image"]', 'content', imgUrl);
  });
}

