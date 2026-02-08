"use client";

import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconAlertCircle, IconHome, IconRefresh } from "@tabler/icons-react";

interface GlobalErrorComponentProps {
  readonly error: Error;
  readonly reset: () => void;
}

export function GlobalErrorComponent({ error, reset }: GlobalErrorComponentProps) {
  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <IconAlertCircle className="size-6 text-destructive" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-card-foreground">Error</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          An unexpected error occurred. Please try refreshing the page or go back home.
        </p>
        {import.meta.env.DEV && (
          <details className="mb-4">
            <summary className="cursor-pointer text-sm text-muted-foreground mb-2">Error details (dev)</summary>
            <pre className="mt-2 p-3 bg-muted rounded-md text-xs overflow-auto max-h-48">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={reset} variant="outline" className="flex-1 sm:flex-initial">
            <IconRefresh className="size-4 mr-2" aria-hidden="true" />
            Retry
          </Button>
          <Link
            to="/"
            className={cn(buttonVariants({ variant: "default" }), "flex-1 sm:flex-initial items-center gap-2")}
          >
            <IconHome className="size-4" aria-hidden="true" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
