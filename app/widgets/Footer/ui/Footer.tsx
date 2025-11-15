import Link from 'next/link';

import { FOOTER_SECTIONS } from '@/shared/config/';
import { getCopyright } from '@/shared/lib/copyright';

export const Footer = () => {
  return (
    <footer className='px-4 bg-slate-900 text-white mt-12 py-12'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className='font-bold mb-4 text-blue-400'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-slate-400 hover:text-white transition-colors duration-300'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='border-t border-slate-700 mt-8 pt-8 text-center text-slate-500'>
          <p>{getCopyright()}</p>
        </div>
      </div>
    </footer>
  );
};
