import * as React from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiMenu5Line } from 'react-icons/ri';
import Button from '.';

type ButtonNavMenuProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export default function ButtonNavMenu({ open, setOpen }: ButtonNavMenuProps) {
  return (
    <Button
      type="button"
      icon={
            open ? (
              <IoMdClose className="animate-fade text-2xl" />
            ) : (
              <RiMenu5Line className="animate-fade text-2xl" />
            )
          }
      variant="icon"
      onClick={() => setOpen(!open)}
    />
  );
}
