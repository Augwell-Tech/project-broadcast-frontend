import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

interface SubItem {
  title: string;
  icon: string;
  link: string;
}

interface MenuItem {
  title: string;
  link?: string;
  subItems?: SubItem[];
}

const CustomMobileDropdown = ({
  item,
  closeMenu,
}: {
  item: MenuItem;
  closeMenu: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Dropdown trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 text-sm font-medium text-[#1A1A1A]"
      >
        {item.title}
        <Icon
          icon="majesticons:chevron-down"
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && item.subItems && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-white px-4 py-3 rounded-md border  space-y-3"
          >
            {item.subItems.map((subItem, idx) => (
              <Link
                key={idx}
                to={subItem.link}
                onClick={() => {
                  setIsOpen(false);
                  closeMenu();
                }}
                className="flex items-center justify-between gap-3"
              >
                <p>
                  {/* <img
                  src={subItem.icon}
                  alt={subItem.title}
                  className="w-6 h-6 object-contain"
                /> */}
                  <span className="text-sm font-medium text-black hover:text-gray-600">
                    {subItem.title}
                  </span>
                </p>
                <p>
                  <Icon icon="mdi:chevron-right" />
                </p>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomMobileDropdown;
