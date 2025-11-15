import {
  BookOpen,
  Briefcase,
  Car,
  Coins,
  Dumbbell,
  FileText,
  GraduationCap,
  Grid3X3,
  Heart,
  Plane,
  Stethoscope
} from 'lucide-react';

export const topics = [
  {
    id: 'interesting',
    label: 'Интересное',
    icon: <Grid3X3 className='h-4 w-4' />
  },
  { id: 'all', label: 'Все приложения', icon: <Grid3X3 className='h-4 w-4' /> },
  { id: 'finance', label: 'Финансы', icon: <Coins className='h-4 w-4' /> },
  {
    id: 'government',
    label: 'Государственные',
    icon: <FileText className='h-4 w-4' />
  },
  {
    id: 'tools',
    label: 'Полезные инструменты',
    icon: <Briefcase className='h-4 w-4' />
  },
  { id: 'transport', label: 'Транспорт', icon: <Car className='h-4 w-4' /> },
  {
    id: 'business',
    label: 'Бизнес-сервисы',
    icon: <Briefcase className='h-4 w-4' />
  },
  {
    id: 'health',
    label: 'Здоровье',
    icon: <Stethoscope className='h-4 w-4' />
  },
  { id: 'travel', label: 'Путешествия', icon: <Plane className='h-4 w-4' /> },
  {
    id: 'education',
    label: 'Образование',
    icon: <GraduationCap className='h-4 w-4' />
  },
  { id: 'books', label: 'Книги', icon: <BookOpen className='h-4 w-4' /> },
  {
    id: 'lifestyle',
    label: 'Образ жизни',
    icon: <Heart className='h-4 w-4' />
  },
  { id: 'sport', label: 'Спорт', icon: <Dumbbell className='h-4 w-4' /> },
  {
    id: 'communication',
    label: 'Общение',
    icon: <Grid3X3 className='h-4 w-4' />
  },
  { id: 'shopping', label: 'Покупки', icon: <Briefcase className='h-4 w-4' /> },
  {
    id: 'marketplace',
    label: 'Маркетплейсы',
    icon: <Briefcase className='h-4 w-4' />
  }
] as const;
