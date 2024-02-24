import Button from '@/components/Button';
import ButtonChangeTheme from '@/components/Button/ButtonChangeTheme';
import DrawerBase from '@/components/Drawer';
import dataThemes from '@/constant/data-themes';
import * as React from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

export default function ThemesMenu() {
  const [openTheme, setOpenTheme] = React.useState(false);

  return (
    <div className="bg-primary/20 dark:bg-primary/40 rounded-md">
      <Button
        type="button"
        variant="ghost"
        className="center flex-col gap-3 w-full"
        onClick={() => setOpenTheme(!openTheme)}
      >
        <div className="center gap-3 w-full">
          Setting Themes
          {openTheme ? (
            <IoIosArrowUp className="animate-fade text-2xl" />
          ) : (
            <IoIosArrowDown className="animate-fade text-2xl" />
          )}
        </div>

      </Button>
      <DrawerBase open={openTheme}>
        <ul className="flex-col w-full">
          {dataThemes.map((data) => (
            <li key={data.name}>
              <ButtonChangeTheme
                name={data.name}
                icon={<data.icon />}
                theme={data.theme}
              />
            </li>
          ))}
        </ul>
      </DrawerBase>
    </div>
  );
}
