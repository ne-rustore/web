import { LogIn } from 'lucide-react';

import { Button } from '@/shared/ui';

interface VKSignInButtonProps {
  onClick: () => void;
  loading?: boolean;
}

const VKSignInButton = ({ onClick, loading }: VKSignInButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      className='w-full bg-[#4680C2] hover:bg-[#3a6ca8] text-white'
    >
      {loading ? (
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
          Вход...
        </div>
      ) : (
        <>
          <LogIn className='h-4 w-4' />
          Войти через VK
        </>
      )}
    </Button>
  );
};

export default VKSignInButton;
