import type { ReactNode } from 'react';
import { TokyoClock } from './tokyo-clock';

interface HeroProps {
  readonly heading: string;
  readonly children: ReactNode;
}

export function Hero({ heading, children }: HeroProps) {
  return (
    <section className="pt-12 sm:pt-16">
      <h1 className="pixel-heading m-0 mb-4 text-[0.9375rem] font-semibold text-text-heading">{heading}</h1>
      <div className="flex flex-col gap-3">{children}</div>
      <p className="mt-5 mb-0 text-sm text-text-muted">
        Tokyo · <TokyoClock />
      </p>
    </section>
  );
}

interface SectionProps {
  readonly id: string;
  readonly title: string;
  readonly children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="mt-14">
      <h2 className="pixel-heading m-0 mb-4 text-[0.9375rem] font-semibold text-text-heading">{title}</h2>
      {children}
    </section>
  );
}

interface TimelineItemProps {
  readonly period: string;
  readonly title: string;
  readonly org: string;
  readonly place: string;
  readonly details?: readonly string[];
}

export function TimelineItem({ period, title, org, place, details }: TimelineItemProps) {
  return (
    <li className="grid grid-cols-[6rem_minmax(0,1fr)] border-x border-b border-line sm:grid-cols-[7.5rem_minmax(0,1fr)_7.5rem]">
      <div className="px-3 py-2.5 text-sm text-text-muted tabular-nums">
        {period}
        <span className="block sm:hidden">{place}</span>
      </div>
      <div className="border-l border-line px-3 py-2.5">
        <h3 className="m-0 text-[0.9375rem] font-normal text-text-heading">
          {title}
          <span className="text-text-muted">&nbsp;· {org}</span>
        </h3>
        {details && (
          <ul className="mt-1.5 mb-0 list-disc space-y-1 pl-4 text-sm text-text-muted marker:text-line">
            {details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="hidden border-l border-line px-3 py-2.5 text-sm text-text-muted sm:block">{place}</div>
    </li>
  );
}

interface ProjectCardProps {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

export function ProjectCard({ title, description, href }: ProjectCardProps) {
  return (
    <li className="border-r border-b border-line">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} on GitHub (opens in a new tab)`}
        className="flex h-full flex-col gap-1 px-4 py-3.5 text-text hover:bg-surface-hover hover:no-underline"
      >
        <span className="flex justify-between gap-4 text-text-heading">
          {title}
          <span aria-hidden="true" className="text-link">
            ↗
          </span>
        </span>
        <span className="text-sm text-text-muted">{description}</span>
      </a>
    </li>
  );
}

interface SkillGroupProps {
  readonly label: string;
  readonly skills: readonly string[];
}

export function SkillGroup({ label, skills }: SkillGroupProps) {
  return (
    <div className="grid grid-cols-[6rem_minmax(0,1fr)] border-x border-b border-line sm:grid-cols-[7.5rem_minmax(0,1fr)]">
      <dt className="px-3 py-2.5 text-sm text-text-muted">{label}</dt>
      {/* The non-breaking space keeps each separator on the same line as the skill before it. */}
      <dd className="m-0 border-l border-line px-3 py-2.5">{skills.join(' · ')}</dd>
    </div>
  );
}
