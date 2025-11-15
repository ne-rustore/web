import { SocialLink } from '@/shared/types';

interface FooterSection {
  title: string;
  links: SocialLink[];
}

export const NAVIGATION_ITEMS: SocialLink[] = [
  {
    href: '#',
    name: 'Приложения',
  },
  {
    href: '#',
    name: 'Игры',
  },
  {
    href: '#',
    name: 'Блог',
  },
] as const;

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'О RUSTORE',
    links: [
      { name: 'О нас', href: '/about' },
      { name: 'Блог', href: '/blog' },
      { name: 'Разработчики', href: '/developers' },
      { name: 'Контакты', href: '/contacts' },
    ],
  },
  {
    title: 'МАГАЗИН',
    links: [
      { name: 'Приложения', href: '/apps' },
      { name: 'Игры', href: '/games' },
      { name: 'Топ Бесплатные', href: '/top-free' },
      { name: 'Недавно обновлено', href: '/recently-updated' },
    ],
  },
  {
    title: 'ПОДДЕРЖКА',
    links: [
      { name: 'Справочный центр', href: '/help' },
      { name: 'Связаться с поддержкой', href: '/support' },
      { name: 'Политика конфиденциальности', href: '/privacy' },
    ],
  },
  {
    title: 'ЮРИДИЧЕСКИЕ',
    links: [
      { name: 'Условия обслуживания', href: '/terms' },
      { name: 'Лицензионное соглашение', href: '/license' },
    ],
  },
];
