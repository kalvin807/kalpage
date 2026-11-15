import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Popover, PopoverContent, PopoverTrigger } from './popover';

describe('Popover', () => {
  it('opens from its trigger and closes on Escape', () => {
    render(
      <Popover>
        <PopoverTrigger>カレンダー</PopoverTrigger>
        <PopoverContent>中身</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole('button', { name: 'カレンダー' });
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog').textContent).toBe('中身');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
