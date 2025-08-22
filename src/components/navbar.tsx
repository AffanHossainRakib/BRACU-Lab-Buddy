import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Computer } from "lucide-react";

import { ThemeSwitch } from "@/components/theme-switch";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

import { ExternalLink } from "lucide-react";

import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <div className="flex justify-start items-center gap-2">
            <Computer className="text-primary" size={24} />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-3/5 sm:basis-full" justify="center">
        <NavbarItem>
          <h1 className="font-bold text-lg text-primary">BRACU Lab Buddy</h1>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                size="sm"
                endContent={<ChevronDown size={14} />}
                className="text-default-500"
              >
                Other Tools
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Other Tools">
              <DropdownItem
                key="RoutineBuzz"
                startContent={<ExternalLink size={16} />}
                onPress={() =>
                  window.open("https://routinebuzz.vercel.app/", "_blank")
                }
              >
                RoutineBuzz
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
