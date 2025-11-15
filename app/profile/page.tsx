'use client';

import React, { useState } from 'react';

import {
  ArrowUpCircle,
  Bell,
  CreditCard,
  Download,
  ExternalLink,
  Heart,
  LogOut,
  Pencil,
  Settings,
  Shield,
  ShoppingBag,
  Smartphone,
  Star,
  Trash2,
  Upload
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  Input,
  Label,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/shared/ui';

type App = {
  id: string;
  name: string;
  icon: string;
  version: string;
  size: string;
  hasUpdate?: boolean;
  newVersion?: string;
};

type PurchaseStatus = 'completed' | 'pending' | 'failed';

type Purchase = {
  id: string;
  date: string;
  name: string;
  amount: string;
  status: PurchaseStatus;
};

type Subscription = {
  id: string;
  name: string;
  cost: string;
  nextPayment: string;
};

type Review = {
  id: string;
  appName: string;
  rating: number;
  text: string;
  date: string;
};

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Иван Петров');
  const [tempName, setTempName] = useState(name);
  const [avatarUrl, setAvatarUrl] = useState('/diverse-user-avatars.png');
  const [activeTab, setActiveTab] = useState('apps');
  const [appsView, setAppsView] = useState<'installed' | 'updates' | 'history'>(
    'installed'
  );

  const email = 'example@mail.ru';
  const phone = '+7 123 45 67';

  const [installedApps] = useState<App[]>([
    {
      id: '1',
      name: 'ВКонтакте',
      icon: '/vk-icon.jpg',
      version: '8.15.2',
      size: '125 МБ'
    },
    {
      id: '2',
      name: 'Яндекс Навигатор',
      icon: '/yandex-icon.jpg',
      version: '5.20',
      size: '89 МБ',
      hasUpdate: true,
      newVersion: '5.21'
    },
    {
      id: '3',
      name: 'Госуслуги',
      icon: '/gosuslugi-icon.jpg',
      version: '4.12.1',
      size: '45 МБ'
    }
  ]);

  const [purchases] = useState<Purchase[]>([
    {
      id: '1',
      date: '15.01.2025',
      name: 'Премиум подписка - 1 месяц',
      amount: '299 ₽',
      status: 'completed'
    },
    {
      id: '2',
      date: '10.01.2025',
      name: 'Игра "Космические гонки"',
      amount: '599 ₽',
      status: 'completed'
    }
  ]);

  const [subscriptions] = useState<Subscription[]>([
    {
      id: '1',
      name: 'Музыка Премиум',
      cost: '299 ₽/мес',
      nextPayment: '15.02.2025'
    },
    {
      id: '2',
      name: 'Облачное хранилище 100 ГБ',
      cost: '149 ₽/мес',
      nextPayment: '20.02.2025'
    }
  ]);

  const [favoriteApps] = useState<App[]>([
    {
      id: '1',
      name: 'Telegram',
      icon: '/telegram-icon.jpg',
      version: '10.5.2',
      size: '78 МБ'
    }
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      appName: 'ВКонтакте',
      rating: 5,
      text: 'Отличное приложение, работает стабильно!',
      date: '12.01.2025'
    }
  ]);

  const [notifications, setNotifications] = useState({
    sales: true,
    updates: true,
    news: false
  });

  const [autoUpdate, setAutoUpdate] = useState(true);

  const handleSave = () => {
    if (tempName.length < 2 || tempName.length > 50) {
      alert('Имя должно быть от 2 до 50 символов');
      return;
    }
    setName(tempName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(name);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5 МБ');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    if (confirm('Вы уверены, что хотите выйти?')) {
      console.log('Выход из аккаунта');
    }
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        'Вы уверены, что хотите удалить аккаунт? Это действие необратимо.'
      )
    ) {
      console.log('Удаление аккаунта');
    }
  };

  const updatesCount = installedApps.filter((app) => app.hasUpdate).length;

  return (
    <div className='min-h-screen bg-white'>
      <div className='mx-auto max-w-5xl px-4 py-8'>
        <Card className='mb-6 p-8'>
          <div className='flex flex-col items-center gap-6 md:flex-row md:items-start'>
            <div className='relative'>
              <Avatar className='h-32 w-32 border-4 border-white shadow-lg md:h-40 md:w-40'>
                <AvatarImage src={avatarUrl || '/placeholder.svg'} alt={name} />
                <AvatarFallback className='text-3xl'>
                  {name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              {isEditing && (
                <label
                  htmlFor='avatar-upload'
                  className='absolute bottom-0 right-0 cursor-pointer rounded-full bg-sky-500 p-2 text-white shadow-lg transition-colors hover:bg-sky-600'
                >
                  <Upload className='h-5 w-5' />
                  <input
                    id='avatar-upload'
                    type='file'
                    accept='image/jpeg,image/png'
                    className='hidden'
                    onChange={handleAvatarChange}
                  />
                </label>
              )}
            </div>

            <div className='flex-1 space-y-4 text-center md:text-left'>
              {isEditing ? (
                <div className='space-y-2'>
                  <Label htmlFor='name' className='text-sm'>
                    Имя
                  </Label>
                  <Input
                    id='name'
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className='text-lg'
                    placeholder='Введите имя'
                  />
                  <p className='text-xs text-muted-foreground'>
                    От 2 до 50 символов
                  </p>
                </div>
              ) : (
                <h1 className='text-3xl font-bold'>{name}</h1>
              )}

              <div className='space-y-1 text-muted-foreground'>
                <p className='text-base'>{email}</p>
                <p className='text-base'>{phone}</p>
              </div>

              <div className='flex flex-col gap-2 sm:flex-row'>
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className='bg-sky-500 text-white hover:bg-sky-600'
                    >
                      Сохранить
                    </Button>
                    <Button onClick={handleCancel} variant='outline'>
                      Отмена
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className='bg-sky-500 text-white hover:bg-sky-600'
                  >
                    <Pencil className='mr-2 h-4 w-4' />
                    Редактировать профиль
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='mb-6 grid w-full grid-cols-2 md:grid-cols-5'>
            <TabsTrigger value='apps' className='gap-2'>
              <Smartphone className='h-4 w-4' />
              <span className='hidden sm:inline'>Мои приложения</span>
              <span className='sm:hidden'>Приложения</span>
            </TabsTrigger>
            <TabsTrigger value='purchases' className='gap-2'>
              <ShoppingBag className='h-4 w-4' />
              <span className='hidden sm:inline'>Покупки</span>
              <span className='sm:hidden'>Покупки</span>
            </TabsTrigger>
            <TabsTrigger value='favorites' className='gap-2'>
              <Heart className='h-4 w-4' />
              <span className='hidden sm:inline'>Избранное</span>
              <span className='sm:hidden'>Избранное</span>
            </TabsTrigger>
            <TabsTrigger value='reviews' className='gap-2'>
              <Star className='h-4 w-4' />
              <span className='hidden sm:inline'>Отзывы</span>
              <span className='sm:hidden'>Отзывы</span>
            </TabsTrigger>
            <TabsTrigger value='settings' className='gap-2'>
              <Settings className='h-4 w-4' />
              <span className='hidden sm:inline'>Настройки</span>
              <span className='sm:hidden'>Настройки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='apps' className='space-y-6'>
            <Card className='p-6'>
              <div className='mb-6 flex gap-2'>
                <Button
                  variant={appsView === 'installed' ? 'default' : 'outline'}
                  onClick={() => setAppsView('installed')}
                  className={
                    appsView === 'installed'
                      ? 'bg-sky-500 hover:bg-sky-600'
                      : ''
                  }
                >
                  Установленные
                </Button>
                <Button
                  variant={appsView === 'updates' ? 'default' : 'outline'}
                  onClick={() => setAppsView('updates')}
                  className={
                    appsView === 'updates' ? 'bg-sky-500 hover:bg-sky-600' : ''
                  }
                >
                  Обновления
                  {updatesCount > 0 && (
                    <Badge className='ml-2 bg-red-500'>{updatesCount}</Badge>
                  )}
                </Button>
                <Button
                  variant={appsView === 'history' ? 'default' : 'outline'}
                  onClick={() => setAppsView('history')}
                  className={
                    appsView === 'history' ? 'bg-sky-500 hover:bg-sky-600' : ''
                  }
                >
                  История
                </Button>
              </div>

              {appsView === 'installed' && (
                <div className='space-y-4'>
                  <h2 className='text-xl font-semibold'>
                    Установленные приложения
                  </h2>
                  {installedApps.map((app) => (
                    <div
                      key={app.id}
                      className='flex items-center gap-4 rounded-lg border p-4'
                    >
                      <img
                        src={app.icon || '/placeholder.svg'}
                        alt={app.name}
                        className='h-12 w-12 rounded-lg'
                      />
                      <div className='flex-1'>
                        <h3 className='font-semibold'>{app.name}</h3>
                        <p className='text-sm text-muted-foreground'>
                          Версия {app.version} · {app.size}
                        </p>
                      </div>
                      <div className='flex gap-2'>
                        <Button variant='outline' size='sm'>
                          Открыть
                        </Button>
                        <Button variant='outline' size='sm'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {appsView === 'updates' && (
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-semibold'>
                      Доступные обновления
                    </h2>
                    {updatesCount > 0 && (
                      <Button className='bg-sky-500 hover:bg-sky-600'>
                        <ArrowUpCircle className='mr-2 h-4 w-4' />
                        Обновить все
                      </Button>
                    )}
                  </div>
                  {installedApps
                    .filter((app) => app.hasUpdate)
                    .map((app) => (
                      <div
                        key={app.id}
                        className='flex items-center gap-4 rounded-lg border p-4'
                      >
                        <img
                          src={app.icon || '/placeholder.svg'}
                          alt={app.name}
                          className='h-12 w-12 rounded-lg'
                        />
                        <div className='flex-1'>
                          <h3 className='font-semibold'>{app.name}</h3>
                          <p className='text-sm text-muted-foreground'>
                            {app.version} → {app.newVersion}
                          </p>
                        </div>
                        <Button className='bg-sky-500 hover:bg-sky-600'>
                          <Download className='mr-2 h-4 w-4' />
                          Обновить
                        </Button>
                      </div>
                    ))}
                  {updatesCount === 0 && (
                    <p className='text-center text-muted-foreground'>
                      Все приложения обновлены
                    </p>
                  )}
                </div>
              )}

              {appsView === 'history' && (
                <div className='space-y-4'>
                  <h2 className='text-xl font-semibold'>История действий</h2>
                  <div className='space-y-3'>
                    <div className='rounded-lg border p-4'>
                      <div className='flex justify-between'>
                        <span className='font-medium'>ВКонтакте</span>
                        <span className='text-sm text-muted-foreground'>
                          15.01.2025, 14:30
                        </span>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        Обновлено до версии 8.15.2
                      </p>
                    </div>
                    <div className='rounded-lg border p-4'>
                      <div className='flex justify-between'>
                        <span className='font-medium'>Госуслуги</span>
                        <span className='text-sm text-muted-foreground'>
                          10.01.2025, 10:15
                        </span>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        Установлено
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value='purchases' className='space-y-6'>
            <Card className='p-6'>
              <h2 className='mb-4 text-xl font-semibold'>Способы оплаты</h2>
              <div className='space-y-3'>
                <div className='flex items-center gap-3 rounded-lg border p-4'>
                  <CreditCard className='h-6 w-6 text-muted-foreground' />
                  <div className='flex-1'>
                    <p className='font-medium'>•••• 1234</p>
                    <p className='text-sm text-muted-foreground'>
                      Действует до 12/26
                    </p>
                  </div>
                  <Button variant='outline' size='sm'>
                    Управлять
                  </Button>
                </div>
                <Button variant='outline' className='w-full'>
                  + Добавить способ оплаты
                </Button>
              </div>
            </Card>

            <Card className='p-6'>
              <h2 className='mb-4 text-xl font-semibold'>История платежей</h2>
              <div className='space-y-3'>
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className='flex items-center justify-between rounded-lg border p-4'
                  >
                    <div className='flex-1'>
                      <p className='font-medium'>{purchase.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {purchase.date}
                      </p>
                    </div>
                    <div className='flex items-center gap-4'>
                      <span className='font-semibold'>{purchase.amount}</span>
                      <Badge
                        variant={
                          purchase.status === 'completed'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {purchase.status === 'completed'
                          ? 'Оплачено'
                          : 'В обработке'}
                      </Badge>
                      <Button variant='ghost' size='sm'>
                        <Download className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className='p-6'>
              <h2 className='mb-4 text-xl font-semibold'>Активные подписки</h2>
              <div className='space-y-3'>
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className='flex items-center justify-between rounded-lg border p-4'
                  >
                    <div className='flex-1'>
                      <p className='font-medium'>{sub.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        Следующее списание: {sub.nextPayment}
                      </p>
                    </div>
                    <div className='flex items-center gap-4'>
                      <span className='font-semibold'>{sub.cost}</span>
                      <Button
                        variant='outline'
                        size='sm'
                        className='hover:bg-sky-50 hover:text-sky-600'
                      >
                        Управлять
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value='favorites' className='space-y-6'>
            <Card className='p-6'>
              <h2 className='mb-4 text-xl font-semibold'>
                Избранные приложения
              </h2>
              <div className='space-y-3'>
                {favoriteApps.map((app) => (
                  <div
                    key={app.id}
                    className='flex items-center gap-4 rounded-lg border p-4'
                  >
                    <img
                      src={app.icon || '/placeholder.svg'}
                      alt={app.name}
                      className='h-12 w-12 rounded-lg'
                    />
                    <div className='flex-1'>
                      <h3 className='font-semibold'>{app.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {app.size}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='hover:bg-sky-50 hover:text-sky-600'
                      >
                        <ExternalLink className='h-4 w-4' />
                      </Button>
                      <Button variant='outline' size='sm'>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className='p-6'>
              <h2 className='mb-4 text-xl font-semibold'>Список желаний</h2>
              <p className='text-center text-muted-foreground'>
                Список пуст. Добавьте приложения, которые хотите купить позже.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value='reviews' className='space-y-6'>
            <Card className='p-6'>
              <h2 className='mb-4 text-xl font-semibold'>Мои отзывы</h2>
              <div className='space-y-4'>
                {reviews.map((review) => (
                  <div key={review.id} className='rounded-lg border p-4'>
                    <div className='mb-2 flex items-center justify-between'>
                      <h3 className='font-semibold'>{review.appName}</h3>
                      <div className='flex gap-1'>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className='mb-2 text-sm'>{review.text}</p>
                    <div className='flex items-center justify-between'>
                      <p className='text-xs text-muted-foreground'>
                        {review.date}
                      </p>
                      <div className='flex gap-2'>
                        <Button variant='ghost' size='sm'>
                          <Pencil className='h-4 w-4' />
                        </Button>
                        <Button variant='ghost' size='sm'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value='settings' className='space-y-6'>
            <Card className='p-6'>
              <h2 className='mb-4 flex items-center gap-2 text-xl font-semibold'>
                <Bell className='h-5 w-5' />
                Уведомления
              </h2>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Скидки и акции</p>
                    <p className='text-sm text-muted-foreground'>
                      Получать уведомления о специальных предложениях
                    </p>
                  </div>
                  <Switch
                    checked={notifications.sales}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, sales: checked })
                    }
                  />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Обновления приложений</p>
                    <p className='text-sm text-muted-foreground'>
                      Уведомления о доступных обновлениях
                    </p>
                  </div>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, updates: checked })
                    }
                  />
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Новости магазина</p>
                    <p className='text-sm text-muted-foreground'>
                      Получать новости о новых приложениях
                    </p>
                  </div>
                  <Switch
                    checked={notifications.news}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, news: checked })
                    }
                  />
                </div>
              </div>
            </Card>

            <Card className='p-6'>
              <h2 className='mb-4 flex items-center gap-2 text-xl font-semibold'>
                <Shield className='h-5 w-5' />
                Конфиденциальность
              </h2>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Автообновление приложений</p>
                    <p className='text-sm text-muted-foreground'>
                      Автоматически обновлять приложения
                    </p>
                  </div>
                  <Switch
                    checked={autoUpdate}
                    onCheckedChange={setAutoUpdate}
                  />
                </div>
                <Separator />
                <div className='space-y-2'>
                  <p className='font-medium'>Видимость профиля</p>
                  <Button variant='outline' className='w-full justify-start'>
                    Настроить приватность
                  </Button>
                </div>
              </div>
            </Card>

            <Card className='p-6'>
              <h2 className='mb-4 text-xl font-semibold'>Аккаунт</h2>
              <div className='space-y-3'>
                <Button
                  onClick={handleLogout}
                  variant='outline'
                  className='w-full justify-start'
                >
                  <LogOut className='mr-2 h-4 w-4' />
                  Выйти
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  variant='outline'
                  className='w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700'
                >
                  <Trash2 className='mr-2 h-4 w-4' />
                  Удалить аккаунт
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
