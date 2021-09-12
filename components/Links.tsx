export function ExternalLink(
  props: { href: string; children: React.ReactNode } & React.HTMLAttributes<HTMLAnchorElement>,
) {
  const { href, children, ...rest } = props
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}
