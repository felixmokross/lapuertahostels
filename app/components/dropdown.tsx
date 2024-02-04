import { Menu, Transition } from "@headlessui/react";
import {
  ComponentPropsWithoutRef,
  ElementType,
  Fragment,
  PropsWithChildren,
  ReactNode,
} from "react";
import { cn } from "./classnames";

export type DropdownProps = PropsWithChildren<{
  button: ReactNode;
  menuPosition?: "left" | "right";
  manual?: boolean;
}>;

export function Dropdown({
  button,
  children,
  menuPosition = "left",
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>{button}</div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            "absolute z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            {
              "left-0 origin-top-left": menuPosition === "left",
              "right-0 origin-top-right": menuPosition === "right",
            },
          )}
        >
          <div className="py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

Dropdown.Button = Menu.Button;

type DropdownItemProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

function DropdownItem<T extends ElementType>({
  as,
  className,
  ...props
}: DropdownItemProps<T>) {
  const Component = as || "button";
  return (
    <Menu.Item>
      {({ active }) => (
        <Component
          className={cn(
            active ? "bg-neutral-100 text-neutral-900" : "text-neutral-700",
            " block w-full px-4 py-2 text-left text-sm",
            className,
          )}
          {...props}
        />
      )}
    </Menu.Item>
  );
}

Dropdown.Item = DropdownItem;
