/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '@/components/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small : Story = {
  args: {
    src: '/user.png',
    alt: 'user avatar small',
    size: 'sm',
  },
};

export const Medium : Story = {
  args: {
    src: '/user.png',
    alt: 'user avatar medium',
    size: 'md',
  },
};

export const Large : Story = {
  args: {
    src: '/user.png',
    alt: 'user avatar large',
    size: 'lg',
  },
};

export const XLarge : Story = {
  args: {
    src: '/user.png',
    alt: 'user avatar xlarge',
    size: 'xl',
  },
};
