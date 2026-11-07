import { createFileRoute } from '@tanstack/react-router';
import { SITE_URL } from '@/lib/site';
import { maybeGetPainting } from '@/lib/painting/painting.functions';
import { Hero, ProjectCard, Section, SkillGroup, TimelineItem } from '@/components/portfolio/blocks';
import { PortfolioLayout } from '@/components/portfolio/portfolio-layout';

import portfolioCss from '@/styles/portfolio.css?url';

const HOME_URL = `${SITE_URL}/`;
const PAGE_TITLE = 'Kal.L | Fullstack Engineer in Tokyo';
const PAGE_DESCRIPTION =
  'Calvin (Kal) is a fullstack engineer in Tokyo building AI agents, speech systems, and fast web apps.';
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
const OG_IMAGE_ALT = 'Kal.L, fullstack engineer in Tokyo';

const STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Calvin (Kal)',
    url: HOME_URL,
    jobTitle: 'Fullstack Engineer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tokyo',
      addressCountry: 'JP',
    },
    sameAs: ['https://github.com/kalvin807'],
    knowsAbout: ['AI Agents', 'Speech Systems', 'TypeScript', 'Python', 'Go', 'Next.js'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kal.L Portfolio',
    url: HOME_URL,
  },
];

export const Route = createFileRoute('/')({
  staticData: { lang: 'en' },
  loader: () => ({
    painting: maybeGetPainting(),
    year: new Date().getFullYear(),
  }),
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'robots', content: 'index,follow,max-image-preview:large' },
      { name: 'description', content: PAGE_DESCRIPTION },
      {
        name: 'keywords',
        content: 'software engineer, developer, Tokyo, Japan, portfolio, web development, programming',
      },
      { name: 'author', content: 'Kal.L' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: HOME_URL },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:image', content: OG_IMAGE_URL },
      { property: 'og:image:secure_url', content: OG_IMAGE_URL },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: OG_IMAGE_ALT },
      { property: 'og:site_name', content: 'Kal.L Portfolio' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: HOME_URL },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION },
      { name: 'twitter:image', content: OG_IMAGE_URL },
      { name: 'twitter:image:alt', content: OG_IMAGE_ALT },
      { name: 'twitter:domain', content: 'kalvin.io' },
      { name: 'theme-color', content: '#121212' },
    ],
    links: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'canonical', href: HOME_URL },
      { rel: 'stylesheet', href: portfolioCss },
    ],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(STRUCTURED_DATA) }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { painting, year } = Route.useLoaderData();

  return (
    <PortfolioLayout painting={painting} year={year}>
      <Hero heading="Fullstack engineer in Tokyo">
        <p className="m-0">
          I'm Calvin (Kal). I build AI agents, speech systems, and fast web apps, from the model layer to the user
          interface.
        </p>
      </Hero>

      <Section id="work" title="Experience">
        <ol className="m-0 list-none border-t border-line p-0">
          <TimelineItem
            period="2025 — now"
            title="Fullstack Engineer"
            org="AI voice company"
            place="Tokyo"
            details={['Building AI agent and voice products end to end, from the model layer to the user interface.']}
          />
          <TimelineItem
            period="2024 — 2025"
            title="Speech Team Lead"
            org="ad-tech company"
            place="Tokyo"
            details={[
              'Led the team building low-latency conversational agents for enterprise partners.',
              'Took speech-to-text pipelines and transcription systems from prototype to production scale.',
            ]}
          />
          <TimelineItem
            period="2023 — 2026"
            title="M.S. Computer Science (Machine Learning)"
            org="Georgia Tech"
            place="—"
          />
          <TimelineItem
            period="2023 — 2024"
            title="Software Engineer"
            org="social hiring platform"
            place="Tokyo"
            details={[
              'Built high-performance enterprise SaaS interfaces with Next.js and Rails.',
              'Architected a loyalty point system and ran data migrations with zero downtime.',
            ]}
          />
          <TimelineItem
            period="2022"
            title="Software Engineer"
            org="telecom company"
            place="Tokyo"
            details={[
              'Led a small team to deliver an internal career platform that won a company-wide award.',
              'Tuned query performance across a distributed database.',
            ]}
          />
          <TimelineItem
            period="2021 — 2022"
            title="Software Engineer"
            org="fintech startup"
            place="Hong Kong"
            details={[
              'Built Go and Python microservices that parsed and analyzed bank statements.',
              'Rebuilt the testing infrastructure, cutting run time and memory usage.',
            ]}
          />
          <TimelineItem
            period="2017 — 2021"
            title="B.Eng. Computer Science"
            org="The University of Hong Kong"
            place="Hong Kong"
          />
        </ol>
      </Section>

      <Section id="projects" title="Projects">
        <ul className="m-0 grid list-none border-t border-l border-line p-0 sm:grid-cols-2">
          <ProjectCard
            title="GBFinder Omega"
            description="Realtime raid finder for Granblue Fantasy, written in Go. Delivers high volumes of raid signals in under a second."
            href="https://github.com/kalvin807/gbf-raid-finder"
          />
          <ProjectCard
            title="henkaku"
            description="Small JS library that converts strings between full-width and half-width characters."
            href="https://github.com/kalvin807/henkaku"
          />
          <ProjectCard
            title="guru-pu"
            description="Discord bot that assigns server roles automatically."
            href="https://github.com/kalvin807/guru-pu"
          />
          <ProjectCard
            title="akaina"
            description="Computer vision model that counts Magikarp in a YouTube live stream."
            href="https://github.com/kalvin807/akaina-detector"
          />
        </ul>
      </Section>

      <Section id="skills" title="Skills">
        <dl className="m-0 border-t border-line">
          <SkillGroup
            label="Technical"
            skills={['TypeScript', 'JavaScript', 'Python', 'Go', 'Ruby', 'React', 'Next.js', 'PyTorch', 'LLM/GenAI']}
          />
          <SkillGroup label="Languages" skills={['Cantonese', 'Mandarin', 'English', 'Japanese']} />
        </dl>
      </Section>
    </PortfolioLayout>
  );
}
