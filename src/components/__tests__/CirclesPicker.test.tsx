import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CirclesPicker from '../CirclesPicker';
import { Circles } from '../../types';

describe('CirclesPicker component tests', () => {
  it('renders 4 radio buttons', () => {
    render(
      <CirclesPicker circles={1} setCircles={jest.fn()}/>
    );

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(4);
  });

  it('renders the first radio checked', () => {
    render(
      <CirclesPicker circles={1} setCircles={jest.fn()}/>
    );

    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('checked');
  });

  it('calls setCircles with the clicked value', () => {
    const mockFn: jest.Mock<void, [Circles]> = jest.fn();
    render(
      <CirclesPicker circles={1} setCircles={mockFn}/>
    );

    const radios = screen.getAllByRole('radio');
    for (let i = 0; i < 4; i++) {
      userEvent.click(radios[i]);
      expect(mockFn).toHaveBeenLastCalledWith(i + 1);
    }
  })

  it.each(
    [1, 2, 3, 4] as Circles[]
  )('renders all previous circles as checked when %d is selected', (circles) => {
    render(
      <CirclesPicker circles={circles} setCircles={jest.fn()}/>
    );

    const radios = screen.getAllByRole('radio');
    // eslint-disable-next-line testing-library/no-node-access
    const parents = radios.map(radio => radio.parentElement);

    userEvent.click(radios[circles - 1]);
    for (let j = 0; j < circles; j++) {
      expect(parents[j]).toHaveClass('Joy-checked');
    }
    for (let j = circles; j < 4; j++) {
      expect(parents[j]).not.toHaveClass('Joy-checked');
    }
  })
});
