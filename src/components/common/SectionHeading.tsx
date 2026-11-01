import type { ReactNode } from 'react';
import { ScrollReveal } from './ScrollReveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'split';
  as?: 'h1' | 'h2';
  size?: 'lg' | 'md';
  action?: ReactNode;
  className?: string;
};

/**
 * Editorial section heading. `split` places the title left and the
 * supporting text right on large screens.
 */
export function SectionHeading({
  eyebrow,
  title,
  text,
  tone = 'light',
  align = 'left',
  as: Tag = 'h2',
  size = 'lg',
  action,
  className = '',
}: Props) {
  const dark = tone === 'dark';
  return (
    <ScrollReveal
      className={`grid gap-6 ${align === 'split' ? 'lg:grid-cols-12 lg:items-end lg:gap-12' : ''} ${className}`}
      stagger={0.1}
    >
      <div className={align === 'split' ? 'lg:col-span-7' : 'max-w-4xl'}>
        {eyebrow && (
          <p data-reveal className={`eyebrow mb-5 ${dark ? 'text-amber' : 'text-blue'}`}>
            {eyebrow}
          </p>
        )}
        <Tag data-reveal className={`${size === 'lg' ? 'display-lg' : 'display-md'} ${dark ? 'text-white' : 'text-navy'}`}>
          {title}
        </Tag>
      </div>
      {(text || action) && (
        <div className={align === 'split' ? 'lg:col-span-5 lg:pb-2' : 'max-w-2xl'}>
          {text && (
            <p data-reveal className={`lede ${dark ? 'text-white/70' : 'text-muted'}`}>
              {text}
            </p>
          )}
          {action && (
            <div data-reveal className="mt-8">
              {action}
            </div>
          )}
        </div>
      )}
    </ScrollReveal>
  );
}
