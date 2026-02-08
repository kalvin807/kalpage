import { createFileRoute, Link } from "@tanstack/react-router";
import { IconCalendar } from "@tabler/icons-react";

export const Route = createFileRoute("/")({
  component: ToolsIndexPage,
});

const tools = [
  {
    to: "/tool/date" as const, // TanStack Router requires literal type for type-safe links
    icon: <IconCalendar className="size-5" />,
    title: "和暦・西暦変換",
    titleEn: "Japanese Date Converter",
    description: "西暦と和暦（令和・平成・昭和・大正・明治）を相互変換",
  },
];

function ToolsIndexPage() {
  return (
    <div className="min-h-dvh">
      <main className="container mx-auto max-w-2xl px-5 py-12 sm:py-16">
        <header className="mb-10">
          <h1 className="mb-1 font-mono text-sm font-medium tracking-tight text-foreground">tool.kalvin.io</h1>
          <p className="text-xs text-muted-foreground">Utility tools</p>
        </header>

        <div className="space-y-0">
          {tools.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="group flex items-center gap-4 border-b border-border py-4 transition-colors hover:bg-muted/40"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary transition-colors group-hover:bg-primary/12">
                {tool.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-baseline gap-2">
                  <span className="font-semibold tracking-tight">{tool.title}</span>
                  <span className="text-xs text-muted-foreground">{tool.titleEn}</span>
                </div>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
              <svg
                className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
