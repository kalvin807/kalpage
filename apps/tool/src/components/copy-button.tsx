import { useState } from 'react';
import { IconAlertCircle, IconCheck, IconCopy } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  readonly text: string;
  readonly className?: string;
}

type CopyStatus = 'idle' | 'copied' | 'failed';

const STATUS_CLASS: Record<CopyStatus, string> = {
  idle: 'text-muted-foreground/50 hover:text-foreground',
  copied: 'text-link',
  failed: 'text-destructive',
};

const STATUS_LABEL: Record<CopyStatus, string> = {
  idle: 'コピー',
  copied: 'コピーしました',
  failed: 'コピーに失敗しました',
};

export function CopyButton({ text, className }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
      setTimeout(() => setStatus('idle'), 1500);
    } catch (error) {
      console.error('Clipboard write failed:', error);
      setStatus('failed');
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={handleCopy}
      aria-label={STATUS_LABEL[status]}
      className={`size-6 transition-all active:scale-95 ${STATUS_CLASS[status]} ${className ?? ''}`}
    >
      {status === 'failed' ? (
        <IconAlertCircle className="size-3" />
      ) : status === 'copied' ? (
        <IconCheck className="size-3" />
      ) : (
        <IconCopy className="size-3" />
      )}
    </Button>
  );
}
