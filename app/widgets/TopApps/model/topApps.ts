import type { TopicId } from '@/widgets/Topics';

export interface App {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly rating: number;
  readonly badge?: string;
  readonly image: string;
  readonly categories: readonly TopicId[];
}

export const topApps = [
  {
    id: 'max',
    title: 'MAX: общение, звонки, сервисы',
    description:
      'MAX — новая цифровая платформа, которая объединяет в себе сервисы для решения повседневных задач и мессенджер для комфортного общения.',
    rating: 4.5,
    badge: 'Хит',
    image: '/icons/max.png',
    categories: ['interesting', 'communication']
  },
  {
    id: 'vtb',
    title: 'ВТБ Онлайн',
    description:
      'ВТБ Онлайн – в лидерах среди мобильных банковских приложений России.',
    rating: 4.7,
    badge: 'Топ категории',
    image: '/icons/vtb.svg',
    categories: ['finance']
  },
  {
    id: 'mir-pay',
    title: 'Mir Pay',
    description: 'Мобильное приложение ПС «Мир» для бесконтактной оплаты.',
    rating: 3.6,
    image: '/icons/mir-pay.svg',
    categories: ['finance']
  },
  {
    id: 'telegram',
    title: 'Telegram',
    description:
      'Telegram – простое, быстрое и безопасное приложение для обмена сообщениями.',
    rating: 4.1,
    badge: 'Топ категории',
    image: '/telegram-app-icon.jpg',
    categories: ['communication', 'interesting']
  },
  {
    id: 'sber',
    title: 'СберБанк Онлайн',
    description:
      'Больше чем банк — экосистема финансовых и нефинансовых сервисов.',
    rating: 4.8,
    badge: 'Топ категории',
    image: '/sber.png',
    categories: ['finance']
  },
  {
    id: 'ozon',
    title: 'OZON: товары, одежда,...',
    description: 'Интернет-магазин. Доставка по всей России.',
    rating: 4.5,
    badge: 'Топ категории',
    image: '/ozon.png',
    categories: ['shopping']
  },
  {
    id: 'avito',
    title: 'Авито – работа, услуги, авто',
    description: 'Объявления: услуги, товары, недвижимость, работа.',
    rating: 4.7,
    badge: 'Топ категории',
    image: '/avito.png',
    categories: ['marketplace']
  },
  {
    id: 'wildberries',
    title: 'WILDBERRIES',
    description: 'Скидки каждый день. Бесплатная доставка.',
    rating: 4.8,
    badge: 'Топ категории',
    image: '/wb.png',
    categories: ['shopping']
  },
  {
    id: 'megafon',
    title: 'МегаФон',
    description: 'Получи максимум возможностей с мобильным оператором.',
    rating: 3.4,
    badge: 'Топ категории',
    image: '/megafon.png',
    categories: ['communication']
  }
] as const satisfies readonly App[];
