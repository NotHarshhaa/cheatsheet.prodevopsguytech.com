import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { Callout as BaseCallout } from 'fumadocs-ui/components/callout'
import { Card as BaseCard, Cards as BaseCards } from 'fumadocs-ui/components/card'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { TypeTable } from 'fumadocs-ui/components/type-table'
import type { ComponentProps } from 'react'
import type { MDXComponents } from 'mdx/types'
import { AgentPrompt } from '@/components/agent-prompt'
import { Flow, FlowStep } from '@/components/flow'

/** A dashed box with a solid colored edge, after Better Auth's notes. */
function Callout({ className, ...props }: ComponentProps<typeof BaseCallout>) {
  return (
    <BaseCallout
      {...props}
      className={`gap-3 border-dashed bg-transparent py-4 ps-2 pe-5 shadow-none [&>[role=none]]:bg-(--callout-color) ${className ?? ''}`}
    />
  )
}

/** Cards share hairlines instead of floating apart, like the grids on the landing page. Fumadocs
 * sets its own gap utility, which outranks .grid-cells, so gap-px restates it. */
function Cards({ className, ...props }: ComponentProps<typeof BaseCards>) {
  return <BaseCards {...props} className={`grid-cells gap-px ${className ?? ''}`} />
}

/** A linked card shows an arrow on hover; see `.card-link` in `app/global.css`. */
function Card({ className, ...props }: ComponentProps<typeof BaseCard>) {
  return (
    <BaseCard
      {...props}
      className={`${props.href ? 'card-link' : ''} border-0 bg-fd-background p-5 ${className ?? ''}`}
    />
  )
}

/**
 * Cheatsheets feature remote images (Imgur, Postimg, etc.) with dynamic dimensions.
 * Using an un-opinionated responsive HTML <img> prevents Next.js missing width/height
 * runtime errors and remote domain restrictions while adhering to the site's blueprint aesthetic.
 */
function ImageComponent({ className, alt, ...props }: ComponentProps<'img'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt ?? ''}
      className={`my-4 h-auto max-w-full rounded-none border border-fd-border ${className ?? ''}`}
      loading="lazy"
    />
  )
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: ImageComponent,
    Image: ImageComponent,
    Accordion,
    Accordions,
    AgentPrompt,
    Callout,
    Card,
    Cards,
    Flow,
    FlowStep,
    Step,
    Steps,
    Tab,
    Tabs,
    TypeTable,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
