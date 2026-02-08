import { createFileRoute, Link } from "@tanstack/react-router";
import { IconCalendar, IconArrowRight } from "@tabler/icons-react";

export const Route = createFileRoute("/")({
  component: ToolsIndexPage,
});

const tools = [
  {
    to: "/tool/date" as const,
    icon: <IconCalendar className="size-5" />,
    title: "和暦・西暦変換",
    titleEn: "Japanese Date Converter",
    description: "西暦と和暦（令和・平成・昭和・大正・明治）を相互変換",
  },
];

function ToolsIndexPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-light tracking-tight">ツール集</h1>
        <p className="text-muted-foreground">Utility tools for everyday use</p>
      </div>

      <div className="space-y-3">
        {tools.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="group flex items-center gap-4 rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary transition-colors group-hover:bg-primary/15">
              {tool.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex items-baseline gap-2">
                <span className="font-semibold tracking-tight">{tool.title}</span>
                <span className="text-xs text-muted-foreground">{tool.titleEn}</span>
              </div>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
            <IconArrowRight className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
