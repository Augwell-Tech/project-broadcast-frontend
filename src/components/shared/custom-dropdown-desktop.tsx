import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface MenuItem {
  title: string;
  link?: string;
  external?: boolean;
  subitems?: {
    title: string;
    icon: string;
    link: string;
    description?: string;
    // subs: { title: string; link: string; icon: string }[];
  }[];
}

interface DropdownProps {
  item: MenuItem;
}

const CustomeDropdownDesktop = ({ item }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div
      className=""
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger as clickable Link */}
      <Link
        to={item.link || '#'}
        onClick={() => () => {
          console.log(item.link);
          setIsOpen(false);
        }}
        target={item.external ? '_blank' : '_self'}
        className="flex gap-1 items-center text-sm text-[#808080] hover:text-[#1A1A1A]"
      >
        {item.title}
        {item?.subitems && (
          <Icon
            className="transition-all"
            icon={`${
              isOpen ? 'majesticons:chevron-up' : 'majesticons:chevron-down'
            }`}
          />
        )}
      </Link>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && item?.subitems && (
          <motion.div
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute max-w-4xl mx-auto right-0 left-0 top-full w-[100vw] bg-white   z-50"
          >
            <div className="px-8 py-8 max-h-[60vh] overflow-y-auto shadow-xl border border-slate-200 rounded-2xl bg-white">
              {/* <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Communication APIs
                </h3>
                <p className="text-slate-600">
                  Choose the API that fits your needs
                </p>
              </div> */}
              <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
                {item?.subitems.map((subItem, subIndex) => (
                  <Link
                    to={subItem.link}
                    onClick={() => setIsOpen(false)}
                    key={subIndex}
                    className="p-6 flex flex-col group hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 ${
                        subItem.title.includes('WhatsApp')
                          ? 'bg-gradient-to-br from-green-100 to-emerald-100'
                          : subItem.title.includes('SMS')
                          ? 'bg-gradient-to-br from-blue-100 to-cyan-100'
                          : 'bg-gradient-to-br from-purple-100 to-pink-100'
                      }`}
                    >
                      <Icon
                        icon={subItem.icon}
                        className={`w-8 h-8 ${
                          subItem.title.includes('WhatsApp')
                            ? 'text-green-600'
                            : subItem.title.includes('SMS')
                            ? 'text-blue-600'
                            : 'text-purple-600'
                        }`}
                      />
                    </div>
                    <div className="text-center">
                      <h5 className="text-lg font-semibold text-slate-900 mb-2">
                        {subItem.title}
                      </h5>
                      {subItem.description && (
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomeDropdownDesktop;
