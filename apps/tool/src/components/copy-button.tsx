import { useState } from 'react';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  readonly text: string;
  readonly className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('Clipboard write failed:', e);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={handleCopy}
      aria-label="コピー"
      className={`size-6 text-muted-foreground/50 transition-all hover:text-foreground active:scale-95 ${className ?? ''}`}
    >
      {copied ? <IconCheck className="size-3 text-emerald-600" /> : <IconCopy className="size-3" />}
    </Button>
  );
}
