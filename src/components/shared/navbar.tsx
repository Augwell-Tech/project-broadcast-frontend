import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CustomButton } from './shared_customs';
import CustomeDropdownDesktop from './custom-dropdown-desktop';
import CustomMobileDropdown from './custom-dropdown-mobile';

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        {...{
          ariaLabel: 'Project Broadcast Navbar',
        }}
        maxWidth="2xl"
        className="bg-white w-full"
      >
        <NavbarContent className="lg:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>

        <NavbarContent className="lg:hidden pr-3" justify="center">
          <NavbarBrand as={Link} to="/" className="flex gap-x-3">
            {/* <img
              src="/icons/augwell_logo.png"
              className="w-[6.3rem]"
              alt="logo"
            /> */}
            <p className="font-bold text-sm uppercase">Project Broadcast</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          className="hidden lg:flex gap-4  justify-between w-full "
          justify="center"
        >
          <NavbarBrand as={Link} to="/" className="flex gap-x-3 ">
            {/* <img
              src="/icons/augwell_logo.png"
              className="w-[8.3rem]"
              alt="logo"
            /> */}
            <p className="font-bold text-inherit uppercase">
              Project Broadcast
            </p>
          </NavbarBrand>
          <div className="flex w-[87%] gap-x-5 justify-center items-center">
            {menuItems.map((item, index) =>
              item.subitems ? (
                <CustomeDropdownDesktop key={index} item={item} />
              ) : (
                <NavbarItem key={`${item}-${index}`}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `w-full text-base text-[#1A1A1A] ${
                        isActive
                          ? 'text-black border-b-3 border-primary'
                          : 'text-[#1A1A1A]'
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </NavbarItem>
              ),
            )}
          </div>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden lg:flex">
          <NavbarItem className=" gap-2 items-center hidden lg:flex">
            <CustomButton
              onClick={() => navigate('/contact')}
              className="border text-secondary border-secondary "
            >
              Contact Us
            </CustomButton>
            <CustomButton
              onClick={() => navigate('/contact')}
              className="bg-secondary text-white"
            >
              Login
            </CustomButton>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="bg-white">
          {menuItems.map((item, index) =>
            item.subitems ? (
              <CustomMobileDropdown
                closeMenu={() => setIsMenuOpen(false)}
                key={index}
                item={item}
              />
            ) : (
              <NavbarMenuItem key={`${item}-${index}`}>
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full text-base text-[#1A1A1A] hover:border-b-2 border-secondary ${
                      isActive
                        ? 'text-black border-b-3 border-secondary'
                        : 'text-[#1A1A1A]'
                    }`
                  }
                  to={item.link}
                >
                  {item.title}
                </NavLink>
              </NavbarMenuItem>
            ),
          )}
          <div className="flex md:gap-x-4 flex-col gap-4">
            <CustomButton
              onClick={() => navigate('/contact')}
              className="border text-secondary border-secondary "
            >
              Contact Us
            </CustomButton>
            <CustomButton
              onClick={() => {
                navigate('/contact');
                setIsMenuOpen(false);
              }}
              className="bg-secondary text-white"
            >
              Login
            </CustomButton>
          </div>
        </NavbarMenu>
      </Navbar>
    </>
  );
}

const menuItems = [
  // {
  //   link: '/',
  //   title: 'Home',
  // },
  {
    link: '/products',
    title: 'Products',
    subitems: [],
  },
  {
    link: '/solution',
    title: 'Solution',
    subitems: [],
  },
  {
    link: '/pricing',
    title: 'Pricing',
    subitems: [],
  },
  {
    link: '/resources',
    title: 'Resources',
    subitems: [],
  },
];
