import { IconType } from 'react-icons/lib';
import { LuMonitor, LuCloudMoon, LuCloudSun } from 'react-icons/lu';

type DataTheme = {
  name: string
  theme: 'dark' | 'light' | 'system'
  icon: IconType
};

const dataThemes = [
  {
    name: 'Dark Mode',
    theme: 'dark',
    icon: LuCloudMoon,
  },
  {
    name: 'Light Mode',
    theme: 'light',
    icon: LuCloudSun,
  },
  {
    name: 'System (Auto)',
    theme: 'system',
    icon: LuMonitor,
  },
] as DataTheme[];

export default dataThemes;
