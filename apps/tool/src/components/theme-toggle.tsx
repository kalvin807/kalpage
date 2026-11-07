import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from '../lib/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      className="inline-flex size-9 items-center justify-center border border-line text-text-heading hover:border-text-muted"
    >
      {theme === 'light' ? <IconMoon className="size-4" /> : <IconSun className="size-4" />}
    </button>
  );
}
