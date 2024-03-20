/* eslint-disable react/react-in-jsx-scope */

/*
Skenario test component Badge:
* should render correctly component Badge
* should render component Badge with size 'sm'
* should render component Badge with size 'md'
*/

import Badge from '@/components/Badge';
import {
  describe, it, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';

describe('test Badge component', () => {
  it('should render correctly component Badge', () => {
    render(
      <Badge>
        default
      </Badge>,
    );

    const badge = screen.getByText(/default/);

    expect(badge).toMatchSnapshot();
  });

  it('should render component Badge with size sm', () => {
    render(
      <Badge size="sm">
        smallBadge
      </Badge>,
    );

    const badge = screen.getByText(/smallBadge/);

    expect(badge.classList.contains('text-xs')).toBeTruthy();
  });

  it('should render component Badge with size md', () => {
    render(
      <Badge size="md">
        mediumBadge
      </Badge>,
    );

    const badge = screen.getByText(/mediumBadge/);

    expect(badge.classList.contains('text-base')).toBeTruthy();
  });
});
