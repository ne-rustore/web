import {
  BookOpen,
  Briefcase,
  Calendar,
  Camera,
  Code2,
  Coffee,
  Coins,
  Gamepad2,
  GraduationCap,
  Heart,
  Map,
  Music,
  Newspaper,
  Palette,
  Plane,
  ShoppingBag,
  Sparkle,
  Stethoscope,
  Sun,
  Trophy,
  Users,
  Wrench
} from 'lucide-react';

export const topics = [
  {
    id: 'Book',
    label: 'Книги',
    icon: <BookOpen className='h-4 w-4 text-amber-600' />
  },
  {
    id: 'Business',
    label: 'Бизнес',
    icon: <Briefcase className='h-4 w-4 text-sky-600' />
  },
  {
    id: 'Developer_Tools',
    label: 'Для разработчиков',
    icon: <Code2 className='h-4 w-4 text-gray-700' />
  },
  {
    id: 'Education',
    label: 'Образование',
    icon: <GraduationCap className='h-4 w-4 text-purple-600' />
  },
  {
    id: 'Entertainment',
    label: 'Развлечения',
    icon: <Sparkle className='h-4 w-4 text-pink-600' />
  },
  {
    id: 'Finance',
    label: 'Финансы',
    icon: <Coins className='h-4 w-4 text-emerald-600' />
  },
  {
    id: 'Food_Drink',
    label: 'Еда и напитки',
    icon: <Coffee className='h-4 w-4 text-orange-600' />
  },
  {
    id: 'Games',
    label: 'Игры',
    icon: <Gamepad2 className='h-4 w-4 text-red-600' />
  },
  {
    id: 'Graphics_Design',
    label: 'Графика и дизайн',
    icon: <Palette className='h-4 w-4 text-indigo-600' />
  },
  {
    id: 'Health_Fitness',
    label: 'Здоровье и фитнес',
    icon: <Stethoscope className='h-4 w-4 text-red-500' />
  },
  {
    id: 'Lifestyle',
    label: 'Образ жизни',
    icon: <Heart className='h-4 w-4 text-pink-500' />
  },
  {
    id: 'Magazines_Newspapers',
    label: 'Журналы и газеты',
    icon: <Newspaper className='h-4 w-4 text-gray-700' />
  },
  {
    id: 'Medical',
    label: 'Медицина',
    icon: <Stethoscope className='h-4 w-4 text-red-700' />
  },
  {
    id: 'Music',
    label: 'Музыка',
    icon: <Music className='h-4 w-4 text-green-600' />
  },
  {
    id: 'Navigation',
    label: 'Навигация',
    icon: <Map className='h-4 w-4 text-blue-600' />
  },
  {
    id: 'News',
    label: 'Новости',
    icon: <Newspaper className='h-4 w-4 text-gray-800' />
  },
  {
    id: 'Photo_Video',
    label: 'Фото и видео',
    icon: <Camera className='h-4 w-4 text-purple-600' />
  },
  {
    id: 'Productivity',
    label: 'Продуктивность',
    icon: <Calendar className='h-4 w-4 text-teal-600' />
  },
  {
    id: 'Reference',
    label: 'Справочники',
    icon: <BookOpen className='h-4 w-4 text-blue-700' />
  },
  {
    id: 'Shopping',
    label: 'Покупки',
    icon: <ShoppingBag className='h-4 w-4 text-teal-600' />
  },
  {
    id: 'Social_Networking',
    label: 'Социальные сети',
    icon: <Users className='h-4 w-4 text-indigo-600' />
  },
  {
    id: 'Sports',
    label: 'Спорт',
    icon: <Trophy className='h-4 w-4 text-lime-600' />
  },
  {
    id: 'Stickers',
    label: 'Стикеры',
    icon: <Sparkle className='h-4 w-4 text-yellow-500' />
  },
  {
    id: 'Travel',
    label: 'Путешествия',
    icon: <Plane className='h-4 w-4 text-cyan-500' />
  },
  {
    id: 'Utilities',
    label: 'Утилиты',
    icon: <Wrench className='h-4 w-4 text-gray-600' />
  },
  {
    id: 'Weather',
    label: 'Погода',
    icon: <Sun className='h-4 w-4 text-yellow-500' />
  }
] as const;

export type TopicId = (typeof topics)[number]['id'];
