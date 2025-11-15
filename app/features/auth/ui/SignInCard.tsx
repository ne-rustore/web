import { useState } from 'react';

import { signIn } from 'next-auth/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/ui';
import VKSignInButton from './VKSignInButton';

const SignInCard = () => {
  const [loading, setLoading] = useState(false);

  const handleVKLogin = async () => {
    setLoading(true);
    try {
      await signIn('vk', { callbackUrl: '/' });
    } catch {
      setLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-sm mx-auto'>
      <CardHeader className='text-center'>
        <CardTitle>Добро пожаловать</CardTitle>
        <CardDescription>Войдите через VK, чтобы продолжить</CardDescription>
      </CardHeader>
      <CardContent>
        <VKSignInButton onClick={handleVKLogin} loading={loading} />
      </CardContent>
    </Card>
  );
};

export default SignInCard;
