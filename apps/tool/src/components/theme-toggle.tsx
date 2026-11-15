import { IconMoon, IconSun } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '../lib/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      className="border border-line hover:border-text-muted"
    >
      {theme === 'light' ? <IconMoon className="size-4" /> : <IconSun className="size-4" />}
    </Button>
  );
}
