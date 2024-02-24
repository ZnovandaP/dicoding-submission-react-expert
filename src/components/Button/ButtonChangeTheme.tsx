'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import Button from '.';

type ButtonChangeThemeProps = {
  icon: React.ReactElement
  name: string
  theme: 'dark' | 'light' | 'system'
};

export default function ButtonChangeTheme({ icon, theme, name }: ButtonChangeThemeProps) {
  const { theme: currentTheme, setTheme } = useTheme();

  const isActive = theme === currentTheme;

  const handleChangeTheme = () => {
    switch (theme) {
      case 'dark':
        setTheme('dark');
        break;
      case 'light':
        setTheme('light');
        break;
      case 'system':
        setTheme('system');
        break;
      default:
        break;
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full flex items-center justify-between"
      onClick={handleChangeTheme}
    >
      <div className="flex gap-4">
        <span className="text-2xl">
          {icon}
        </span>
        <span>
          {name}
        </span>
      </div>

      {isActive && (
        <div className="ping relative w-2 h-2 bg-green-500 rounded-full" />
      )}

    </Button>
  );
}
