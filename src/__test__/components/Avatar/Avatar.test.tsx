/* eslint-disable react/react-in-jsx-scope */

/*
Skenario test component Avatar:
* should render correctly component Avatar
* should render component Avatar with size 'sm'
* should render component Avatar with size 'md'
* should render component Avatar with size 'lg'
* should render component Avatar with size 'xl'
*/

import Avatar from '@/components/Avatar';
import {
  describe, it, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';

describe('test Avatar component', () => {
  it('should render correctly component Avatar', () => {
    render(<Avatar src="/user.png" alt="user avatar" />);

    const imageAvatar = screen.getByRole('img');

    expect(imageAvatar).toMatchSnapshot();
  });

  it('should render component Avatar with size sm', () => {
    render(<Avatar src="/user.png" alt="user avatar" size="sm" />);

    const imageAvatar = screen.getByRole('img');

    expect(imageAvatar.classList.contains('w-8')).toBeTruthy();
  });

  it('should render component Avatar with size md', () => {
    render(<Avatar src="/user.png" alt="user avatar" size="md" />);

    const imageAvatar = screen.getByRole('img');

    expect(imageAvatar.classList.contains('w-12')).toBeTruthy();
  });

  it('should render component Avatar with size lg', () => {
    render(<Avatar src="/user.png" alt="user avatar" size="lg" />);

    const imageAvatar = screen.getByRole('img');

    expect(imageAvatar.classList.contains('w-16')).toBeTruthy();
  });

  it('should render component Avatar with size xl', () => {
    render(<Avatar src="/user.png" alt="user avatar" size="xl" />);

    const imageAvatar = screen.getByRole('img');

    expect(imageAvatar.classList.contains('w-20')).toBeTruthy();
  });
});
