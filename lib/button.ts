/**
 * Class names for the site's two large buttons: the solid primary action and the outlined
 * secondary one with crop marks (see `.ticks` in `app/global.css`). The secondary button is
 * filled with the color of the surface it sits on, so the hero's grid never shows through it, and
 * the focus ring offset takes that color too.
 */
export function button(
  variant: 'primary' | 'secondary',
  surface: 'background' | 'card' = 'background',
) {
  const fill = surface === 'card' ? 'bg-fd-card' : 'bg-fd-background'
  const look =
    variant === 'primary'
      ? 'bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/85'
      : `ticks border ${fill} hover:bg-fd-accent`
  const offset =
    surface === 'card'
      ? 'focus-visible:ring-offset-fd-card'
      : 'focus-visible:ring-offset-fd-background'
  return `pressable inline-flex h-11 items-center px-6 text-sm font-medium transition-[transform,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 ${look} ${offset}`
}
