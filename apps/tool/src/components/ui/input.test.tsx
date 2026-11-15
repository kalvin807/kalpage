import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('reports typed text through onValueChange', () => {
    const onValueChange = vi.fn();
    render(<Input value="" onValueChange={onValueChange} aria-label="日付入力" />);

    fireEvent.input(screen.getByLabelText('日付入力'), { target: { value: '2024-01-15' } });

    expect(onValueChange).toHaveBeenCalledWith('2024-01-15', expect.anything());
  });
});
