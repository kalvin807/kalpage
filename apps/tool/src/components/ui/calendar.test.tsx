import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Calendar } from './calendar';

describe('Calendar', () => {
  it('reports a picked day as an ISO date', () => {
    const onValueChange = vi.fn();
    render(<Calendar value="2024-01-15" onValueChange={onValueChange} defaultMonth="2024-01" />);

    fireEvent.click(screen.getByRole('gridcell', { name: /2024年1月20日/ }));

    expect(onValueChange).toHaveBeenCalledWith('2024-01-20');
  });

  it('renders the selected month and short numeric day labels', () => {
    render(<Calendar value="2024-01-15" onValueChange={() => {}} />);

    expect(screen.getByRole('heading', { name: '2024年1月' })).toBeTruthy();
    expect(screen.getByRole('gridcell', { name: /2024年1月20日/ }).textContent).toBe('20');
  });

  it('jumps to a month picked from the month select', () => {
    render(<Calendar onValueChange={() => {}} defaultMonth="2024-01" />);

    fireEvent.change(screen.getByRole('combobox', { name: '月' }), { target: { value: '3' } });

    expect(screen.getByRole('heading', { name: '2024年3月' })).toBeTruthy();
  });
});
