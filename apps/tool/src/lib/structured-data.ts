import { SITE_URL } from './site';

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

interface BreadcrumbItem {
  readonly name: string;
  readonly path: string;
}

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

export function breadcrumbStructuredData(items: ReadonlyArray<BreadcrumbItem>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqStructuredData(items: ReadonlyArray<FaqItem>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

interface ToolPageStructuredDataOptions {
  readonly name: string;
  readonly path: string;
  readonly description: string;
  readonly breadcrumbName: string;
}

export function toolPageStructuredData({ name, path, description, breadcrumbName }: ToolPageStructuredDataOptions) {
  const url = absoluteUrl(path);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      '@id': `${url}#app`,
      name,
      url,
      description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
      inLanguage: 'ja',
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
    },
    breadcrumbStructuredData([
      { name: 'Kal.L', path: '/' },
      { name: '便利ツール集', path: '/tool' },
      { name: breadcrumbName, path },
    ]),
  ];
}
