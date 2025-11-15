import {
  BookOpen,
  Briefcase,
  Car,
  Coins,
  Dumbbell,
  FileText,
  GraduationCap,
  Hammer,
  Heart,
  MessageCircle,
  Plane,
  Sparkle,
  Stethoscope
} from 'lucide-react';

export const topics = [
  {
    id: 'interesting',
    label: 'Интересное',
    icon: <Sparkle className='h-4 w-4 text-rose-500' />
  },
  {
    id: 'finance',
    label: 'Финансы',
    icon: <Coins className='h-4 w-4 text-emerald-600' />
  },
  {
    id: 'government',
    label: 'Государственные',
    icon: <FileText className='h-4 w-4 text-blue-600' />
  },
  {
    id: 'tools',
    label: 'Полезные инструменты',
    icon: <Hammer className='h-4 w-4 text-indigo-500' />
  },
  {
    id: 'transport',
    label: 'Транспорт',
    icon: <Car className='h-4 w-4 text-orange-500' />
  },
  {
    id: 'business',
    label: 'Бизнес-сервисы',
    icon: <Briefcase className='h-4 w-4 text-sky-600' />
  },
  {
    id: 'health',
    label: 'Здоровье',
    icon: <Stethoscope className='h-4 w-4 text-red-500' />
  },
  {
    id: 'travel',
    label: 'Путешествия',
    icon: <Plane className='h-4 w-4 text-cyan-500' />
  },
  {
    id: 'education',
    label: 'Образование',
    icon: <GraduationCap className='h-4 w-4 text-purple-600' />
  },
  {
    id: 'books',
    label: 'Книги',
    icon: <BookOpen className='h-4 w-4 text-amber-600' />
  },
  {
    id: 'lifestyle',
    label: 'Образ жизни',
    icon: <Heart className='h-4 w-4 text-pink-500' />
  },
  {
    id: 'sport',
    label: 'Спорт',
    icon: <Dumbbell className='h-4 w-4 text-lime-600' />
  },
  {
    id: 'communication',
    label: 'Общение',
    icon: <MessageCircle className='h-4 w-4 text-violet-500' />
  },
  {
    id: 'shopping',
    label: 'Покупки',
    icon: <Briefcase className='h-4 w-4 text-teal-600' />
  },
  {
    id: 'marketplace',
    label: 'Маркетплейсы',
    icon: <Briefcase className='h-4 w-4 text-yellow-500' />
  }
] as const;
