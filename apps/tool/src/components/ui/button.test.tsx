import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('runs its handler when pressed', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>変換</Button>);

    fireEvent.click(screen.getByRole('button', { name: '変換' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies the requested variant and size', () => {
    render(
      <Button variant="outline" size="lg">
        保存
      </Button>,
    );

    const button = screen.getByRole('button', { name: '保存' });
    expect(button.className).toContain('border-border');
    expect(button.className).toContain('h-9');
  });

  it('renders as the element passed to render', () => {
    render(<Button render={<a href="/tool" />}>ホーム</Button>);

    const link = screen.getByRole('link', { name: 'ホーム' });
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/tool');
  });
});
