/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react';
import { LuArrowRight } from 'react-icons/lu';
import { fn } from '@storybook/test';
import Button from '@/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {},
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    type: 'button',
    label: 'Button',
    children: 'Button',
    icon: <LuArrowRight />,
  },
};

export const PrimaryWithoutIcon: Story = {
  args: {
    variant: 'primary',
    type: 'button',
    label: 'Button',
    children: 'Button',
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    variant: 'secondary',
    type: 'button',
    label: 'Button',
    children: 'Button',
    icon: <LuArrowRight />,
  },
};

export const SecondaryWithoutIcon: Story = {
  args: {
    variant: 'secondary',
    type: 'button',
    label: 'Button',
    children: 'Button',
  },
};

export const GhostWithIcon: Story = {
  args: {
    variant: 'ghost',
    type: 'button',
    label: 'Button',
    children: 'Button',
    icon: <LuArrowRight />,
  },
};

export const GhostWithoutIcon: Story = {
  args: {
    variant: 'ghost',
    type: 'button',
    label: 'Button',
    children: 'Button',
  },
};

export const OutlineWithIcon: Story = {
  args: {
    variant: 'outline',
    type: 'button',
    label: 'Button',
    children: 'Button',
    icon: <LuArrowRight />,
  },
};

export const OutlineWithoutIcon: Story = {
  args: {
    variant: 'outline',
    type: 'button',
    label: 'Button',
    children: 'Button',
  },
};

export const VariantJustIcon : Story = {
  args: {
    label: 'Button',
    type: 'button',
    variant: 'icon',
    icon: <LuArrowRight />,
  },
};
