'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Menu, Search, X } from 'lucide-react';

import {
  NotificationBell,
  ProfileButton,
  SearchDialog,
  SearchTrigger,
  ThemeToggle
} from '@/features';
import { LOGO, NAVIGATION_ITEMS } from '@/shared/config';
import { Button, Sheet, SheetContent, SheetTrigger } from '@/shared/ui';

export const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 dark:bg-slate-900/80 dark:border-slate-700 transition-colors'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link href='/' className='flex items-center gap-2 group'>
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={LOGO.width}
              height={LOGO.height}
              className='transition-transform group-hover:scale-105'
            />
          </Link>

          <div className='hidden md:flex items-center flex-1 mx-8 gap-8'>
            <nav className='flex items-center space-x-6'>
              {NAVIGATION_ITEMS.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 dark:after:bg-blue-400 after:transition-all ${
                    index === 0
                      ? 'text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className='flex-1 max-w-md'>
              <SearchTrigger onClick={() => setSearchOpen(true)} />
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400'
              onClick={() => setSearchOpen(true)}
            >
              <Search className='h-5 w-5' />
            </Button>

            <NotificationBell />
            <ThemeToggle />
            <ProfileButton />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='md:hidden text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400'
                >
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>

              <SheetContent
                side='left'
                className='w-64 p-0 bg-white dark:bg-slate-800'
              >
                <div className='flex flex-col h-full'>
                  <div className='flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700'>
                    <Link href='/' className='flex items-center gap-2'>
                      <Image
                        src={LOGO.src}
                        alt={LOGO.alt}
                        width={32}
                        height={32}
                      />
                    </Link>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => setMobileMenuOpen(false)}
                      className='text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400'
                    >
                      <X className='h-5 w-5' />
                    </Button>
                  </div>

                  <nav className='flex-1 p-4 space-y-2'>
                    {NAVIGATION_ITEMS.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className='block py-2 text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 font-medium transition-colors'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};
