import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

interface SubItem {
  title: string;
  icon: string;
  link: string;
  description?: string;
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
                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-all"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    subItem.title.includes('WhatsApp')
                      ? 'bg-green-100'
                      : subItem.title.includes('SMS')
                      ? 'bg-blue-100'
                      : 'bg-purple-100'
                  }`}
                >
                  <Icon
                    icon={subItem.icon}
                    className={`w-5 h-5 ${
                      subItem.title.includes('WhatsApp')
                        ? 'text-green-600'
                        : subItem.title.includes('SMS')
                        ? 'text-blue-600'
                        : 'text-purple-600'
                    }`}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900 flex-1">
                  {subItem.title}
                </span>
                <Icon
                  icon="mdi:chevron-right"
                  className="w-4 h-4 text-slate-400"
                />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomMobileDropdown;
