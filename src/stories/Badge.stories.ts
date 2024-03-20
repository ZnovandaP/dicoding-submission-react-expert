/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react';
import Badge from '@/components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small : Story = {
  args: {
    size: 'sm',
    children: '#BadgeForCategory',
  },
};

export const Medium : Story = {
  args: {
    size: 'md',
    children: '#BadgeForCategory',
  },
};
